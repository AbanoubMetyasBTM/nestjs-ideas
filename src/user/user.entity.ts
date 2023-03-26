import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { UserRO } from "./user.dto";
import { IdeaEntity } from "../idea/idea.entity";

@Entity("user")
export class UserEntity {

  @PrimaryGeneratedColumn("uuid") id: string;
  @CreateDateColumn() created: Date;
  @Column({
    type: "text",
    unique: true
  }) username: string;
  @Column("text") password: string;

  @OneToMany(type => IdeaEntity, idea => idea.author)
  ideas: IdeaEntity[];

  @ManyToMany(type => IdeaEntity, {cascade: true})
  @JoinTable()
  bookmarks: IdeaEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, created, username } = this;

    let responseObj: any = { id, created, username };
    if (showToken) {
      responseObj.token = this.token;
    }

    if (this.ideas){
      responseObj.ideas = this.ideas;
    }

    if (this.bookmarks){
      responseObj.bookmarks = this.bookmarks;
    }

    return responseObj;
  }

  async comparePassword(attempt) {
    return await bcrypt.compare(attempt, this.password);
  }

  protected get token(): string {
    const { id, username } = this;

    return jwt.sign(
      { id, username },
      process.env.JWT_SECRET,
      { expiresIn: "7days" }
    );

  }


}