import { Request, Response } from 'express';
import { IUpdateStudentWeekPerformanceRequest } from '../../dto/IUpdateStudentWeekPerformanceRequest';
import { StudentWeekPerformanceRepository } from '../../repositories/implementations/StudentWeekPerformanceRepository';
import { UpdateStudentWeekPerformanceValuesService } from '../../services/studentWeekPerformance/UpdateStudentWeekPerformanceValuesService';

class UpdateStudentWeekPerformanceValuesController {
  async handle(req: Request, res: Response) {
    const {
      studentId,
      dailyXPNumber,
      studiedContentsNumber,
      questionsAnsweredNumber,
      rightQuestionsAnsweredNumber,
      duelsParticipatedNumber,
      duelsWonNumber,
    } = req.body as IUpdateStudentWeekPerformanceRequest;

    const updateStudentWeekPerformanceValuesService =
      new UpdateStudentWeekPerformanceValuesService(
        new StudentWeekPerformanceRepository()
      );

    await updateStudentWeekPerformanceValuesService.execute({
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

export default new UpdateStudentWeekPerformanceValuesController();
