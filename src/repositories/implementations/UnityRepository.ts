import { DeleteResult, EntityRepository, getCustomRepository, Repository } from "typeorm";
import { IUnityRequest } from "../../dto/IUnityRequest";
import { Unity } from "../../entities/Unity";
import { IUnityRepository } from "../interfaces/IUnityRepository";
import { SubjectRepository } from "./SubjectRepository";

@EntityRepository(Unity)
export class UnityRepository extends Repository<Unity> implements IUnityRepository {
  async createUnity(unityParams: IUnityRequest): Promise<Unity> {
    const { title, subjectId } = unityParams;

    const subjectRepository = getCustomRepository(SubjectRepository);
    const subject = await subjectRepository.findById(subjectId);
    
    const newUnityParams = this.create({ title, subject });

    const unity = await this.save(newUnityParams);
    
    return unity;
  }
  
  async findAll(): Promise<Unity[]> {
    return await this.find({
      relations: ['contents', 'subject']
    });
  }

  async findBySubject(subjectId: string): Promise<Unity[]> {
    const subjectRepository = getCustomRepository(SubjectRepository);
    const subject = await subjectRepository.findById(subjectId);

    return await this.find({ where: { subject }, relations: ['contents', 'subject'] });
  }
  
  async findById(id: string): Promise<Unity> {
    return await this.findOne({ id }, {
      relations: ['contents', 'subject']
    });
  }
  
  async updateById(updateFields: IUnityRequest): Promise<void> {
    const { id } = updateFields;
    const fields = {...updateFields};
    const unity  = this.findOne({ id });

    Object.keys(fields).map(
      key => fields[key] === undefined && delete fields[key]
    );

    await this.update({ id }, fields);
  }
  
  async deleteById(id: string): Promise<DeleteResult> {
    return await this.delete({ id });
  }
}