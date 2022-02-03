import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IUnityRequest } from '../../dto/IUnityRequest';
import { Unity } from '../../entities/Unity';
import { IUnityRepository } from '../interfaces/IUnityRepository';
import { ContentRepository } from './ContentRepository';
import { SubjectRepository } from './SubjectRepository';

@EntityRepository(Unity)
export class UnityRepository
  extends Repository<Unity>
  implements IUnityRepository
{
  async createUnity(unityParams: IUnityRequest): Promise<Unity> {
    const { name, subjectId } = unityParams;

    const subjectRepository = getCustomRepository(SubjectRepository);
    const subject = await subjectRepository.findById(subjectId);

    const unity = this.create({ name, subject });

    return await this.save(unity);
  }

  async findAll(): Promise<Unity[]> {
    return await this.find({
      relations: ['contents', 'subject'],
    });
  }

  async findBySubject(subjectId: string): Promise<Unity[]> {
    const subjectRepository = getCustomRepository(SubjectRepository);
    const subject = await subjectRepository.findById(subjectId);

    return await this.find({
      where: { subject },
      relations: ['contents', 'subject'],
    });
  }

  async findById(id: string): Promise<Unity> {
    return await this.findOne(
      { id },
      {
        relations: ['contents', 'subject'],
      }
    );
  }

  async updateById(updateFields: IUnityRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async removeContents(id: string): Promise<void> {
    const unity = await this.findById(id);
    const contentRepository = getCustomRepository(ContentRepository);

    Promise.all(
      unity.contents.map(async (content) => {
        await contentRepository.deleteById(content.id);
      })
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.removeContents(id).then(async () => {
      await this.delete({ id });
    });
  }
}
