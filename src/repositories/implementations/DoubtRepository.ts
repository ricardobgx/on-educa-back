import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IDoubtRequest } from '../../dto/doubt/IDoubtRequest';
import { Doubt } from '../../entities/Doubt';
import { ApplicationErrors } from '../../errors';
import { DoubtStatus } from '../../types/DoubtStatus';
import { IDoubtRepository } from '../interfaces/IDoubtRepository';
import { ContentRepository } from './ContentRepository';
import { StudentRepository } from './StudentRepository';

@EntityRepository(Doubt)
export class DoubtRepository
  extends Repository<Doubt>
  implements IDoubtRepository
{
  async createDoubt(doubtParams: IDoubtRequest): Promise<Doubt> {
    const { description, contentId, studentId } = doubtParams;

    if (!(contentId && studentId)) {
      throw new ApplicationErrors('Dados nao informados', 400);
    }

    const contentRepository = await getCustomRepository(ContentRepository);
    const content = await contentRepository.findById(contentId);

    if (!content) {
      throw new ApplicationErrors('Conteúdo não encontrado', 400);
    }

    const studentRepository = await getCustomRepository(StudentRepository);
    const student = await studentRepository.findById(studentId);

    if (!student) {
      throw new ApplicationErrors('Aluno não encontrado', 400);
    }

    const doubt = this.create({
      description,
      content,
      student,
      status: DoubtStatus.PENDING,
      createdAt: new Date(),
    });

    // Salva a duvida na base de dados e retorna
    return await this.save(doubt);
  }

  async findAll(): Promise<Doubt[]> {
    return await this.find({
      relations: [],
    });
  }

  async findById(id: string): Promise<Doubt | undefined> {
    const doubtFound = await this.findOne(
      { id },
      { relations: ['content', 'student'] }
    );

    if (doubtFound) {
      const { content: contentFound, student: studentFound } = doubtFound;

      const contentRepository = await getCustomRepository(ContentRepository);
      const content = await contentRepository.findById(contentFound.id);

      const studentRepository = await getCustomRepository(StudentRepository);
      const student = await studentRepository.findById(studentFound.id);

      const doubt = this.create({ ...doubtFound, content, student });

      return doubt;
    }

    return doubtFound;
  }

  async findByContent(contentId: string): Promise<Doubt[]> {
    const contentRepository = await getCustomRepository(ContentRepository);
    const content = await contentRepository.findById(contentId);

    if (!content) {
      throw new ApplicationErrors('Conteúdo não encontrado', 400);
    }

    const doubtsFound = await this.find({
      where: {
        content,
      },
      relations: ['content', 'student'],
    });

    const doubts: Doubt[] = [];

    await Promise.all(
      doubtsFound.map(async (doubtFound) => {
        const doubt = await this.findById(doubtFound.id);

        doubts.push(doubt);
      })
    );

    return doubts;
  }

  async updateById(updateFields: IDoubtRequest): Promise<void> {
    const { id } = updateFields;
    const fields = { ...updateFields };

    Object.keys(fields).map(
      (key: string) => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
