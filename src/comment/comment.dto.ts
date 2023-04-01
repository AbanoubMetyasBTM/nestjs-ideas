import { IsNotEmpty, IsString } from "class-validator";
import { IdeaEntity } from "../idea/idea.entity";
import { IdeaRO } from "../idea/idea.dto";
import { UserRO } from "../user/user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CommentDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  comment: string;

}

export class CommentRO {

  id: string;
  comment: string;
  created: Date;

  author:UserRO;
  idea:IdeaRO;

}

