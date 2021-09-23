import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { ITeacherRequest } from "../../dto/ITeacherRequest";
import { Teacher } from "../../entities/Teacher";
import { ITeacherRepository } from "../interfaces/ITeacherRepository";

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> implements ITeacherRepository {
  async createTeacher(teacherParams: ITeacherRequest): Promise<Teacher> {
    const teacher = await this.save(teacherParams);

    return teacher;
  }

  async findAll(): Promise<Teacher[]> {
    return await this.find();
  }

  async findByEmail(email: string): Promise<Teacher> {
    return await this.findOne({ email });
  }

  async updateByEmail(updateFields: ITeacherRequest): Promise<void> {
    const { email } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      key => fields[key] === undefined && delete fields[key]
    );

    await this.update({ email }, fields);
  }

  async deleteByEmail(email: string): Promise<DeleteResult> {
    return await this.delete({ email });
  }
}