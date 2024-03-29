import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';

import { ITeacherRequest } from '../../dto/teacher/ITeacherRequest';
import { Image } from '../../entities/Image';
import { Teacher } from '../../entities/Teacher';
import { ApplicationErrors } from '../../errors';
import { ITeacherRepository } from '../interfaces/ITeacherRepository';
import { ImageRepository } from './ImageRepository';
import { PeopleRepository } from './PeopleRepository';
import { TeacherWeeklyPerformanceRepository } from './TeacherWeeklyPerformanceRepository';
import { TeachingTypeRepository } from './TeachingTypeRepository';

@EntityRepository(Teacher)
export class TeacherRepository
  extends Repository<Teacher>
  implements ITeacherRepository
{
  async createTeacher(teacherParams: ITeacherRequest): Promise<Teacher> {
    const { peopleId, teachingTypeId } = teacherParams;

    delete teacherParams.teachingTypeId;
    delete teacherParams.peopleId;

    if (!peopleId) {
      throw new ApplicationErrors('Pessoa não informada', 400);
    }

    if (!teachingTypeId) {
      throw new ApplicationErrors('Ensino não informado', 400);
    }

    const peopleRepository = await getCustomRepository(PeopleRepository);
    const people = await peopleRepository.findById(peopleId);

    if (!people) {
      throw new ApplicationErrors('Pessoa não encontrada', 404);
    }

    const teachingTypeRepository = getCustomRepository(TeachingTypeRepository);
    const teachingType = await teachingTypeRepository.findById(teachingTypeId);

    if (!teachingType) {
      throw new ApplicationErrors('Ensino não encontrado', 404);
    }

    const teacherWeeklyPerformanceRepository = await getCustomRepository(
      TeacherWeeklyPerformanceRepository
    );
    const weeklyPerformance =
      await teacherWeeklyPerformanceRepository.createTeacherWeeklyPerformance(
        {}
      );

    const teacher = this.create({
      ...teacherParams,
      people,
      teachingType,
      weeklyPerformance,
    });

    return await await this.save(teacher);
  }

  async findAll(): Promise<Teacher[]> {
    return await this.find({
      relations: ['teachingType'],
    });
  }

  async findById(id: string): Promise<Teacher | undefined> {
    const teacher = await this.findOne(
      { id },
      { relations: ['teachingType', 'people'] }
    );

    if (teacher) {
      const teachingTypeRepository = await getCustomRepository(
        TeachingTypeRepository
      );
      const teachingType = await teachingTypeRepository.findById(
        teacher.teachingType.id
      );

      return this.create({ ...teacher, teachingType });
    }
    return teacher;
  }

  async findByPeopleId(peopleId: string): Promise<Teacher | undefined> {
    const peopleRepository = await getCustomRepository(PeopleRepository);
    const people = await peopleRepository.findById(peopleId);

    const teacher = await this.findOne(
      { people },
      {
        relations: ['teachingType'],
      }
    );

    return teacher;
  }

  async updateById(updateFields: ITeacherRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    let teacher = { ...fields };

    if (fields.teachingTypeId) {
      const teachingTypeRepository = getCustomRepository(
        TeachingTypeRepository
      );
      const teachingType = await teachingTypeRepository.findById(
        fields.teachingTypeId
      );

      delete fields.teachingTypeId;

      if (teachingType) teacher = this.create({ ...fields, teachingType });
    }

    await this.update({ id }, teacher);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    const teacherFound = await this.findById(id);

    if (!teacherFound) {
      throw new ApplicationErrors('Professor não encontrado', 404);
    }
    
    return await this.delete({ id });
  }

  async getProfilePicture(imageId: string): Promise<Image> {
    const imageRepository = await getCustomRepository(ImageRepository);
    const image = await imageRepository.findById(imageId);

    return image;
  }
}
