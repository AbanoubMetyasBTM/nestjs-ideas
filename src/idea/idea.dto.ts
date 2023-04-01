import { IsString } from "class-validator";
import { UserRO } from "../user/user.dto";
import { UserEntity } from "../user/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class IdeaDto {
  @IsString()
  @ApiProperty()
  idea: string;

  @IsString()
  @ApiProperty()
  description: string;
}

export class IdeaRO {
  id?: string;
  created: Date;
  updated: Date;
  idea: string;
  description: string;
  author: UserRO;
  upvotes?: number;
  downvotes?: number;
}