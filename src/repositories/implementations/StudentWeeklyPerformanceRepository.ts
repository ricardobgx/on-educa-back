import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IStudentWeeklyPerformanceRequest } from '../../dto/IStudentWeeklyPerformanceRequest';
import { IUpdateStudentWeeklyPerformanceRequest } from '../../dto/IUpdateStudentWeeklyPerformanceRequest';
import { StudentWeeklyPerformance } from '../../entities/StudentWeeklyPerformance';
import { ApplicationErrors } from '../../errors';
import { getFullDate } from '../../functions/utils';
import { IStudentWeeklyPerformanceRepository } from '../interfaces/IStudentWeeklyPerformanceRepository';
import { StudentRepository } from './StudentRepository';
import { StudentWeekDayPerformanceRepository } from './StudentWeekDayPerformanceRepository';

@EntityRepository(StudentWeeklyPerformance)
export class StudentWeeklyPerformanceRepository
  extends Repository<StudentWeeklyPerformance>
  implements IStudentWeeklyPerformanceRepository
{
  async createStudentWeeklyPerformance(
    studentWeeklyPerformanceParams: IStudentWeeklyPerformanceRequest
  ): Promise<StudentWeeklyPerformance> {
    // Salva o desempenho semanal do aluno na base de dados e retorna
    const studentWeeklyPerformance = await this.save({
      createdAt: Date.now,
      xp: 0,
    });

    const studentWeekDayPerformanceRepository = await getCustomRepository(
      StudentWeekDayPerformanceRepository
    );
    const weekDay =
      await studentWeekDayPerformanceRepository.createStudentWeekDayPerformance(
        {
          weeklyPerformanceId: studentWeeklyPerformance.id,
        }
      );

    await this.update({ id: studentWeeklyPerformance.id }, { weekDay });

    return studentWeeklyPerformance;
  }

  async findAll(): Promise<StudentWeeklyPerformance[]> {
    const studentWeeklyPerformancesFound = await this.find({
      order: {
        xp: 'DESC',
      },
      relations: ['student'],
    });

    const studentWeeklyPerformances: StudentWeeklyPerformance[] = [];

    const studentRepository = await getCustomRepository(StudentRepository);

    await Promise.all(
      studentWeeklyPerformancesFound.map(
        async (studentWeeklyPerformanceFound) => {
          const student = await studentRepository.findById(
            studentWeeklyPerformanceFound.student.id
          );

          studentWeeklyPerformances.push({
            ...studentWeeklyPerformanceFound,
            student,
          });
        }
      )
    );

    return studentWeeklyPerformances;
  }

  async verifyStudentWeekDayPerformance(
    studentWeeklyPerformance: StudentWeeklyPerformance
  ): Promise<StudentWeeklyPerformance | undefined> {
    const { id, weekDay } = studentWeeklyPerformance;

    if (weekDay.createdAt === getFullDate()) {
      return { ...studentWeeklyPerformance };
    }

    const studentWeekDayPerformanceRepository = await getCustomRepository(
      StudentWeekDayPerformanceRepository
    );

    const newWeekDay =
      await studentWeekDayPerformanceRepository.createStudentWeekDayPerformance(
        { weeklyPerformanceId: id }
      );

    await this.update({ id }, { weekDay: newWeekDay });

    return { ...studentWeeklyPerformance, weekDay: newWeekDay };
  }

  async findById(id: string): Promise<StudentWeeklyPerformance | undefined> {
    const studentWeeklyPerformance = await this.findOne(
      { id },
      { relations: ['weekDay', 'weekDays'] }
    );

    return studentWeeklyPerformance;
  }

  async findByStudent(
    studentId: string
  ): Promise<StudentWeeklyPerformance | undefined> {
    const studentRepository = await getCustomRepository(StudentRepository);
    const student = await studentRepository.findById(studentId);

    console.log(studentId);

    const studentWeeklyPerformanceFound = await this.findOne(
      { student },
      { relations: ['weekDay', 'weekDays'] }
    );

    const studentWeeklyPerformance = await this.verifyStudentWeekDayPerformance(
      studentWeeklyPerformanceFound
    );

    return studentWeeklyPerformance;
  }

  async updateStudentWeeklyPerformanceValues(
    updateStudentWeeklyPerformanceParams: IUpdateStudentWeeklyPerformanceRequest
  ): Promise<void> {
    let { studentId, dailyXPNumber } = updateStudentWeeklyPerformanceParams;

    delete updateStudentWeeklyPerformanceParams.studentId;
    dailyXPNumber = !dailyXPNumber ? 0 : dailyXPNumber;

    const studentWeeklyPerformance = await this.findByStudent(studentId);
    if (!studentWeeklyPerformance) {
      return;
    }

    const { id, weekDay, xp } = studentWeeklyPerformance;
    await this.updateById({ id, xp: xp + dailyXPNumber });

    const studentWeekDayPerformanceRepository = await getCustomRepository(
      StudentWeekDayPerformanceRepository
    );
    await studentWeekDayPerformanceRepository.updateWeekDayPerformanceValues({
      ...updateStudentWeeklyPerformanceParams,
      id: weekDay.id,
    });
  }

  async updateById(
    updateFields: IStudentWeeklyPerformanceRequest
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
