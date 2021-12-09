import { DeleteResult, EntityRepository, getCustomRepository, Repository } from "typeorm";
import { ITeacherRequest } from "../../dto/ITeacherRequest";
import { Teacher } from "../../entities/Teacher";
import { ITeacherRepository } from "../interfaces/ITeacherRepository";
import { TeachingTypeRepository } from "./TeachingTypeRepository";

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> implements ITeacherRepository {
  async createTeacher(teacherParams: ITeacherRequest): Promise<Teacher> {
    const { teachingTypeId } = teacherParams;

    const teachingTypeRepository = getCustomRepository(TeachingTypeRepository);
    const teachingType = await teachingTypeRepository.findById(teachingTypeId);
    
    delete teacherParams.teachingTypeId;

    const teacher = this.create({...teacherParams, teachingType });

    return await await this.save(teacher);
  }

  async findAll(): Promise<Teacher[]> {
    return await this.find({
      relations: ['teachingType']
    });
  }

  async findById(id: string): Promise<Teacher | undefined> {
    return await this.findOne({ id }, {
      relations: ['teachingType']
    });
  }

  async findByEmail(email: string): Promise<Teacher | undefined> {
    return await this.findOne({ email }, {
      relations: ['teachingType']
    });
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