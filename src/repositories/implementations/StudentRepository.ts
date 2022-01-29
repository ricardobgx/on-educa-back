import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IStudentRequest } from '../../dto/IStudentRequest';
import { Image } from '../../entities/Image';
import { Student } from '../../entities/Student';
import { IStudentRepository } from '../interfaces/IStudentRepository';
import { ImageRepository } from './ImageRepository';
import { SchoolGradeRepository } from './SchoolGradeRepository';
import { StudentWeekPerformanceRepository } from './StudentWeekPerformanceRepository';

@EntityRepository(Student)
export class StudentRepository
  extends Repository<Student>
  implements IStudentRepository
{
  async createStudent(studentParams: IStudentRequest): Promise<Student> {
    const { schoolGradeId, profilePictureId } = studentParams;

    delete studentParams.schoolGradeId;
    delete studentParams.profilePictureId;

    let student = { ...studentParams };

    if (schoolGradeId) {
      const schoolGradeRepository = getCustomRepository(SchoolGradeRepository);
      const schoolGrade = await schoolGradeRepository.findById(schoolGradeId);
      student = this.create({ ...studentParams, schoolGrade });
    }

    if (profilePictureId) {
      const imageRepository = await getCustomRepository(ImageRepository);
      const profilePicture = await imageRepository.findById(profilePictureId);
      student = this.create({ ...student, profilePicture });
    }

    const studentWeekPerformanceRepository = await getCustomRepository(
      StudentWeekPerformanceRepository
    );
    const weekPerformance =
      await studentWeekPerformanceRepository.createStudentWeekPerformance({});

    student = this.create({ ...student, weekPerformance });

    return await this.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.find({
      relations: ['schoolGrade', 'profilePicture'],
    });
  }

  async findById(id: string): Promise<Student | undefined> {
    const student = await this.findOne(
      { id },
      { relations: ['schoolGrade', 'profilePicture'] }
    );

    const schoolGradeRepository = await getCustomRepository(
      SchoolGradeRepository
    );
    const schoolGrade = await schoolGradeRepository.findById(
      student.schoolGrade.id
    );

    const profilePicture = await this.getProfilePicture(
      student.profilePicture.id
    );

    return this.create({ ...student, profilePicture, schoolGrade });
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
      (key) => !!fields[key] === undefined && delete fields[key]
    );

    await this.update({ email }, fields);
  }

  async updateById(updateFields: IStudentRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    delete fields.id;

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    let student = { ...fields };

    if (fields.schoolGradeId) {
      const schoolGradeRepository = getCustomRepository(SchoolGradeRepository);
      const schoolGrade = await schoolGradeRepository.findById(
        fields.schoolGradeId
      );

      if (schoolGrade) student = this.create({ ...fields, schoolGrade });
    }

    if (fields.profilePictureId) {
      const imageRepository = await getCustomRepository(ImageRepository);
      const profilePicture = await imageRepository.findById(
        fields.profilePictureId
      );

      if (profilePicture) {
        const oldStudent = await this.findById(id);
        const { profilePicture: oldProfilePicture } = oldStudent;

        if (
          oldProfilePicture &&
          oldProfilePicture.id !== process.env.DEFAULT_PROFILE_PICTURE
        ) {
          console.log('apagou foto');
          await this.update({ id }, { profilePicture: null });
          await imageRepository.deleteById(oldProfilePicture.id);
        }
        student = this.create({ ...student, profilePicture });
      }
    }

    await this.update({ id }, student);
  }

  async deleteByEmail(email: string): Promise<DeleteResult> {
    return await this.delete({ email });
  }

  async getProfilePicture(imageId: string): Promise<Image> {
    const imageRepository = await getCustomRepository(ImageRepository);
    const image = await imageRepository.findById(imageId);

    return image;
  }
}
