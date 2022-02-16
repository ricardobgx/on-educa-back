import { Request, Response } from 'express';
import { IStudentWeeklyPerformanceRequest } from '../../dto/studentWeeklyPerformance/IStudentWeeklyPerformanceRequest';
import { StudentWeeklyPerformanceRepository } from '../../repositories/implementations/StudentWeeklyPerformanceRepository';
import { UpdateStudentWeeklyPerformanceService } from '../../services/studentWeeklyPerformance/UpdateStudentWeeklyPerformanceService';

class UpdateStudentWeeklyPerformanceController {
  async handle(req: Request, res: Response) {
    const { studentId } = req.body as IStudentWeeklyPerformanceRequest;

    const { id } = req.params;

    const updateStudentWeeklyPerformanceService =
      new UpdateStudentWeeklyPerformanceService(
        new StudentWeeklyPerformanceRepository()
      );

    await updateStudentWeeklyPerformanceService.execute({ id, studentId });

    return res.status(200).json({ message: 'Entidade atualizada!' });
  }
}

export default new UpdateStudentWeeklyPerformanceController();
