interface IAnsweredQuestion {
  questionId: string;
  selectedAlternativeId: string;
}

export interface ICorrectPracticeQuestionsRequest {
  studentId: string;
  answeredQuestions: IAnsweredQuestion[];
}
