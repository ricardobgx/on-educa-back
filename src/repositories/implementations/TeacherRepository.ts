import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { ITeacherRequest } from '../../dto/ITeacherRequest';
import { Image } from '../../entities/Image';
import { Teacher } from '../../entities/Teacher';
import { ITeacherRepository } from '../interfaces/ITeacherRepository';
import { ImageRepository } from './ImageRepository';
import { TeachingTypeRepository } from './TeachingTypeRepository';

@EntityRepository(Teacher)
export class TeacherRepository
  extends Repository<Teacher>
  implements ITeacherRepository
{
  async createTeacher(teacherParams: ITeacherRequest): Promise<Teacher> {
    const { teachingTypeId, profilePictureId } = teacherParams;

    const teachingTypeRepository = getCustomRepository(TeachingTypeRepository);
    const teachingType = await teachingTypeRepository.findById(teachingTypeId);

    delete teacherParams.teachingTypeId;
    delete teacherParams.profilePictureId;

    let teacher = this.create({ ...teacherParams, teachingType });

    if (profilePictureId) {
      const imageRepository = await getCustomRepository(ImageRepository);
      const profilePicture = await imageRepository.findById(profilePictureId);
      teacher = this.create({ ...teacher, profilePicture });
    }

    return await await this.save(teacher);
  }

  async findAll(): Promise<Teacher[]> {
    return await this.find({
      relations: ['teachingType', 'profilePicture'],
    });
  }

  async findById(id: string): Promise<Teacher | undefined> {
    const teacherFound = await this.findOne(
      { id },
      {
        relations: ['teachingType', 'profilePicture'],
      }
    );

    const profilePicture = await this.getProfilePicture(
      teacherFound.profilePicture.id
    );

    return this.create({ ...teacherFound, profilePicture });
  }

  async findByEmail(email: string): Promise<Teacher | undefined> {
    return await this.findOne(
      { email },
      {
        relations: ['teachingType', 'profilePicture'],
      }
    );
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
    return await this.delete({ id });
  }

  async getProfilePicture(imageId: string): Promise<Image> {
    const imageRepository = await getCustomRepository(ImageRepository);
    const image = await imageRepository.findById(imageId);

    return image;
  }
}
