import { DeleteResult } from "typeorm";
import { IDuelRequest } from "../../dto/IDuelRequest";
import { Duel } from "../../entities/Duel";

export interface IDuelRepository {
  createDuel(duelParams: IDuelRequest): Promise<Duel>;
  findAll(name?: string): Promise<Duel[]>;
  findById(id: string): Promise<Duel | undefined>;
  updateById(updateFields: IDuelRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}