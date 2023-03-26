import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UsePipes } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { AuthGuard } from "../shared/auth.guard";
import { ValidationPipe } from "../shared/validation.pipe";
import { User } from "../user/user.decorator";
import { CommentDto } from "./comment.dto";

@Controller("api/comments")
export class CommentController {

  constructor(
    private commentService: CommentService
  ) {
  }

  @Get("idea/:ideaId")
  showComments(
    @Param("ideaId") ideaId: string,
    @Query("page") page: number,
  ) {
    return this.commentService.showIdeaComments(ideaId, page);
  }

  @Post("idea/:ideaId")
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  addComment(
    @Param("ideaId") ideaId: string,
    @User("id") userId: string,
    @Body() data: CommentDto
  ) {
    return this.commentService.createComment(ideaId, userId, data);
  }

  @Get("user/:userId")
  showUserComments(
    @Param("userId") userId: string,
    @Query("page") page: number,
  ) {
    return this.commentService.showUserComments(userId, page);
  }

  @Delete(":commentId")
  @UseGuards(new AuthGuard())
  destroyComment(
    @Param("commentId") commentId: string,
    @User("id") userId: string
  ) {
    return this.commentService.destroy(commentId, userId);
  }


}
