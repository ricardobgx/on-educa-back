import { Request, Response } from 'express';
import { IUpdateTeacherWeeklyPerformanceRequest } from '../../dto/teacherWeeklyPerformance/IUpdateTeacherWeeklyPerformanceRequest';
import { TeacherWeeklyPerformanceRepository } from '../../repositories/implementations/TeacherWeeklyPerformanceRepository';
import { UpdateTeacherWeeklyPerformanceValuesService } from '../../services/teacherWeeklyPerformance/UpdateTeacherWeeklyPerformanceValuesService';

class UpdateTeacherWeeklyPerformanceValuesController {
  async handle(req: Request, res: Response) {
    const { id: teacherId } = req.params;

    const {
      dailyXPNumber,
      contentsCreatedNumber,
      questionsCreatedNumber,
      doubtsSolvedNumber,
      interativeRoomsCreatedNumber,
    } = req.body as IUpdateTeacherWeeklyPerformanceRequest;

    const updateTeacherWeeklyPerformanceValuesService =
      new UpdateTeacherWeeklyPerformanceValuesService(
        new TeacherWeeklyPerformanceRepository()
      );

    await updateTeacherWeeklyPerformanceValuesService.execute({
      teacherId,
      dailyXPNumber,
      contentsCreatedNumber,
      questionsCreatedNumber,
      doubtsSolvedNumber,
      interativeRoomsCreatedNumber,
    });

    return res.status(200).json({ message: 'Entidade atualizada!' });
  }
}

export default new UpdateTeacherWeeklyPerformanceValuesController();
