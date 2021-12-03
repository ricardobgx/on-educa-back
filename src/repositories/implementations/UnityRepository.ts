import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { IUnityRequest } from "../../dto/IUnityRequest";
import { Unity } from "../../entities/Unity";
import { IUnityRepository } from "../interfaces/IUnityRepository";

@EntityRepository(Unity)
export class UnityRepository extends Repository<Unity> implements IUnityRepository {
  async createUnity(unityParams: IUnityRequest): Promise<Unity> {
    const unity = await this.save(unityParams);
    
    return unity;
  }
  
  async findAll(): Promise<Unity[]> {
    return await this.find({
      relations: ['contents', 'subject']
    });
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