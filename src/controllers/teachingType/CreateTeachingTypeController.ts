import { Request, Response } from 'express';
import { ITeachingTypeRequest } from '../../dto/ITeachingTypeRequest';
import { TeachingTypeRepository } from '../../repositories/implementations/TeachingTypeRepository';
import { CreateTeachingTypeService } from '../../services/teachingType/CreateTeachingTypeService';

class CreateTeachingTypeController {
  async handle(req: Request, res: Response) {
    const { name } = req.body as ITeachingTypeRequest;

    const createTeachingTypeService = new CreateTeachingTypeService(
      new TeachingTypeRepository()
    );

    const teachingType = await createTeachingTypeService.execute({ name });

    return res.status(201).json(teachingType);
  }
}

export default new CreateTeachingTypeController();
