import { DeleteResult, EntityRepository, getCustomRepository, Repository } from "typeorm";
import { IManySubjects } from "../../dto/IManySubjects";
import { ISubjectRequest } from "../../dto/ISubjectRequest";
import { Subject } from "../../entities/Subject";
import { ISubjectRepository } from "../interfaces/ISubjectRepository";
import { SchoolGradeRepository } from "./SchoolGradeRepository";

@EntityRepository(Subject)
export class SubjectRepository extends Repository<Subject> implements ISubjectRepository {
  async createSubject(subjectParams: ISubjectRequest): Promise<Subject> {
    const { name, schoolGradeId } = subjectParams;

    const schoolGradeRepository = getCustomRepository(SchoolGradeRepository);
    const schoolGrade = await schoolGradeRepository.findById(schoolGradeId);

    const newSubjectParams = this.create({ name, schoolGrade });

    const subject = await this.save(newSubjectParams);

    return subject;
  }

  async findAll(): Promise<Subject[]> {
    return await this.find({
      relations: ['units', 'schoolGrade']
    });
  }

  async createManySubjects(subjectsParams: IManySubjects): Promise<Subject[]> {
    const subjects: Subject[] = [];
    const { names, schoolGradeId } = subjectsParams;

    await Promise.all(
      names.map(async (name): Promise<void> => {
        const subject = await this.createSubject({ name, schoolGradeId });
        subjects.push(subject);
      })
    );
    
    return subjects;
  }

  async findBySchoolGrade(schoolGradeId: string): Promise<Subject[]> {
    const schoolGradeRepository = getCustomRepository(SchoolGradeRepository);

    const schoolGrade = await schoolGradeRepository.findById(schoolGradeId);
    
    const subjects = this.find({ where: { schoolGrade }, relations: ['units'] });

    return subjects;
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