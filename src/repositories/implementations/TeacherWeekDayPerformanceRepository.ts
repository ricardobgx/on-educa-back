import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { ITeacherWeekDayPerformanceRequest } from '../../dto/teacherWeekDayPerformance/ITeacherWeekDayPerformanceRequest';
import { IUpdateTeacherWeekDayPerformanceRequest } from '../../dto/teacherWeekDayPerformance/IUpdateTeacherWeekDayPerformanceRequest';
import { TeacherWeekDayPerformance } from '../../entities/TeacherWeekDayPerformance';
import { ITeacherWeekDayPerformanceRepository } from '../interfaces/ITeacherWeekDayPerformanceRepository';
import { TeacherWeeklyPerformanceRepository } from './TeacherWeeklyPerformanceRepository';

@EntityRepository(TeacherWeekDayPerformance)
export class TeacherWeekDayPerformanceRepository
  extends Repository<TeacherWeekDayPerformance>
  implements ITeacherWeekDayPerformanceRepository
{
  async createTeacherWeekDayPerformance(
    teacherWeekDayPerformanceParams: ITeacherWeekDayPerformanceRequest
  ): Promise<TeacherWeekDayPerformance> {
    const { weeklyPerformanceId } = teacherWeekDayPerformanceParams;

    const teacherWeeklyPerformanceRepository = await getCustomRepository(
      TeacherWeeklyPerformanceRepository
    );
    const weeklyPerformance = await teacherWeeklyPerformanceRepository.findById(
      weeklyPerformanceId
    );

    const weekDay = this.create({
      weeklyPerformance,
      dailyXp: 0,
      contentsCreated: 0,
      questionsCreated: 0,
      doubtsSolved: 0,
      interativeRoomsCreated: 0,
      createdAt: new Date(),
    });

    // Salva a pratica na base de dados e retorna
    return await this.save(weekDay);
  }

  async findAll(): Promise<TeacherWeekDayPerformance[]> {
    return await this.find({
      relations: [],
    });
  }

  async findById(id: string): Promise<TeacherWeekDayPerformance | undefined> {
    const TeacherWeekDayPerformance = await this.findOne(
      { id },
      { relations: [] }
    );

    return TeacherWeekDayPerformance;
  }

  defineDefaultValueToUndefined(value: number): number {
    return !value ? 0 : value;
  }

  async updateWeekDayPerformanceValues(
    updateTeacherWeekDayPerformanceParams: IUpdateTeacherWeekDayPerformanceRequest
  ): Promise<void> {
    let {
      id,
      dailyXPNumber,
      contentsCreatedNumber,
      questionsCreatedNumber,
      doubtsSolvedNumber,
      interativeRoomsCreatedNumber,
    } = updateTeacherWeekDayPerformanceParams;

    const teacherWeekDayPerformance = await this.findById(id);
    const {
      dailyXp: oldDailyXp,
      contentsCreated: oldContentsCreated,
      questionsCreated: oldQuestionsCreated,
      doubtsSolved: oldDoubstSolved,
      interativeRoomsCreated: oldInterativeRoomsCreated,
    } = teacherWeekDayPerformance;

    // Verificando se as variaveis tem valores definidos

    const dailyXp =
      this.defineDefaultValueToUndefined(dailyXPNumber) + oldDailyXp;
    const contentsCreated =
      this.defineDefaultValueToUndefined(contentsCreatedNumber) +
      oldContentsCreated;
    const questionsCreated =
      this.defineDefaultValueToUndefined(questionsCreatedNumber) +
      oldQuestionsCreated;
    const doubtsSolved =
      this.defineDefaultValueToUndefined(doubtsSolvedNumber) + oldDoubstSolved;
    const interativeRoomsCreated =
      this.defineDefaultValueToUndefined(interativeRoomsCreatedNumber) +
      oldInterativeRoomsCreated;

    await this.updateById({
      id,
      dailyXp,
      contentsCreated,
      questionsCreated,
      doubtsSolved,
      interativeRoomsCreated,
    });
  }

  async updateById(
    updateFields: ITeacherWeekDayPerformanceRequest
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
