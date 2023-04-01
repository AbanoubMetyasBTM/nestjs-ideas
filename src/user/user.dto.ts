import { IsNotEmpty, IsString } from "class-validator";
import { IdeaEntity } from "../idea/idea.entity";
import { IdeaRO } from "../idea/idea.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;

}

export class UserRO {
  id: string;
  username: string;
  created: Date;
  token?: string;
  ideas?: IdeaRO[]
  bookmarks?: IdeaRO[]

}

