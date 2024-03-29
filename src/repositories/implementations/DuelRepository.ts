import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelRequest } from '../../dto/duel/IDuelRequest';
import { Duel } from '../../entities/Duel';
import { DuelRound } from '../../entities/DuelRound';
import { ApplicationErrors } from '../../errors';
import { IDuelRepository } from '../interfaces/IDuelRepository';
import { DuelRoundRepository } from './DuelRoundRepository';
import { DuelTeamParticipationRepository } from './DuelTeamParticipationRepository';
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
    let newDuelParams = { ...duelParams };

    // Obtem o repositorio que armazena os dados dos estudantes
    const studentRepository = getCustomRepository(StudentRepository);
    // Procura o estudante pelo id fornecido
    const student = await studentRepository.findById(studentId || '');

    // Se o estudante nao for encontrado retorna uma mensagem de erro
    if (!student) throw new ApplicationErrors('Estudante não encontrado', 404);

    // Obtem o repositorio que armazenas os rounds dos duelos
    const duelRoundRepository = await getCustomRepository(DuelRoundRepository);
    // Cria o round do duelo com os parametros necessarios
    const duelRound = await duelRoundRepository.createDuelRound({
      maxGroupParticipants,
      questionsPerContent,
      timeForQuestion,
      contentsId,
    });

    // Declaracao do vetor que armazena os rounds do duelo
    let duelRounds: DuelRound[] = [];
    // Adiciona o round criado ao vetor de rounds do duelo
    duelRounds = [...duelRounds, duelRound];

    // Adiciona o vetor de rounds e o round criado ao duelo
    newDuelParams = this.create({
      ...newDuelParams,
      duelRounds,
      duelRound,
      student,
      createdAt: new Date(),
    });

    // Salva o duelo na base de dados
    const duel = await this.save({ ...newDuelParams });

    const duelTeamParticipationRepository = await getCustomRepository(
      DuelTeamParticipationRepository
    );
    await duelTeamParticipationRepository.participateInDuel({
      duelId: duel.id,
      studentId,
    });

    return duel;
  }

  async findAll(): Promise<Duel[]> {
    const duelsFound = await this.find();

    const duels: Duel[] = [];

    await Promise.all(
      duelsFound.map(async (duelFound) => {
        const duel = await this.findById(duelFound.id);
        duels.push(duel);
      })
    );

    return duels;
  }

  async findById(id: string): Promise<Duel | undefined> {
    const duel = await this.findOne(
      { id },
      { relations: ['student', 'duelRound', 'duelRounds'] }
    );

    if (duel) {
      const { duelRound: duelRoundFound, student: studentFound } = duel;

      if (!studentFound) {
        return duel;
      }
      const studentRepository = await getCustomRepository(StudentRepository);
      const student = await studentRepository.findById(studentFound.id);

      if (!student) {
        return duel;
      }

      if (!duelRoundFound) {
        return duel;
      }
      const duelRoundRepository = await getCustomRepository(
        DuelRoundRepository
      );
      const duelRound = await duelRoundRepository.findById(duelRoundFound.id);

      return { ...duel, duelRound, student };
    }

    return duel;
  }

  async findByCode(code: string): Promise<Duel[]> {
    return await this.find({
      where: {
        code,
      },
      relations: ['student', 'duelRounds', 'duelRound'],
    });
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
