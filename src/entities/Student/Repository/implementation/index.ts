import { EntityRepository, Repository } from 'typeorm';

import Student from '../../Entity';
import IStudentRepository from '../interface';
import { IStudent } from '../types';

@EntityRepository(Student)
export default class StudentRepository extends Repository<Student> implements IStudentRepository {
  async createStudent(studentParams: IStudent): Promise<Student> {
    const student = this.save(studentParams);
    return student;
  }

  async findAll(): Promise<Student[]> {
    return await this.find({
      select: ['id', 'name', 'email', 'photo', 'schoolGrade', 'isOnline']
    });
  }

  async findByEmail(email: string): Promise<Student> {
    return await this.findOne({ email });
  }

  async updateByEmail(studentParams: IStudent): Promise<void> {
    Object.keys(studentParams).map(
      key => studentParams[key] === undefined && delete studentParams[key]
    );

    const { email } = studentParams;

    await this.update({ email }, studentParams);
  }

  async deleteByEmail(email: string): Promise<void> {
    await this.delete({ email });
  }
}