import { Request, Response } from 'express';
import { UnityRepository } from '../../repositories/implementations/UnityRepository';
import { DeleteUnityService } from '../../services/unity/DeleteUnityService';

class DeleteUnityController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteUnityService = new DeleteUnityService(new UnityRepository());

    await deleteUnityService.execute(id);

    return res.status(200).json({ message: 'Unidade removida' });
  }
}

export default new DeleteUnityController();
