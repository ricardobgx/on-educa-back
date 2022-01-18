import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { IPracticeQuestionAnswerRequest } from '../../dto/IPracticeQuestionAnswerRequest';
import { PracticeQuestionAnswer } from '../../entities/PracticeQuestionAnswer';
import { ApplicationErrors } from '../../errors';
import { IPracticeQuestionAnswerRepository } from '../interfaces/IPracticeQuestionAnswerRepository';
import { AlternativeRepository } from './AlternativeRepository';
import { PracticeQuestionRepository } from './PracticeQuestionRepository';

@EntityRepository(PracticeQuestionAnswer)
export class PracticeQuestionAnswerRepository
  extends Repository<PracticeQuestionAnswer>
  implements IPracticeQuestionAnswerRepository
{
  async createPracticeQuestionAnswer(
    practiceQuestionAnswerParams: IPracticeQuestionAnswerRequest
  ): Promise<PracticeQuestionAnswer> {
    // Desestruturando campos necessarios para a criacao
    const { questionId, selectedAlternativeId } = practiceQuestionAnswerParams;

    // Verifica se os campos necessarios para criar a resposta foram fornecidos
    if (!questionId) {
      throw new ApplicationErrors('Questao não informada', 400);
    }
    if (!selectedAlternativeId) {
      throw new ApplicationErrors('Alternativa não informada', 400);
    }

    // Excluindo campos desnecessarios para a criacao
    delete practiceQuestionAnswerParams.questionId;
    delete practiceQuestionAnswerParams.selectedAlternativeId;

    // Variavel para armazenar os dados da resposta da questao
    let practiceQuestionAnswer = { ...practiceQuestionAnswerParams };

    // Procura a questao da pratica informada
    const practiceQuestionRepository = await getCustomRepository(
      PracticeQuestionRepository
    );
    const question = await practiceQuestionRepository.findById(questionId);

    // Verifica se a questao nao foi encontrada, caso nao informa um erro
    if (!question) {
      throw new ApplicationErrors('Questao da pratica nao encontrada', 404);
    }

    // Adiciona a questao encontrada a variavel que armazena os dados da resposta
    practiceQuestionAnswer = this.create({
      ...practiceQuestionAnswer,
      question,
    });

    // Procura a alternativa selecionada informada
    const alternativeRepository = await getCustomRepository(
      AlternativeRepository
    );
    const selectedAlternative = await alternativeRepository.findById(
      selectedAlternativeId
    );

    // Verifica se a alternativa nao foi encontrada, caso nao informa um erro
    if (!selectedAlternative) {
      throw new ApplicationErrors(
        'Alternativa selecionada nao encontrada',
        404
      );
    }

    // Adiciona a alternativa selecionada a variavel que armazena os dados da resposta
    practiceQuestionAnswer = this.create({
      ...practiceQuestionAnswer,
      selectedAlternative,
    });

    // Salva a pratica na base de dados e retorna
    return await this.save({ ...practiceQuestionAnswer });
  }

  async findAll(): Promise<PracticeQuestionAnswer[]> {
    return await this.find({
      relations: ['question', 'selectedAlternative'],
    });
  }

  async findById(id: string): Promise<PracticeQuestionAnswer | undefined> {
    const PracticeQuestionAnswer = await this.findOne(
      { id },
      { relations: ['question', 'selectedAlternative'] }
    );

    return PracticeQuestionAnswer;
  }

  async updateById(
    updateFields: IPracticeQuestionAnswerRequest
  ): Promise<void> {
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
