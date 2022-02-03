import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IStudentWeekDayPerformanceRequest } from '../../dto/IStudentWeekDayPerformanceRequest';
import { IUpdateStudentWeekDayPerformanceRequest } from '../../dto/IUpdateStudentWeekDayPerformanceRequest';
import { StudentWeekDayPerformance } from '../../entities/StudentWeekDayPerformance';
import { ApplicationErrors } from '../../errors';
import { getFullDate } from '../../functions/utils';
import { IStudentWeekDayPerformanceRepository } from '../interfaces/IStudentWeekDayPerformanceRepository';
import { StudentWeeklyPerformanceRepository } from './StudentWeeklyPerformanceRepository';

@EntityRepository(StudentWeekDayPerformance)
export class StudentWeekDayPerformanceRepository
  extends Repository<StudentWeekDayPerformance>
  implements IStudentWeekDayPerformanceRepository
{
  async createStudentWeekDayPerformance(
    studentWeekDayPerformanceParams: IStudentWeekDayPerformanceRequest
  ): Promise<StudentWeekDayPerformance> {
    const { weeklyPerformanceId } = studentWeekDayPerformanceParams;

    const studentWeeklyPerformanceRepository = await getCustomRepository(
      StudentWeeklyPerformanceRepository
    );
    const weeklyPerformance = await studentWeeklyPerformanceRepository.findById(
      weeklyPerformanceId
    );

    // Salva a pratica na base de dados e retorna
    return await this.save({
      weeklyPerformance,
      dailyXp: 0,
      contentsStudied: 0,
      questionsAnswered: 0,
      questionsAnsweredCorrectly: 0,
      duelsParticipated: 0,
      duelsWon: 0,
      createdAt: getFullDate(),
    });
  }

  async findAll(): Promise<StudentWeekDayPerformance[]> {
    return await this.find({
      relations: [],
    });
  }

  async findById(id: string): Promise<StudentWeekDayPerformance | undefined> {
    const StudentWeekDayPerformance = await this.findOne(
      { id },
      { relations: [] }
    );

    return StudentWeekDayPerformance;
  }

  defineDefaultValueToUndefined(value: number): number {
    return !value ? 0 : value;
  }

  async updateWeekDayPerformanceValues(
    updateStudentWeekDayPerformanceParams: IUpdateStudentWeekDayPerformanceRequest
  ): Promise<void> {
    let {
      id,
      dailyXPNumber,
      studiedContentsNumber,
      questionsAnsweredNumber,
      rightQuestionsAnsweredNumber,
      duelsParticipatedNumber,
      duelsWonNumber,
    } = updateStudentWeekDayPerformanceParams;

    const studentWeekDayPerformance = await this.findById(id);
    const {
      dailyXp: oldDailyXp,
      contentsStudied: oldStudiedContents,
      questionsAnswered: oldQuestionsAnswered,
      questionsAnsweredCorrectly: oldRightQuestionsAnswered,
      duelsParticipated: oldDuelsParticipated,
      duelsWon: oldDuelsWon,
    } = studentWeekDayPerformance;

    // Verificando se as variaveis tem valores definidos

    const dailyXp =
      this.defineDefaultValueToUndefined(dailyXPNumber) + oldDailyXp;
    const contentsStudied =
      this.defineDefaultValueToUndefined(studiedContentsNumber) +
      oldStudiedContents;
    const questionsAnswered =
      this.defineDefaultValueToUndefined(questionsAnsweredNumber) +
      oldQuestionsAnswered;
    const questionsAnsweredCorrectly =
      this.defineDefaultValueToUndefined(rightQuestionsAnsweredNumber) +
      oldRightQuestionsAnswered;
    const duelsParticipated =
      this.defineDefaultValueToUndefined(duelsParticipatedNumber) +
      oldDuelsParticipated;
    const duelsWon =
      this.defineDefaultValueToUndefined(duelsWonNumber) + oldDuelsWon;

    await this.updateById({
      id,
      dailyXp,
      contentsStudied,
      questionsAnswered,
      questionsAnsweredCorrectly,
      duelsParticipated,
      duelsWon,
    });
  }

  async updateById(
    updateFields: IStudentWeekDayPerformanceRequest
  ): Promise<void> {
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
