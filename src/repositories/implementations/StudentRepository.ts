import { DeleteResult, EntityRepository, getCustomRepository, Repository } from "typeorm";
import { IStudentRequest } from "../../dto/IStudentRequest";
import { Student } from "../../entities/Student";
import { IStudentRepository } from "../interfaces/IStudentRepository";
import { SchoolGradeRepository } from "./SchoolGradeRepository";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> implements IStudentRepository {
  async createStudent(studentParams: IStudentRequest): Promise<Student> {
    const { schoolGradeId } = studentParams;
    
    const schoolGradeRepository = getCustomRepository(SchoolGradeRepository);
    const schoolGrade = await schoolGradeRepository.findById(schoolGradeId);
    
    delete studentParams.schoolGradeId;

    const student = this.create({ ...studentParams, schoolGrade });

    return await this.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.find();
  }

  async findById(id: string): Promise<Student | undefined> {
    const student = await this.findOne({ id }, { relations: ['schoolGrade'] });
    return student;
  }

  async findByEmail(email: string): Promise<Student | undefined> {
    const student = await this.findOne({ email });
    return student;
  }

  async updateByEmail(updateFields: IStudentRequest): Promise<void> {
    const { email } = updateFields;
    const fields = { ...updateFields };

    delete fields.email;

    Object.keys(fields).map(
      key => fields[key] === undefined && delete fields[key]
    );

    await this.update({ email }, fields);
  }

  async deleteByEmail(email: string): Promise<DeleteResult> {
    return await this.delete({ email });
  }
}