import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";
import { UserDto, UserRO } from "./user.dto";
import { IdeaEntity } from "../idea/idea.entity";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
  }

  async showAll(page: number = 1): Promise<UserRO[]> {
    const users = await this.userRepository.find({
      relations: ["ideas", "bookmarks"],
      take: 25,
      skip: (page - 1) * 25
    });
    return users.map(user => user.toResponseObject(false));
  }

  async login(data: UserDto): Promise<UserRO> {

    const { username, password } = data;
    const user = await this.userRepository.findOne({
      where: { username }
    });

    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException("Invalid Username OR password", HttpStatus.BAD_REQUEST);
    }

    return user.toResponseObject();

  }

  async register(data: UserDto): Promise<UserRO> {

    const { username } = data;
    let user = await this.userRepository.findOne({
      where: { username }
    });

    if (user) {
      throw new HttpException("Username is used already", HttpStatus.BAD_REQUEST);
    }

    user = await this.userRepository.create(data);
    await this.userRepository.save(user);

    return user.toResponseObject();

  }


}
