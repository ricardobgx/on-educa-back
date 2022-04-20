import { Request, Response } from 'express';
import { IUpdateStudentWeeklyPerformanceRequest } from '../../dto/studentWeeklyPerformance/IUpdateStudentWeeklyPerformanceRequest';
import { StudentWeeklyPerformanceRepository } from '../../repositories/implementations/StudentWeeklyPerformanceRepository';
import { UpdateStudentWeeklyPerformanceValuesService } from '../../services/studentWeeklyPerformance/UpdateStudentWeeklyPerformanceValuesService';

class UpdateStudentWeeklyPerformanceValuesController {
  async handle(req: Request, res: Response) {
    const {
      studentId,
      dailyXPNumber,
      studiedContentsNumber,
      questionsAnsweredNumber,
      rightQuestionsAnsweredNumber,
      duelsParticipatedNumber,
      duelsWonNumber,
    } = req.body as IUpdateStudentWeeklyPerformanceRequest;

    const updateStudentWeeklyPerformanceValuesService =
      new UpdateStudentWeeklyPerformanceValuesService(
        new StudentWeeklyPerformanceRepository()
      );

    await updateStudentWeeklyPerformanceValuesService.execute({
      studentId,
      dailyXPNumber,
      studiedContentsNumber,
      questionsAnsweredNumber,
      rightQuestionsAnsweredNumber,
      duelsParticipatedNumber,
      duelsWonNumber,
    });

    return res.status(200).json({ message: 'Entidade atualizada!' });
  }
}

export default new UpdateStudentWeeklyPerformanceValuesController();
