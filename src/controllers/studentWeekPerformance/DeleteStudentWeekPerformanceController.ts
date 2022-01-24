import { Request, Response } from 'express';
import { StudentWeekPerformanceRepository } from '../../repositories/implementations/StudentWeekPerformanceRepository';
import { DeleteStudentWeekPerformanceService } from '../../services/studentWeekPerformance/DeleteStudentWeekPerformanceService';

class DeleteStudentWeekPerformanceController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteStudentWeekPerformanceService =
      new DeleteStudentWeekPerformanceService(
        new StudentWeekPerformanceRepository()
      );

    await deleteStudentWeekPerformanceService.execute(id);

    return res.status(200).json({ message: 'Entidade removida!' });
  }
}

export default new DeleteStudentWeekPerformanceController();
