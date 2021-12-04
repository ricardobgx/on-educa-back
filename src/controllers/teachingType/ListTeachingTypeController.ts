import { Request, Response } from "express";
import { TeachingTypeRepository } from "../../repositories/implementations/TeachingTypeRepository";
import { ListTeachingTypeService } from "../../services/teachingType/ListTeachingTypeService";

class ListTeachingTypeController {
  async handle(req: Request, res: Response) {
    const listTeachingTypeService = new ListTeachingTypeService(new TeachingTypeRepository());

    const teachingTypes = await listTeachingTypeService.execute();

    return res.status(200).json(teachingTypes);
  }
}

export default new ListTeachingTypeController();