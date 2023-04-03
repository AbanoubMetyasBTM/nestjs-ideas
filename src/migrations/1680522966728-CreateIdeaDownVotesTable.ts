import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdeaDownVotesTable1680522966728 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const checkExist = await queryRunner.hasTable("idea_downvotes_user");
    if (checkExist) {
      return;
    }

    queryRunner.query(`
        create table public.idea_downvotes_user
        (
            "ideaId" uuid not null
                constraint "FK_de10a42d0bcf83a6e913ebc893f"
                    references public.idea
                    on update cascade on delete cascade,
            "userId" uuid not null
                constraint "FK_8ab050e2633941e8c038ba4c5b7"
                    references public."user"
                    on update cascade on delete cascade,
            constraint "PK_f2343edf10edc86045018a2d3a7"
                primary key ("ideaId", "userId")
        );

        alter table public.idea_downvotes_user
            owner to db_user;

        create index "IDX_de10a42d0bcf83a6e913ebc893"
            on public.idea_downvotes_user ("ideaId");

        create index "IDX_8ab050e2633941e8c038ba4c5b"
            on public.idea_downvotes_user ("userId");

    `);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
