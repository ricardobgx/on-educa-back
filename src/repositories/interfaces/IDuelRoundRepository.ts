import { DeleteResult } from "typeorm";
import { IDuelRoundRequest } from "../../dto/IDuelRoundRequest";
import { DuelRound } from "../../entities/DuelRound";

export interface IDuelRoundRepository {
  createDuelRound(duelRoundParams: IDuelRoundRequest): Promise<DuelRound>;
  findAll(name?: string): Promise<DuelRound[]>;
  findById(id: string): Promise<DuelRound | undefined>;
  updateById(updateFields: IDuelRoundRequest): Promise<void>;
  deleteById(id: string): Promise<DeleteResult>;
}