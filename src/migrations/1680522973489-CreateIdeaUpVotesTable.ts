import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdeaUpVotesTable1680522973489 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const checkExist = await queryRunner.hasTable("idea_upvotes_user");
    if (checkExist) {
      return;
    }

    queryRunner.query(`
        create table public.idea_upvotes_user
        (
            "ideaId" uuid not null
                constraint "FK_d08e4b67dd2f23ea484a78fd8af"
                    references public.idea
                    on update cascade on delete cascade,
            "userId" uuid not null
                constraint "FK_5da87a862c47889e7a78be75332"
                    references public."user"
                    on update cascade on delete cascade,
            constraint "PK_3580e0be5b280c2d81f0e709ce2"
                primary key ("ideaId", "userId")
        );

        alter table public.idea_upvotes_user
            owner to db_user;

        create index "IDX_d08e4b67dd2f23ea484a78fd8a"
            on public.idea_upvotes_user ("ideaId");

        create index "IDX_5da87a862c47889e7a78be7533"
            on public.idea_upvotes_user ("userId");

    `);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
