import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/user.entity";
import { IdeaEntity } from "../idea/idea.entity";
import { CommentEntity } from "./comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, IdeaEntity, CommentEntity])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
