import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IParticipateInDuelRequest } from '../../dto/IParticipateInDuelRequest';
import { IDuelTeamParticipationRequest } from '../../dto/IDuelTeamParticipationRequest';
import { IManyDuelTeamParticipationRequest } from '../../dto/IManyDuelTeamParticipationRequest';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { IDuelTeamParticipationRepository } from '../interfaces/IDuelTeamParticipationRepository';
import { DuelRepository } from './DuelRepository';
import { DuelTeamRepository } from './DuelTeamRepository';
import { StudentRepository } from './StudentRepository';
import { IChangeDuelTeamPositionRequest } from '../../dto/IChangeDuelTeamPositionRequest';

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

  async participateInDuel(
    participateInDuelParams: IParticipateInDuelRequest
  ): Promise<DuelTeamParticipation | undefined> {
    const { duelId, studentId } = participateInDuelParams;

    const duelRepository = await getCustomRepository(DuelRepository);
    const duel = await duelRepository.findById(duelId);

    let duelTeamParticipation: DuelTeamParticipation;

    if (duel) {
      const { duelRound } = duel;

      const duelTeamRepository = await getCustomRepository(DuelTeamRepository);
      const teams = await duelTeamRepository.findByDuelRoundId(duelRound.id);

      let existingParticipation: DuelTeamParticipation;

      teams.map((team) => {
        if (!existingParticipation) {
          existingParticipation = team.participations.find(
            (participation) =>
              participation.student && participation.student.id === studentId
          );
        }
        return team;
      });

      if (existingParticipation) {
        return existingParticipation;
      }

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
        await this.updateById({
          id: availableDuelTeamParticipation.id,
          studentId,
        });

        duelTeamParticipation = await this.findById(
          availableDuelTeamParticipation.id
        );
      }
    }

    return duelTeamParticipation;
  }

  async exitDuelTeamParticipation(id: string): Promise<void> {
    await this.update({ id }, { student: null });
  }

  async findAll(): Promise<DuelTeamParticipation[]> {
    return await this.find({
      relations: ['duelTeam', 'student', 'duelQuestionsAnswers'],
    });
  }

  async findById(id: string): Promise<DuelTeamParticipation | undefined> {
    const duelTeamParticipation = await this.findOne(
      { id },
      {
        relations: ['student', 'duelQuestionsAnswers'],
      }
    );

    const { student: studentFound } = duelTeamParticipation;

    if (studentFound) {
      const studentRepository = await getCustomRepository(StudentRepository);
      const student = await studentRepository.findById(studentFound.id);

      return { ...duelTeamParticipation, student };
    }

    return duelTeamParticipation;
  }

  async findByDuelTeam(id: string): Promise<DuelTeamParticipation[]> {
    const duelTeamRepository = await getCustomRepository(DuelTeamRepository);
    const duelTeam = await duelTeamRepository.findById(id);

    const duelTeamParticipationsFound = await this.find({
      where: {
        duelTeam,
      },
    });

    const duelTeamParticipations = Promise.all(
      duelTeamParticipationsFound.map(async (duelTeamParticipation) => {
        return await this.findById(duelTeamParticipation.id);
      })
    );

    return duelTeamParticipations;
  }

  /**************************************************************************
   * @author Jose Ricardo Brasileiro Goncalves
   * @modified 10/01/2022
   * @param oldDuelTeamParticipationId Recebe o id da participacao que o es-
   * tudante ocupa no momento
   * @param newDuelTeamParticipationId Recebe o id da nova participacao que o
   * estudante ocupara
   * @param studentId Recebe o id do estudante que deseja mudar de posicao
   ************************************************************************ */

  async changeDuelTeamPosition(
    changeDuelTeamPositionParams: IChangeDuelTeamPositionRequest
  ): Promise<void> {
    // Desestrutura as variaveis necessarias para a funcao
    const {
      oldDuelTeamParticipationId,
      newDuelTeamParticipationId,
      studentId,
    } = changeDuelTeamPositionParams;

    // Procura a antiga posicao do estudante no duelo
    const newDuelTeamParticipation = await this.findById(
      newDuelTeamParticipationId
    );

    // Se a antiga participacao nao existir a funcao se encerra
    if (!newDuelTeamParticipation) {
      return;
    }

    if (newDuelTeamParticipation.student) {
      return;
    }

    // Procura a nova posicao que o estudante ocupara no duelo
    const oldDuelTeamParticipation = await this.findById(
      oldDuelTeamParticipationId
    );

    // Se a nova participacao nao existir a funcao se encerra
    if (!oldDuelTeamParticipation) {
      return;
    }

    // Obtem o repositorio que mantem os estudantes
    const studentRepository = await getCustomRepository(StudentRepository);
    // Procura o estudante na base de dados
    const student = await studentRepository.findById(studentId);

    // Remove o estudante da antiga participacao
    await this.update({ id: oldDuelTeamParticipationId }, { student: null });
    // Adiciona o estudante na nova participacao
    await this.update({ id: newDuelTeamParticipationId }, { student });
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
