import { Request, Response } from 'express';
import { IStudentWeekPerformanceRequest } from '../../dto/IStudentWeekPerformanceRequest';
import { StudentWeekPerformanceRepository } from '../../repositories/implementations/StudentWeekPerformanceRepository';
import { UpdateStudentWeekPerformanceService } from '../../services/studentWeekPerformance/UpdateStudentWeekPerformanceService';

class UpdateStudentWeekPerformanceController {
  async handle(req: Request, res: Response) {
    const { studentId } = req.body as IStudentWeekPerformanceRequest;

    const { id } = req.params;

    const updateStudentWeekPerformanceService =
      new UpdateStudentWeekPerformanceService(
        new StudentWeekPerformanceRepository()
      );

    await updateStudentWeekPerformanceService.execute({ id, studentId });

    return res.status(200).json({ message: 'Entidade atualizada!' });
  }
}

export default new UpdateStudentWeekPerformanceController();
