import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { ISubjectRequest } from "../../dto/ISubjectRequest";
import { Subject } from "../../entities/Subject";
import { ISubjectRepository } from "../interfaces/ISubjectRepository";

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> implements ISubjectRepository {
  async createSubject(subjectParams: ISubjectRequest): Promise<Subject> {
    const subject = await this.save(subjectParams);

    return subject;
  }

  async findAll(): Promise<Subject[]> {
    return await this.find({
      relations: ['teachers']
    });
  }

  async findById(id: string): Promise<Subject | undefined> {
    const subject = await this.findOne({ id });
    return subject;
  }

  async updateById(updateFields: ISubjectRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    delete fields.id;

    Object.keys(fields).map(
      key => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    const subject = await this.findById(id);
    await this.removeTeachers(subject);

    return await this.delete({ id });
  }

  async removeTeachers(subject: Subject): Promise<void> {
    const teachers = await this.createQueryBuilder()
      .relation(Subject, 'teachers')
      .of(subject)
      .loadMany();

    teachers.map(async teacher => {
      await this.createQueryBuilder()
        .relation(Subject, 'teachers')
        .of(subject)
        .remove(teacher);
    });
  }
}