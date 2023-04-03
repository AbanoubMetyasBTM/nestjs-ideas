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

  @ApiProperty()
  id?: string;

  @ApiProperty()
  created: Date;

  @ApiProperty()
  updated: Date;

  @ApiProperty()
  idea: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  author: UserRO;

  @ApiProperty()
  upvotes?: number;

  @ApiProperty()
  downvotes?: number;
}