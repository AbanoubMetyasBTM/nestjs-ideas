import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { UserEntity } from "../user/user.entity";
import { IdeaEntity } from "../idea/idea.entity";
import { CommentRO } from "./comment.dto";

@Entity("comment")
export class CommentEntity {

  @PrimaryGeneratedColumn("uuid") id: string;
  @CreateDateColumn() created: Date;
  @Column("text") comment: string;

  @ManyToOne(type => UserEntity)
  @JoinTable()
  author: UserEntity;

  @ManyToOne(type => IdeaEntity, idea => idea.comments)
  @JoinTable()
  idea: IdeaEntity;

  toResponseObject(): CommentRO {

    const returnObj:any = {
      ...this,
      author: this.author.toResponseObject(false)
    };

    return returnObj;

  }


}