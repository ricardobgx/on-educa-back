import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
  ILike,
} from 'typeorm';
import { IContentRequest } from '../../dto/IContentRequest';
import { Content } from '../../entities/Content';
import { Unity } from '../../entities/Unity';
import { IContentRepository } from '../interfaces/IContentRepository';
import { UnityRepository } from './UnityRepository';

@EntityRepository(Content)
export class ContentRepository
  extends Repository<Content>
  implements IContentRepository
{
  async createContent(contentParams: IContentRequest): Promise<Content> {
    const { title, description, video, index, unityId } = contentParams;

    const unityRepository = getCustomRepository(UnityRepository);
    const unity = await unityRepository.findById(unityId);

    const newContentParams = this.create({
      title,
      description,
      video,
      index,
      unity,
    });

    const content = await this.save(newContentParams);

    return content;
  }

  async findAll(name?: string): Promise<Content[]> {
    if (name) {
      const nameWords = name.split(' ');

      const contentsFound: Content[] = [];

      await Promise.all(
        nameWords.map(async (nameWord, index) => {
          let text = '';

          for (let j = index; j < nameWords.length; j++) {
            if (index === j) text = nameWord;
            else text += ` ${nameWords[j]}`;

            let foundContents = await this.find({
              where: { title: ILike(`%${text}%`) },
              relations: ['unity'],
            });
            foundContents.map((foundContent) =>
              contentsFound.push(foundContent)
            );
          }
        })
      );

      const contents = contentsFound.filter((contentFound, index, ctts) => {
        for (let i = index + 1; i < ctts.length; i++) {
          if (ctts[i].id === contentFound.id) return false;
        }
        return true;
      });

      return contents;
    }

    return await this.find({ relations: ['unity'] });
  }

  async findByUnity(unityId: string): Promise<Content[]> {
    const unityRepository = getCustomRepository(UnityRepository);
    const unity = await unityRepository.findById(unityId);

    return await this.find({ where: { unity }, relations: ['unity'] });
  }

  async findById(id: string): Promise<Content> {
    return await this.findOne({ id }, { relations: ['unity'] });
  }

  async updateById(updateFields: IContentRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
