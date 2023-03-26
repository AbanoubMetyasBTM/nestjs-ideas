import { IsString } from "class-validator";
import { UserRO } from "../user/user.dto";
import { UserEntity } from "../user/user.entity";

export class IdeaDto {
  @IsString()
  idea: string;

  @IsString()
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