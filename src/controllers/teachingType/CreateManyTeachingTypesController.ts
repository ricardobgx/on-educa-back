import { Request, Response } from 'express';
import { ICreateManyTeachingTypesRequest } from '../../dto/teachingType/ICreateManyTeachingTypesRequest';
import { TeachingTypeRepository } from '../../repositories/implementations/TeachingTypeRepository';
import { CreateManyTeachingTypesService } from '../../services/teachingType/CreateManyTeachingTypesService';

class CreateManyTeachingTypesController {
  async handle(req: Request, res: Response) {
    const { teachingTypesParams } = req.body as ICreateManyTeachingTypesRequest;

    const createManyTeachingTypesService = new CreateManyTeachingTypesService(
      new TeachingTypeRepository()
    );

    const teachingType = await createManyTeachingTypesService.execute({
      teachingTypesParams,
    });

    return res.status(201).json(teachingType);
  }
}

export default new CreateManyTeachingTypesController();
