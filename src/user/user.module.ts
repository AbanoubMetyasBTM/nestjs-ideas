import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { IdeaEntity } from "../idea/idea.entity";
import { CommentService } from "../comment/comment.service";
import { CommentEntity } from "../comment/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, IdeaEntity, CommentEntity])],
  controllers: [UserController],
  providers: [UserService, CommentService]
})
export class UserModule {}
