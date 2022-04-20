import { Request, Response } from 'express';
import { TeacherRepository } from '../../repositories/implementations/TeacherRepository';
import { ShowTeacherByPeopleService } from '../../services/teacher/ShowTeacherByPeopleService';

class ShowTeacherByPeopleController {
  async handle(req: Request, res: Response) {
    const { peopleId } = req.params;

    const showTeacherService = new ShowTeacherByPeopleService(
      new TeacherRepository()
    );

    const teacher = await showTeacherService.execute(peopleId);

    return res.status(200).json(teacher);
  }
}

export default new ShowTeacherByPeopleController();
