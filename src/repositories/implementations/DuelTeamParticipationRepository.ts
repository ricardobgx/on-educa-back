import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelTeamParticipationByDuelRequest } from '../../dto/IDuelTeamParticipationByDuelRequest';
import { IDuelTeamParticipationRequest } from '../../dto/IDuelTeamParticipationRequest';
import { IManyDuelTeamParticipationRequest } from '../../dto/IManyDuelTeamParticipationRequest';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { IDuelTeamParticipationRepository } from '../interfaces/IDuelTeamParticipationRepository';
import { DuelRepository } from './DuelRepository';
import { DuelTeamRepository } from './DuelTeamRepository';
import { StudentRepository } from './StudentRepository';

@EntityRepository(DuelTeamParticipation)
export class DuelTeamParticipationRepository
  extends Repository<DuelTeamParticipation>
  implements IDuelTeamParticipationRepository
{
  async createDuelTeamParticipation(
    duelTeamParticipationParams: IDuelTeamParticipationRequest
  ): Promise<DuelTeamParticipation> {
    // Desestruturando parametros a serem utilizados na funcao
    let { studentId, duelTeamId } = duelTeamParticipationParams;

    // Excluindo a variavel que armazena o id dos conteudos da entidade
    delete duelTeamParticipationParams.studentId;
    delete duelTeamParticipationParams.duelTeamId;

    // Armazenando os novos parametros em outra variavel
    let duelTeamParticipation = { ...duelTeamParticipationParams };

    // Verificando se foi fornecido o id de um estudante
    if (studentId && studentId.trim() !== '') {
      // Obtendo o repositorio de conteudos
      const studentRepository = await getCustomRepository(StudentRepository);
      // Procurando o estudante na base de dados
      const student = await studentRepository.findById(studentId);

      if (student) {
        duelTeamParticipation = this.create({
          ...duelTeamParticipation,
          student,
        });
      }
    }
    if (duelTeamId) {
      const duelTeamRepository = await getCustomRepository(DuelTeamRepository);
      const duelTeam = await duelTeamRepository.findById(duelTeamId);

      if (duelTeam) {
        duelTeamParticipation = this.create({
          ...duelTeamParticipation,
          duelTeam,
        });
      }
    }

    duelTeamParticipation = this.create({ ...duelTeamParticipation });

    // Criando o TeamParticipation do duelo
    return await this.save({ ...duelTeamParticipation });
  }

  async createManyDuelTeamParticipations(
    duelTeamParticipationsParams: IManyDuelTeamParticipationRequest
  ): Promise<DuelTeamParticipation[]> {
    const { studentsIds } = duelTeamParticipationsParams;
    const duelTeamParticipations: DuelTeamParticipation[] = [];

    await Promise.all(
      studentsIds.map(async (studentId, index) => {
        const duelTeamParticipation = await this.createDuelTeamParticipation({
          studentId,
          index,
        });
        duelTeamParticipations.push(duelTeamParticipation);
      })
    );

    return duelTeamParticipations;
  }

  /******************************************************************
   * @author Jose Ricardo Brasileiro Goncalves
   * @modified 09/01/2022
   * @param
   * @description Essa funcao eh responsavel por realizar a inscricao
   * de um estudante no round do duelo informado
   **************************************************************** */

  async createDuelTeamParticipationByDuelId(
    createDuelParticipationByDuelParams: IDuelTeamParticipationByDuelRequest
  ): Promise<DuelTeamParticipation | undefined> {
    const { duelId, studentId } = createDuelParticipationByDuelParams;

    const duelRepository = await getCustomRepository(DuelRepository);
    const duel = await duelRepository.findById(duelId);

    let duelTeamParticipation;

    if (duel) {
      const { duelRound } = duel;
      const { teams } = duelRound;

      let availableDuelTeamParticipation: DuelTeamParticipation;

      teams.map((team) => {
        if (!availableDuelTeamParticipation) {
          availableDuelTeamParticipation = team.participations.find(
            (participation) => !participation.student
          );
        }
        return team;
      });

      if (availableDuelTeamParticipation) {
        duelTeamParticipation = await this.updateById({
          id: availableDuelTeamParticipation.id,
          studentId,
        });
      }
    }

    return duelTeamParticipation;
  }

  async findAll(): Promise<DuelTeamParticipation[]> {
    return await this.find({
      relations: ['duelTeam', 'student', 'duelQuestionsAnswers'],
    });
  }

  async findById(id: string): Promise<DuelTeamParticipation | undefined> {
    return await this.findOne(
      { id },
      {
        relations: ['duelTeam', 'student', 'duelQuestionsAnswers'],
      }
    );
  }

  async findByDuelTeam(id: string): Promise<DuelTeamParticipation[]> {
    const duelTeamRepository = await getCustomRepository(DuelTeamRepository);
    const duelTeam = await duelTeamRepository.findById(id);

    const duelTeamParticipationsFound = await this.find({
      where: {
        duelTeam,
      },
      relations: ['duelTeam', 'student', 'duelQuestionsAnswers'],
    });

    const duelTeamParticipations = Promise.all(
      duelTeamParticipationsFound.map(async (duelTeamParticipation, index) => {
        const { student: studentFound } = duelTeamParticipation;

        if (studentFound) {
          const studentRepository = await getCustomRepository(
            StudentRepository
          );
          const student = await studentRepository.findById(studentFound.id);
          return { ...duelTeamParticipation, student };
        }
        return { ...duelTeamParticipation };
      })
    );

    return duelTeamParticipations;
  }

  async updateById(updateFields: IDuelTeamParticipationRequest): Promise<void> {
    const { id, studentId } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key: string) => fields[key] === undefined && delete fields[key]
    );

    let duelTeamParticipation = { ...fields };

    if (studentId && studentId.trim() !== '') {
      // Obtendo o repositorio de conteudos
      const studentRepository = await getCustomRepository(StudentRepository);
      // Procurando o estudante na base de dados
      const student = await studentRepository.findById(studentId);

      if (student) {
        duelTeamParticipation = this.create({
          ...duelTeamParticipation,
          student,
        });
      }
    }

    await this.update({ id }, duelTeamParticipation);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
