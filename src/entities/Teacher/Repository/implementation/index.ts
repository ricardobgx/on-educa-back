import { EntityRepository, Repository } from 'typeorm';

import Teacher from '../../Entity';
import ITeacherRepository from '../interface';
import { ITeacher } from '../types';

@EntityRepository(Teacher)
export default class TeacherRepository extends Repository<Teacher> implements ITeacherRepository {
  async createTeacher(teacherParams: ITeacher): Promise<Teacher> {
    const teacher = this.save(teacherParams);
    return teacher;
  }

  async findAll(): Promise<Teacher[]> {
    return await this.find({
      select: ['id', 'name', 'email', 'photo', 'isOnline'],
      relations: ['subjects']
    });
  }

  async findByEmail(email: string): Promise<Teacher> {
    return await this.findOne({ email });
  }

  async updateByEmail(teacherParams: ITeacher): Promise<void> {
    Object.keys(teacherParams).map(
      key => teacherParams[key] === undefined && delete teacherParams[key]
    );

    const { email } = teacherParams;

    await this.update({ email }, teacherParams);
  }

  async deleteByEmail(email: string): Promise<void> {
    await this.delete({ email });
  }
}