import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IStudentWeeklyPerformanceRequest } from '../../dto/studentWeeklyPerformance/IStudentWeeklyPerformanceRequest';
import { IUpdateStudentWeeklyPerformanceRequest } from '../../dto/studentWeeklyPerformance/IUpdateStudentWeeklyPerformanceRequest';
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
    const { studentId } = studentWeeklyPerformanceParams;

    delete studentWeeklyPerformanceParams.studentId;

    let student = null;

    if (studentId) {
      const studentRepository = await getCustomRepository(StudentRepository);

      student = await studentRepository.findById(studentId);
    }

    // Salva o desempenho semanal do aluno na base de dados e retorna
    const studentWeeklyPerformance = await this.save({
      xp: 0,
      student,
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
      take: 100,
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

    if (getFullDate(weekDay.createdAt) === getFullDate()) {
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
    if (!studentId) {
      throw new ApplicationErrors('Estudante não informado', 400);
    }

    const studentRepository = await getCustomRepository(StudentRepository);
    const student = await studentRepository.findById(studentId);

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

  async resetWeeklyPerformances(): Promise<void> {
    console.log('resetando os desempenhos dos estudantes');

    await this.delete({});

    const studentRepository = await getCustomRepository(StudentRepository);

    const students = await studentRepository.findAll();

    await Promise.all(
      students.map(async (student) => {
        await this.createStudentWeeklyPerformance({ studentId: student.id });
      })
    );
  }
}
