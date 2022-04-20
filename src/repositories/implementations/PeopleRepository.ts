import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IUpdateFriendRequest } from '../../dto/friendRequest/IUpdateFriendRequest';
import { IPeopleRequest } from '../../dto/people/IPeopleRequest';
import { Image } from '../../entities/Image';
import { People } from '../../entities/People';
import { IPeopleRepository } from '../interfaces/IPeopleRepository';
import { ImageRepository } from './ImageRepository';
import { ApplicationErrors } from '../../errors';

@EntityRepository(People)
export class PeopleRepository
  extends Repository<People>
  implements IPeopleRepository
{
  async createPeople(peopleParams: IPeopleRequest): Promise<People> {
    // Desestrutura as variaveis que precisam ser tratadas antes da insercao
    const { profilePictureId } = peopleParams;

    // Exclui os campos que trazem os ids de relacionamentos
    delete peopleParams.profilePictureId;

    // Procura a imagem na base de dados
    const imageRepository = await getCustomRepository(ImageRepository);
    const profilePicture = await imageRepository.findById(profilePictureId);

    // Armazena todos os dados do usuario que devem ser salvos
    const people = this.create({
      ...peopleParams,
      profilePicture,
      dailyGoal: 50,
    });

    // Salva o usuario na base de dados e retorna
    return await this.save({ ...people });
  }

  async findAll(): Promise<People[]> {
    // Busca todos os usuarios armazenados no banco
    const peoplesFound = await this.find({
      relations: ['profilePicture', 'friends'],
    });

    // Array que armazenara todos os usuarios com suas imagens
    const peoples: People[] = [];

    // Percorre por todos os usuarios buscando e adicionando suas fotos de perfil
    await Promise.all(
      peoplesFound.map(async (peopleFound) => {
        // Procura a imagem do usuario para que a url completa seja retornada
        const profilePicture = await this.getProfilePicture(
          peopleFound.profilePicture.id
        );

        // Adiciona a imagem aos dados que devem ser retornados
        const people = this.create({ ...peopleFound, profilePicture });

        // Adiciona o usuario ao array de usuarios que sera retornado
        peoples.push(people);
      })
    );

    return peoples;
  }

  async findById(id: string): Promise<People | undefined> {
    // Procura o usuario pelo id e retorna os dados juntamente com os relacionamentos especificados
    const peopleFound = await this.findOne(
      { id },
      { relations: ['profilePicture', 'friends'] }
    );

    // Procura a imagem do usuario para que a url completa seja retornada
    const profilePicture = await this.getProfilePicture(
      peopleFound.profilePicture.id
    );

    // Adiciona a imagem aos dados que serao retornados
    const people = this.create({ ...peopleFound, profilePicture });

    return people;
  }

  async findByEmail(email: string): Promise<People | undefined> {
    // Procura o usuario pelo id e retorna os dados juntamente com os relacionamentos especificados
    const peopleFound = await this.findOne(
      { email },
      { relations: ['profilePicture', 'friends'] }
    );

    if (peopleFound) {
      // Procura a imagem do usuario para que a url completa seja retornada
      const profilePicture = await this.getProfilePicture(
        peopleFound.profilePicture.id
      );

      // Adiciona a imagem aos dados que serao retornados
      const people = this.create({ ...peopleFound, profilePicture });
      return people;
    }

    return peopleFound;
  }

  async updateById(updateFields: IPeopleRequest): Promise<void> {
    // Armazena as variaveis necessarias para a atualizacao
    const { id } = updateFields;
    const fields = { ...updateFields };

    // Remove os campos que vieram sem valores
    Object.keys(fields).map(
      (key: string) => fields[key] === undefined && delete fields[key]
    );

    let people = { ...fields };

    // Verifica se a foto de perfil deve ser alterada
    if (fields.profilePictureId) {
      // Busca e armazena a nova imagem
      const imageRepository = await getCustomRepository(ImageRepository);
      const profilePicture = await imageRepository.findById(
        fields.profilePictureId
      );

      // Verifica se encontrou a imagem enviada pelo usuario
      if (profilePicture) {
        // Busca a antiga imagem
        const oldStudent = await this.findById(id);
        const { profilePicture: oldProfilePicture } = oldStudent;

        // Verifica se a imagem anterior existe e se ela e diferente da imagem padrao
        if (
          oldProfilePicture &&
          oldProfilePicture.id !== process.env.DEFAULT_PROFILE_PICTURE
        ) {
          // Remove a imagem anterior do usuario
          await this.update({ id }, { profilePicture: null });
          // Apaga a imagem do banco
          await imageRepository.deleteById(oldProfilePicture.id);
        }
        // Adiciona a imagem atualizada ao usuario
        people = this.create({ ...people, profilePicture });
      }
    }

    // Atualiza o usuario
    await this.update({ id }, people);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    // Busca o usuario pelo id e exclui da base de dados
    return await this.delete({ id });
  }

  /**
   * @author Jose Ricardo Brasileiro Goncalves
   * @brief Busca e retorna uma imagem do repositorio de imagens
   * @param imageId Id da imagem na base de dados
   */
  async getProfilePicture(imageId: string): Promise<Image> {
    // Pega repositorio de imagens e busca a imagem
    const imageRepository = await getCustomRepository(ImageRepository);
    const image = await imageRepository.findById(imageId);

    // Retorna a imagem encontrada
    return image;
  }

  async addFriend(addFriendParams: IUpdateFriendRequest): Promise<void> {
    const { peopleId, friendId } = addFriendParams;

    const people = await this.findById(peopleId);

    if (!people) {
      throw new ApplicationErrors('Pessoa não encontrada', 404);
    }

    const friend = await this.findById(friendId);

    if (!friend) {
      throw new ApplicationErrors('Amigos não encontrado', 404);
    }

    const { friends: peopleFriends } = people;
    const { friends: friendFriends } = friend;

    await this.save({ ...people, friends: [...peopleFriends, friend] });
    await this.save({ ...friend, friends: [...friendFriends, people] });
  }

  async removeFriend(removeFriendParams: IUpdateFriendRequest): Promise<void> {
    const { peopleId, friendId } = removeFriendParams;

    const people = await this.findById(peopleId);

    if (!people) {
      throw new ApplicationErrors('Pessoa não encontrada', 404);
    }

    const friend = await this.findById(friendId);

    if (!friend) {
      throw new ApplicationErrors('Amigos não encontrado', 404);
    }

    const { friends: oldPeopleFriends } = people;
    const { friends: oldFriendFriends } = friend;

    const peopleFriends = oldPeopleFriends.filter(
      (oldPeopleFriend) => oldPeopleFriend.id !== friendId
    );
    const friendFriends = oldFriendFriends.filter(
      (oldFriendFriend) => oldFriendFriend.id !== peopleId
    );

    await this.save({ ...people, friends: peopleFriends });
    await this.save({ ...friend, friends: friendFriends });
  }
}
