import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "./comment.entity";
import { Repository } from "typeorm";
import { UserEntity } from "../user/user.entity";
import { IdeaEntity } from "../idea/idea.entity";
import { CommentDto, CommentRO } from "./comment.dto";

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
  }

  async showIdeaComments(ideaId: string, page: number = 1): Promise<CommentRO[]> {

    const comments = await this.commentRepository.find({
      where: { idea: { id: ideaId } },
      relations: ["idea", "author"],
      take: 25,
      skip: (page - 1) * 25
    });

    return comments.map(comment => comment.toResponseObject());

  }

  async createComment(ideaId: string, userId: string, data: CommentDto): Promise<CommentRO> {

    const idea = await this.ideaRepository.findOne({ where: { id: ideaId } });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const comment = await this.commentRepository.create({
      ...data,
      idea,
      author: user
    });

    await this.commentRepository.save(comment);

    return comment.toResponseObject();

  }

  async showUserComments(userId: string, page: number = 1): Promise<CommentRO[]> {

    const comments = await this.commentRepository.find({
      where: { author: { id: userId } },
      relations: ["idea", "author"],
      take: 25,
      skip: (page - 1) * 25
    });

    return comments.map(comment => comment.toResponseObject());

  }

  async destroy(commentId: string, userId: string) {

    const comment = await this.commentRepository.findOne({
      where: {
        id: commentId,
        author: { id: userId }
      },
      relations: ["idea", "author"]
    });

    if (!comment) {
      throw new HttpException("can not remove this comment", HttpStatus.BAD_REQUEST);
    }

    this.commentRepository.remove(comment);

    return { deleted: true };

  }


}
