import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes } from "@nestjs/common";
import { IdeaService } from "./idea.service";
import { IdeaDto, IdeaRO } from "./idea.dto";
import { ValidationPipe } from "../shared/validation.pipe";
import { AuthGuard } from "../shared/auth.guard";
import { User } from "../user/user.decorator";
import { BookmarksActionsEnum } from "../shared/BookmarksActionsEnum";
import { VoteActionsEnum } from "../shared/VoteActionsEnum";
import { ApiBearerAuth, ApiCreatedResponse } from "@nestjs/swagger";

@Controller("api/idea")
export class IdeaController {

  constructor(private ideaService: IdeaService) {
  }

  @Get()
  showAllIdeas(
    @Query("page") page: number
  ) {
    return this.ideaService.showAll(page);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  @ApiBearerAuth('authorization') //edit here
  @ApiCreatedResponse({
    description: "Created idea object as response",
    type: IdeaRO,
  })
  createIdea(
    @User("id") userId,
    @Body() data: IdeaDto
  ) {
    return this.ideaService.create(userId, data);
  }

  @Get(":id")
  readIdea(@Param("id") id: string) {
    return this.ideaService.read(id);
  }

  @Put(":id")
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  updateIdea(
    @Param("id") id: string,
    @User("id") userId: string,
    @Body() data: Partial<IdeaDto>
  ) {
    return this.ideaService.update(id, userId, data);
  }

  @Delete(":id")
  @UseGuards(new AuthGuard())
  deleteIdea(
    @Param("id") id: string,
    @User("id") userId: string
  ) {
    return this.ideaService.destroy(id, userId);

  }

  @Post(":id/bookmark")
  @UseGuards(new AuthGuard())
  bookmark(
    @Param("id") id: string,
    @User("id") userId: string
  ) {
    return this.ideaService.bookmark(id, userId, BookmarksActionsEnum.Add);
  }

  @Post(":id/unbookmark")
  @UseGuards(new AuthGuard())
  unbookmark(
    @Param("id") id: string,
    @User("id") userId: string
  ) {
    return this.ideaService.bookmark(id, userId, BookmarksActionsEnum.Remove);
  }

  @Post(":id/upvote")
  @UseGuards(new AuthGuard())
  upvote(
    @Param("id") id: string,
    @User("id") userId: string
  ) {
    return this.ideaService.vote(id, userId, VoteActionsEnum.up);
  }

  @Post(":id/downvote")
  @UseGuards(new AuthGuard())
  downvote(
    @Param("id") id: string,
    @User("id") userId: string
  ) {
    return this.ideaService.vote(id, userId, VoteActionsEnum.down);
  }


}
