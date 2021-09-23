import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { IStudentRequest } from "../../dto/IStudentRequest";
import { Student } from "../../entities/Student";
import { IStudentRepository } from "../interfaces/IStudentRepository";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> implements IStudentRepository {
  async createStudent(studentParams: IStudentRequest): Promise<Student> {
    const student = await this.save(studentParams);

    return student;
  }

  async findAll(): Promise<Student[]> {
    return await this.find();
  }

  async findByEmail(email: string): Promise<Student> {
    return await this.findOne({ email });
  }

  async updateByEmail(updateFields: IStudentRequest): Promise<void> {
    const { email } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      key => fields[key] == undefined && delete fields[key]
    );

    await this.update({ email }, fields);
  }

  async deleteByEmail(email: string): Promise<DeleteResult> {
    return await this.delete({ email });
  }
}