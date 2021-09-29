import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { ITeacherRequest } from "../../dto/ITeacherRequest";
import { Subject } from "../../entities/Subject";
import { Teacher } from "../../entities/Teacher";
import { ITeacherRepository } from "../interfaces/ITeacherRepository";

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> implements ITeacherRepository {
  async createTeacher(teacherParams: ITeacherRequest): Promise<Teacher> {
    const teacher = await this.save(teacherParams);

    return teacher;
  }

  async findAll(): Promise<Teacher[]> {
    return await this.find({
      relations: ['subjects']
    });
  }

  async findByEmail(email: string): Promise<Teacher> {
    return await this.findOne({ email }, {
      relations: ['subjects']
    });
  }

  async updateByEmail(updateFields: ITeacherRequest): Promise<void> {
    const { email } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      key => fields[key] === undefined && delete fields[key]
    );

    const teacher = await this.findByEmail(email);

    await this.removeSubjects(teacher);

    if (fields.subjects) {
      fields.subjects.map(async subject => {
        await this.createQueryBuilder()
          .relation(Teacher, 'subjects')
          .of(teacher)
          .add(subject);
      });
    }

    delete fields.subjects;

    await this.update({ email }, fields);
  }

  async removeSubjects(teacher: Teacher): Promise<void> {
    const subjects: Subject[] = await this.createQueryBuilder()
      .relation(Teacher, 'subjects')
      .of(teacher)
      .loadMany();

    subjects.map(async subject => {
      await this.createQueryBuilder()
        .relation(Teacher, 'subjects')
        .of(teacher)
        .remove(subject);
    });
  }

  async deleteByEmail(email: string): Promise<DeleteResult> {
    const teacher = await this.findByEmail(email);
    await this.removeSubjects(teacher);

    return await this.delete({ email });
  }
}