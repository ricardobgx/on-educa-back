import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDuelTeamParticipationRequest } from '../../dto/IDuelTeamParticipationRequest';
import { IManyDuelTeamParticipationRequest } from '../../dto/IManyDuelTeamParticipationRequest';
import { DuelTeamParticipation } from '../../entities/DuelTeamParticipation';
import { IDuelTeamParticipationRepository } from '../interfaces/IDuelTeamParticipationRepository';
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
    let { studentId } = duelTeamParticipationParams;

    // Excluindo a variavel que armazena o id dos conteudos da entidade
    delete duelTeamParticipationParams.studentId;

    // Armazenando os novos parametros em outra variavel
    let duelTeamParticipation = { ...duelTeamParticipationParams };

    // Obtendo o repositorio de conteudos
    const studentRepository = await getCustomRepository(StudentRepository);

    const student = await studentRepository.findById(studentId);

    duelTeamParticipation = this.create({ ...duelTeamParticipation, student });

    // Criando o TeamParticipation do duelo
    return await this.save({ ...duelTeamParticipation });
  }

  async createManyDuelTeamParticipations(
    duelTeamParticipationsParams: IManyDuelTeamParticipationRequest
  ): Promise<DuelTeamParticipation[]> {
    const { studentsIds } = duelTeamParticipationsParams;
    const duelTeamParticipations: DuelTeamParticipation[] = [];

    await Promise.all(
      studentsIds.map(async (studentId) => {
        const duelTeamParticipation = await this.createDuelTeamParticipation({
          studentId,
        });
        duelTeamParticipations.push(duelTeamParticipation);
      })
    );

    return duelTeamParticipations;
  }

  async findAll(): Promise<DuelTeamParticipation[]> {
    return await this.find({
      relations: [
        'duelTeamParticipationOwner',
        'questions',
        'teamParticipations',
      ],
    });
  }

  async findById(id: string): Promise<DuelTeamParticipation | undefined> {
    return await this.findOne(
      { id },
      {
        relations: [
          'duelTeamParticipationOwner',
          'questions',
          'teamParticipations',
        ],
      }
    );
  }

  async updateById(updateFields: IDuelTeamParticipationRequest): Promise<void> {
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
