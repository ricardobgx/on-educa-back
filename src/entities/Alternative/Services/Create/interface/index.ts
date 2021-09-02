import Alternative from "../../../Entity";

export default interface CreateAlternative {
  execute(): Promise<Alternative>;
}