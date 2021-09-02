import Alternative from "../../Entity";
import { IAlternative } from "../types";

export default interface IAlternativeRepository {
  create(alternativeParams: IAlternative): Promise<Alternative>;
  findAll(): Promise<Alternative[]>;
  findById(id: string): Promise<Alternative>;
  findByQuestion(questionId: string): Promise<Alternative[]>;
}