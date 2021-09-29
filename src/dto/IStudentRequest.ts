import { ContentReview } from "../entities/ContentReview";
import { Doubt } from "../entities/Doubt";
import { Duel } from "../entities/Duel";
import { InterativeRoom } from "../entities/InterativeRoom";
import { StudStudChat } from "../entities/StudStudChat";
import { StudStudMessage } from "../entities/StudStudMessage";
import { StudTeachChat } from "../entities/StudTeachChat";
import { StudTeachMessage } from "../entities/StudTeachMessage";
import { IUserRequest } from "./IUserRequest";

export interface IStudentRequest extends IUserRequest {
  schoolGrade: number;
}