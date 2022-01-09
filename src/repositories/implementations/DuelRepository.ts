import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelRequest } from '../../dto/IDuelRequest';
import { Duel } from '../../entities/Duel';
import { DuelRound } from '../../entities/DuelRound';
import { ApplicationErrors } from '../../errors';
import { IDuelRepository } from '../interfaces/IDuelRepository';
import { DuelRoundRepository } from './DuelRoundRepository';
import { StudentRepository } from './StudentRepository';

@EntityRepository(Duel)
export class DuelRepository
  extends Repository<Duel>
  implements IDuelRepository
{
  async createDuel(duelParams: IDuelRequest): Promise<Duel> {
    // Desestruturando as variaveis a serem usadas na funcao
    const {
      studentId,
      contentsId,
      maxGroupParticipants,
      questionsPerContent,
      timeForQuestion,
    } = duelParams;

    // Verifica se o id do estudante que criou o duelo foi fornecido
    if (!studentId)
      throw new ApplicationErrors('Estudante não encontrado', 404);

    // Exclui os campos que nao devem ser salvos na base de dados de forma direta
    delete duelParams.contentsId;
    delete duelParams.studentId;

    // Armazena os campos que devem ser salvos em uma no variavel
    let duel = { ...duelParams };

    // Obtem o repositorio que armazena os dados dos estudantes
    const studentRepository = getCustomRepository(StudentRepository);
    // Procura o estudante pelo id fornecido
    const student = await studentRepository.findById(studentId || '');

    // Se o estudante nao for encontrado retorna uma mensagem de erro
    if (!student) throw new ApplicationErrors('Estudante não encontrado', 404);

    // Armazena o estudante encontrado no duelo
    duel = this.create({ ...duel, student });

    // Obtem o repositorio que armazenas os rounds dos duelos
    const duelRoundRepository = await getCustomRepository(DuelRoundRepository);
    // Cria o round do duelo com os parametros necessarios
    const duelRound = await duelRoundRepository.createDuelRound({
      maxGroupParticipants,
      questionsPerContent,
      timeForQuestion,
      contentsId,
    });

    console.log(duelRound);

    // Declaracao do vetor que armazena os rounds do duelo
    let duelRounds: DuelRound[] = [];
    // Adiciona o round criado ao vetor de rounds do duelo
    duelRounds = [...duelRounds, duelRound];

    // Adiciona o vetor de rounds e o round criado ao duelo
    duel = this.create({ ...duel, duelRounds, duelRound });

    // Salva o duelo na base de dados
    return await this.save({ ...duel });
  }

  async findAll(): Promise<Duel[]> {
    return await this.find({
      relations: ['student', 'duelRounds', 'duelRound'],
    });
  }

  async findById(id: string): Promise<Duel | undefined> {
    let duel: Duel = await this.findOne(
      { id },
      { relations: ['student', 'duelRound', 'duelRounds'] }
    );

    const { duelRound: duelRoundFound } = duel;

    const duelRoundRepository = await getCustomRepository(DuelRoundRepository);
    const duelRound = await duelRoundRepository.findById(duelRoundFound.id);

    duel = { ...duel, duelRound };

    return duel;
  }

  async updateById(updateFields: IDuelRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key: string) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
