import { Request, Response } from "express";
import { SubjectRepository } from "../../repositories/implementations/SubjectRepository";
import { DeleteSubjectService } from "../../services/subject/DeleteSubjectService";

class DeleteSubjectController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteSubjectService = new DeleteSubjectService(new SubjectRepository());

    await deleteSubjectService.execute(id);

    return res.status(200).json({ message: "Disciplina removida!" });
  }
}

export default new DeleteSubjectController();