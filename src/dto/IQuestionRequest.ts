import { IAlternativeRequest } from './IAlternativeRequest';

export interface IQuestionRequest {
  id?: string;
  description?: string;
  difficulty?: number;
  contentId?: string;
  alternativesDescription?: IAlternativeRequest[];
}
