import { Request, Response } from "express";
import { ISubjectRequest } from "../../dto/ISubjectRequest";
import { SubjectRepository } from "../../repositories/implementations/SubjectRepository";
import { UpdateSubjectService } from "../../services/subject/UpdateSubjectService";

class UpdateSubjectController {
  async handle(req: Request, res: Response) {
    const { name } = req.body as ISubjectRequest;

    const { id } = req.params;

    const updateSubjectService = new UpdateSubjectService(new SubjectRepository());

    await updateSubjectService.execute({ id, name });

    return res.status(200).json({ message: "Disciplina atualizada!" });
  }

}

export default new UpdateSubjectController();