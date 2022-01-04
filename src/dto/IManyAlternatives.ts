import { IAlternativeRequest } from './IAlternativeRequest';

export interface IManyAlternatives {
  alternativesDescriptions: IAlternativeRequest[];
  questionId: string;
}
