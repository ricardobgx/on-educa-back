import { getCustomRepository, ObjectType } from "typeorm";
import { Content } from "../../entities/Content";
import { IContentRepository } from "../../repositories/interfaces/IContentRepository";

export class ListContentByUnityService {
  contentRepository: IContentRepository;

  constructor(contentRepository: IContentRepository) {
    this.contentRepository = contentRepository;
  }

  async execute(unityId): Promise<Content[]> {
    const contentRepository = getCustomRepository(this.contentRepository as unknown as ObjectType<IContentRepository>);

    const contents = contentRepository.findByUnity(unityId);

    return contents;
  }
}