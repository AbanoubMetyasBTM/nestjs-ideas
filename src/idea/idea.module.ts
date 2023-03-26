import { Module } from "@nestjs/common";
import { IdeaController } from "./idea.controller";
import { IdeaService } from "./idea.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IdeaEntity } from "./idea.entity";
import { UserEntity } from "../user/user.entity";
import { AppGateway } from "../app.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity])],
  controllers: [IdeaController],
  providers: [IdeaService, AppGateway]
})
export class IdeaModule {
}
