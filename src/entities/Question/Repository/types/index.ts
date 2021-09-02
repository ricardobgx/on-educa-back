import Question from '../../../Question/Entity';

export interface IAlternative {
  index: number;
  description: string;
  question: Question;
}