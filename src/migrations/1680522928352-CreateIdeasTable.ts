import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdeasTable1680522928352 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const checkExist = await queryRunner.hasTable("idea");
    if (checkExist) {
      return;
    }

    queryRunner.query(`
        create table idea
        (
            id          uuid      default uuid_generate_v4() not null
                constraint "PK_5096f543c484b349f5234da9d97" primary key,
            idea        text                                 not null,
            description text                                 not null,
            created     timestamp default now()              not null,
            authorId    uuid
                constraint "FK_67530863c810fc8fd60c3d59b4e" references "user",
            updated     timestamp default now()              not null
        );
    `);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
