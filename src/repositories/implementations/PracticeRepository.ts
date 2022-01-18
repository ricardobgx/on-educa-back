import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IPracticeRequest } from '../../dto/IPracticeRequest';
import { Practice } from '../../entities/Practice';
import { PracticeQuestion } from '../../entities/PracticeQuestion';
import { ApplicationErrors } from '../../errors';
import { IPracticeRepository } from '../interfaces/IPracticeRepository';
import { ContentRepository } from './ContentRepository';
import { PracticeQuestionRepository } from './PracticeQuestionRepository';
import { StudentRepository } from './StudentRepository';

@EntityRepository(Practice)
export class PracticeRepository
  extends Repository<Practice>
  implements IPracticeRepository
{
  async createPractice(practiceParams: IPracticeRequest): Promise<Practice> {
    // Desestruturando as variaveis a serem usadas na funcao
    const { studentId, contentId } = practiceParams;

    // Verifica se os campos para fazer a pratica foram fornecidos
    if (!studentId) {
      throw new ApplicationErrors('Estudante não informado', 400);
    }
    if (!contentId) {
      throw new ApplicationErrors('Conteudo não informado', 400);
    }

    // Exclui os campos que nao devem ser salvos na base de dados de forma direta
    delete practiceParams.studentId;
    delete practiceParams.contentId;

    // Armazena os campos que devem ser salvos em uma no variavel
    let practice = { ...practiceParams };

    // Procura o estudante pelo id fornecido
    const studentRepository = getCustomRepository(StudentRepository);
    const student = await studentRepository.findById(studentId || '');

    // Se o estudante nao for encontrado retorna uma mensagem de erro
    if (!student) {
      throw new ApplicationErrors('Estudante não encontrado', 404);
    }

    // Armazena o estudante encontrado na pratica
    practice = this.create({ ...practice, student });

    // Busca o conteudo da pratica
    const contentRepository = await getCustomRepository(ContentRepository);
    const content = await contentRepository.findById(contentId);

    // Se o conteudo nao for encontrado retorna uma mensagem de erro
    if (!content) {
      throw new ApplicationErrors('Conteúdo não encontrado', 404);
    }

    // Armazena o conteudo encontrado na pratica
    practice = this.create({ ...practice, content });

    // Salva a pratica na base de dados e retorna
    return await this.save({ ...practice });
  }

  async findAll(): Promise<Practice[]> {
    return await this.find({
      relations: ['student', 'content', 'questions'],
    });
  }

  async findById(id: string): Promise<Practice | undefined> {
    const practice = await this.findOne(
      { id },
      { relations: ['student', 'content', 'questions'] }
    );

    if (practice) {
      const { questions: questionsFound } = practice;

      if (questionsFound) {
        const practiceQuestionRepository = await getCustomRepository(
          PracticeQuestionRepository
        );

        const questions: PracticeQuestion[] = [];

        await Promise.all(
          questionsFound.map(async (questionFound) => {
            const question = await practiceQuestionRepository.findById(
              questionFound.id
            );
            questions.push(question);
          })
        );

        return { ...practice, questions };
      }
    }

    return practice;
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}
