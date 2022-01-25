import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IStudentWeekPerformanceRequest } from '../../dto/IStudentWeekPerformanceRequest';
import { IUpdateStudentWeekPerformanceRequest } from '../../dto/IUpdateStudentWeekPerformanceRequest';
import { StudentWeekPerformance } from '../../entities/StudentWeekPerformance';
import { ApplicationErrors } from '../../errors';
import { getFullDate } from '../../functions/utils';
import { IStudentWeekPerformanceRepository } from '../interfaces/IStudentWeekPerformanceRepository';
import { StudentRepository } from './StudentRepository';
import { StudentWeekDayPerformanceRepository } from './StudentWeekDayPerformanceRepository';

@EntityRepository(StudentWeekPerformance)
export class StudentWeekPerformanceRepository
  extends Repository<StudentWeekPerformance>
  implements IStudentWeekPerformanceRepository
{
  async createStudentWeekPerformance(
    studentWeekPerformanceParams: IStudentWeekPerformanceRequest
  ): Promise<StudentWeekPerformance> {
    const fullDate = getFullDate();

    // Salva o desempenho semanal do aluno na base de dados e retorna
    const studentWeekPerformance = await this.save({
      createdAt: fullDate,
      xp: 0,
    });

    const studentWeekDayPerformanceRepository = await getCustomRepository(
      StudentWeekDayPerformanceRepository
    );
    const weekDay =
      await studentWeekDayPerformanceRepository.createStudentWeekDayPerformance(
        {
          weekPerformanceId: studentWeekPerformance.id,
        }
      );

    await this.update({ id: studentWeekPerformance.id }, { weekDay });

    return studentWeekPerformance;
  }

  async findAll(): Promise<StudentWeekPerformance[]> {
    return await this.find({
      relations: [],
    });
  }

  async verifyStudentWeekDayPerformance(
    studentWeekPerformance: StudentWeekPerformance
  ): Promise<StudentWeekPerformance | undefined> {
    const { id, weekDay } = studentWeekPerformance;
    const fullDate = getFullDate();

    if (weekDay.date === fullDate) {
      return { ...studentWeekPerformance };
    }

    const studentWeekDayPerformanceRepository = await getCustomRepository(
      StudentWeekDayPerformanceRepository
    );

    const newWeekDay =
      await studentWeekDayPerformanceRepository.createStudentWeekDayPerformance(
        { weekPerformanceId: id }
      );

    await this.update({ id }, { weekDay: newWeekDay });

    return { ...studentWeekPerformance, weekDay: newWeekDay };
  }

  async findById(id: string): Promise<StudentWeekPerformance | undefined> {
    const studentWeekPerformance = await this.findOne(
      { id },
      { relations: ['weekDay', 'weekDays'] }
    );

    return studentWeekPerformance;
  }

  async findByStudent(
    studentId: string
  ): Promise<StudentWeekPerformance | undefined> {
    const studentRepository = await getCustomRepository(StudentRepository);
    const student = await studentRepository.findById(studentId);

    const studentWeekPerformanceFound = await this.findOne(
      { student },
      { relations: ['weekDay', 'weekDays'] }
    );

    const studentWeekPerformance = await this.verifyStudentWeekDayPerformance(
      studentWeekPerformanceFound
    );

    return studentWeekPerformance;
  }

  async updateStudentWeekPerformanceValues(
    updateStudentWeekPerformanceParams: IUpdateStudentWeekPerformanceRequest
  ): Promise<void> {
    let { studentId, dailyXPNumber } = updateStudentWeekPerformanceParams;

    delete updateStudentWeekPerformanceParams.studentId;
    dailyXPNumber = !dailyXPNumber ? 0 : dailyXPNumber;

    const studentWeekPerformance = await this.findByStudent(studentId);
    if (!studentWeekPerformance) {
      return;
    }

    const { id, weekDay, xp } = studentWeekPerformance;
    await this.updateById({ id, xp: xp + dailyXPNumber });

    const studentWeekDayPerformanceRepository = await getCustomRepository(
      StudentWeekDayPerformanceRepository
    );
    await studentWeekDayPerformanceRepository.updateWeekDayPerformanceValues({
      ...updateStudentWeekPerformanceParams,
      id: weekDay.id,
    });
  }

  async updateById(
    updateFields: IStudentWeekPerformanceRequest
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
