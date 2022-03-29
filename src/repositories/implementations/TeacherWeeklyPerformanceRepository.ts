import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { ITeacherWeeklyPerformanceRequest } from '../../dto/teacherWeeklyPerformance/ITeacherWeeklyPerformanceRequest';
import { IUpdateTeacherWeeklyPerformanceRequest } from '../../dto/teacherWeeklyPerformance/IUpdateTeacherWeeklyPerformanceRequest';
import { TeacherWeeklyPerformance } from '../../entities/TeacherWeeklyPerformance';
import { ApplicationErrors } from '../../errors';
import { getFullDate } from '../../functions/utils';
import { ITeacherWeeklyPerformanceRepository } from '../interfaces/ITeacherWeeklyPerformanceRepository';
import { TeacherRepository } from './TeacherRepository';
import { TeacherWeekDayPerformanceRepository } from './TeacherWeekDayPerformanceRepository';

@EntityRepository(TeacherWeeklyPerformance)
export class TeacherWeeklyPerformanceRepository
  extends Repository<TeacherWeeklyPerformance>
  implements ITeacherWeeklyPerformanceRepository
{
  async createTeacherWeeklyPerformance(
    teacherWeeklyPerformanceParams: ITeacherWeeklyPerformanceRequest
  ): Promise<TeacherWeeklyPerformance> {
    const { teacherId } = teacherWeeklyPerformanceParams;

    delete teacherWeeklyPerformanceParams.teacherId;

    let teacher = null;

    if (teacherId) {
      const teacherRepository = await getCustomRepository(TeacherRepository);

      teacher = await teacherRepository.findById(teacherId);
    }

    // Salva o desempenho semanal do aluno na base de dados e retorna
    const teacherWeeklyPerformance = await this.save({
      xp: 0,
      teacher,
    });

    const teacherWeekDayPerformanceRepository = await getCustomRepository(
      TeacherWeekDayPerformanceRepository
    );
    const weekDay =
      await teacherWeekDayPerformanceRepository.createTeacherWeekDayPerformance(
        {
          weeklyPerformanceId: teacherWeeklyPerformance.id,
        }
      );

    await this.update({ id: teacherWeeklyPerformance.id }, { weekDay });

    return teacherWeeklyPerformance;
  }

  async findAll(): Promise<TeacherWeeklyPerformance[]> {
    const teacherWeeklyPerformancesFound = await this.find({
      order: {
        xp: 'DESC',
      },
      relations: ['teacher'],
    });

    const teacherWeeklyPerformances: TeacherWeeklyPerformance[] = [];

    const teacherRepository = await getCustomRepository(TeacherRepository);

    await Promise.all(
      teacherWeeklyPerformancesFound.map(
        async (teacherWeeklyPerformanceFound) => {
          const teacher = await teacherRepository.findById(
            teacherWeeklyPerformanceFound.teacher.id
          );

          teacherWeeklyPerformances.push({
            ...teacherWeeklyPerformanceFound,
            teacher,
          });
        }
      )
    );

    return teacherWeeklyPerformances;
  }

  async verifyTeacherWeekDayPerformance(
    teacherWeeklyPerformance: TeacherWeeklyPerformance
  ): Promise<TeacherWeeklyPerformance | undefined> {
    const { id, weekDay } = teacherWeeklyPerformance;

    if (getFullDate(weekDay.createdAt) === getFullDate()) {
      return { ...teacherWeeklyPerformance };
    }

    const teacherWeekDayPerformanceRepository = await getCustomRepository(
      TeacherWeekDayPerformanceRepository
    );

    const newWeekDay =
      await teacherWeekDayPerformanceRepository.createTeacherWeekDayPerformance(
        { weeklyPerformanceId: id }
      );

    await this.update({ id }, { weekDay: newWeekDay });

    return { ...teacherWeeklyPerformance, weekDay: newWeekDay };
  }

  async findById(id: string): Promise<TeacherWeeklyPerformance | undefined> {
    const teacherWeeklyPerformance = await this.findOne(
      { id },
      { relations: ['weekDay', 'weekDays'] }
    );

    return teacherWeeklyPerformance;
  }

  async findByTeacher(
    teacherId: string
  ): Promise<TeacherWeeklyPerformance | undefined> {
    if (!teacherId) {
      throw new ApplicationErrors('Estudante não informado', 400);
    }

    const teacherRepository = await getCustomRepository(TeacherRepository);
    const teacher = await teacherRepository.findById(teacherId);

    console.log(`Buscando performance do estudante ${teacherId}`);

    const teacherWeeklyPerformanceFound = await this.findOne(
      { teacher },
      { relations: ['weekDay', 'weekDays'] }
    );

    const teacherWeeklyPerformance = await this.verifyTeacherWeekDayPerformance(
      teacherWeeklyPerformanceFound
    );

    return teacherWeeklyPerformance;
  }

  async updateTeacherWeeklyPerformanceValues(
    updateTeacherWeeklyPerformanceParams: IUpdateTeacherWeeklyPerformanceRequest
  ): Promise<void> {
    let { teacherId, dailyXPNumber } = updateTeacherWeeklyPerformanceParams;

    console.log(updateTeacherWeeklyPerformanceParams);

    delete updateTeacherWeeklyPerformanceParams.teacherId;
    dailyXPNumber = !dailyXPNumber ? 0 : dailyXPNumber;

    const teacherWeeklyPerformance = await this.findByTeacher(teacherId);
    if (!teacherWeeklyPerformance) {
      return;
    }

    const { id, weekDay, xp } = teacherWeeklyPerformance;
    await this.updateById({ id, xp: xp + dailyXPNumber });

    const teacherWeekDayPerformanceRepository = await getCustomRepository(
      TeacherWeekDayPerformanceRepository
    );
    await teacherWeekDayPerformanceRepository.updateWeekDayPerformanceValues({
      ...updateTeacherWeeklyPerformanceParams,
      id: weekDay.id,
    });
  }

  async updateById(
    updateFields: ITeacherWeeklyPerformanceRequest
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

  async resetWeeklyPerformances(): Promise<void> {
    console.log('resetando os desempenhos dos professores');

    await this.delete({});

    const teacherRepository = await getCustomRepository(TeacherRepository);

    const teachers = await teacherRepository.findAll();

    await Promise.all(
      teachers.map(async (teacher) => {
        await this.createTeacherWeeklyPerformance({ teacherId: teacher.id });
      })
    );
  }
}
