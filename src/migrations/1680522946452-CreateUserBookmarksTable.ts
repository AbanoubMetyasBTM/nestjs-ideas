import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserBookmarksTable1680522946452 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const checkExist = await queryRunner.hasTable("user_bookmarks_idea");
    if (checkExist) {
      return;
    }

    queryRunner.query(`
        create table public.user_bookmarks_idea
        (
            "userId" uuid not null
                constraint "FK_57a5c456ea2f8aa6b74dc8eb230"
                    references public."user"
                    on update cascade on delete cascade,
            "ideaId" uuid not null
                constraint "FK_99eeae9c25ea8532138978937ce"
                    references public.idea
                    on update cascade on delete cascade,
            constraint "PK_e0ae74f2721d64a3afa6917d2e6"
                primary key ("userId", "ideaId")
        );

        alter table public.user_bookmarks_idea
            owner to db_user;

        create index "IDX_57a5c456ea2f8aa6b74dc8eb23"
            on public.user_bookmarks_idea ("userId");

        create index "IDX_99eeae9c25ea8532138978937c"
            on public.user_bookmarks_idea ("ideaId");
    `);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
