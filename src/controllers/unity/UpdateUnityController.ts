import { Request, Response } from 'express';
import { IUnityRequest } from '../../dto/IUnityRequest';
import { UnityRepository } from '../../repositories/implementations/UnityRepository';
import { UpdateUnityService } from '../../services/unity/UpdateUnityService';

class UpdateUnityController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, subjectId } = req.body as IUnityRequest;

    const updateUnityService = new UpdateUnityService(new UnityRepository());

    await updateUnityService.execute({ id, name, subjectId });

    return res.status(200).json({ message: 'Unidade atualizada' });
  }
}

export default new UpdateUnityController();
