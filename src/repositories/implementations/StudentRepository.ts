import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IStudentRequest } from '../../dto/IStudentRequest';
import { Student } from '../../entities/Student';
import { IStudentRepository } from '../interfaces/IStudentRepository';
import { SchoolGradeRepository } from './SchoolGradeRepository';
import { StudentWeeklyPerformanceRepository } from './StudentWeeklyPerformanceRepository';
import { PeopleRepository } from './PeopleRepository';
import { ApplicationErrors } from '../../errors';

@EntityRepository(Student)
export class StudentRepository
  extends Repository<Student>
  implements IStudentRepository
{
  async createStudent(studentParams: IStudentRequest): Promise<Student> {
    const { peopleId, schoolGradeId } = studentParams;

    delete studentParams.peopleId;
    delete studentParams.schoolGradeId;

    if (!peopleId) {
      throw new ApplicationErrors('Pessoa não informada', 404);
    }
    const peopleRepository = await getCustomRepository(PeopleRepository);
    const people = await peopleRepository.findById(peopleId);

    if (!people) {
      throw new ApplicationErrors('Pessoa não encontrada', 404);
    }

    if (!schoolGradeId) {
      throw new ApplicationErrors('Série não informada', 400);
    }
    const schoolGradeRepository = getCustomRepository(SchoolGradeRepository);
    const schoolGrade = await schoolGradeRepository.findById(schoolGradeId);

    if (!schoolGrade) {
      throw new ApplicationErrors('Série não encontrada', 404);
    }

    const studentWeeklyPerformanceRepository = await getCustomRepository(
      StudentWeeklyPerformanceRepository
    );
    const weeklyPerformance =
      await studentWeeklyPerformanceRepository.createStudentWeeklyPerformance(
        {}
      );

    const student = this.create({
      ...studentParams,
      people,
      schoolGrade,
      weeklyPerformance,
    });

    return await this.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.find({
      relations: ['schoolGrade', 'people'],
    });
  }

  async findById(id: string): Promise<Student | undefined> {
    const student = await this.findOne(
      { id },
      { relations: ['schoolGrade', 'people'] }
    );

    if (student) {
      const schoolGradeRepository = await getCustomRepository(
        SchoolGradeRepository
      );
      const schoolGrade = await schoolGradeRepository.findById(
        student.schoolGrade.id
      );

      return this.create({ ...student, schoolGrade });
    }
    return student;
  }

  async findByPeopleId(peopleId: string): Promise<Student | undefined> {
    const peopleRepository = await getCustomRepository(PeopleRepository);
    const people = await peopleRepository.findById(peopleId);

    const student = await this.findOne(
      { people },
      { relations: ['schoolGrade', 'people'] }
    );

    if (student) {
      const schoolGradeRepository = await getCustomRepository(
        SchoolGradeRepository
      );
      const schoolGrade = await schoolGradeRepository.findById(
        student.schoolGrade.id
      );

      return this.create({ ...student, schoolGrade });
    }

    return student;
  }

  async updateById(updateFields: IStudentRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    delete fields.id;

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    let student = { ...fields };

    if (fields.schoolGradeId) {
      const schoolGradeRepository = getCustomRepository(SchoolGradeRepository);
      const schoolGrade = await schoolGradeRepository.findById(
        fields.schoolGradeId
      );

      if (schoolGrade) student = this.create({ ...fields, schoolGrade });
    }

    await this.update({ id }, student);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
