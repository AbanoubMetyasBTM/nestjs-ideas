import { IsNotEmpty, IsString } from "class-validator";
import { IdeaEntity } from "../idea/idea.entity";
import { IdeaRO } from "../idea/idea.dto";

export class UserDto {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
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

