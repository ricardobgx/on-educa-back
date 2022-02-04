import { Request, Response } from 'express';
import { StudentRepository } from '../../repositories/implementations/StudentRepository';
import { ShowStudentByPeopleService } from '../../services/student/ShowStudentByPeopleService';

class ShowStudentByPeopleController {
  async handle(req: Request, res: Response) {
    const { peopleId } = req.params;

    const showStudentByPeopleService = new ShowStudentByPeopleService(
      new StudentRepository()
    );

    const student = await showStudentByPeopleService.execute(peopleId);

    return res.status(200).json(student);
  }
}

export default new ShowStudentByPeopleController();
