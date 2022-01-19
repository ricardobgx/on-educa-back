import { DuelTeam } from '../entities/DuelTeam';
import { Question } from '../entities/Question';
import { randInt } from './utils';

export const sortDuelTeams = (teams: DuelTeam[]): DuelTeam[] => {
  return teams.sort((teamA: DuelTeam, teamB: DuelTeam) => {
    return teamA.index > teamB.index ? 1 : -1;
  });
};

/***************************************************************************
 * @author Jose Ricardo Brasileiro Goncalves
 * @modified 08/01/2022
 * @param defaultQuestions Esse parametro recebe as questoes que devem ser
 * sorteadas
 * @param questionsNumber Esse parametro recebe o numero maximo de questoes
 * que devem ser sorteadas
 * @description Essa funcao retorna um array de questoes que eh sorteado com
 * base no vetor informado nos parametros questoes
 ************************************************************************* */
export const randomQuestionsIds = (
  defaultQuestions: Question[],
  questionsNumber: number
): string[] => {
  // Variavel que armazena o indice da questao sorteada
  let questionIndex = -1;

  // Vetor que armazena os ids das questoes sorteadas
  const questionsIds: string[] = [];

  /************************************************************************
   * Itera ate o numero de questoes que devem ser sorteadas ou, ate as ques-
   * toes se acabarem caso o tamanho do vetor seja menor que o numero de
   * questoes que devem ser sortedas
   ********************************************************************** */
  for (let i = 0; i < questionsNumber && i < defaultQuestions.length; i++) {
    // Sorteia um numero
    questionIndex = randInt(0, defaultQuestions.length - 1);

    // Procura a questao sorteada no array de questoes sortedas
    const foundQuestion = questionsIds.find(
      (questionId) => questionId === defaultQuestions[questionIndex].id
    );

    // Se a questao sorteada ja existir no vetor de questoes sortedas, a iteracao eh refeita
    if (foundQuestion) {
      // Decrementa a variavel de controle
      i--;

      // Ignora o codigo abaixo do if
      continue;
    }

    // Adiciona o id da questao sorteada no vetor dos ids das questoes sorteadas
    questionsIds.push(defaultQuestions[questionIndex].id);
  }

  // Retorna os ids das questoes sorteadas
  return questionsIds;
};
