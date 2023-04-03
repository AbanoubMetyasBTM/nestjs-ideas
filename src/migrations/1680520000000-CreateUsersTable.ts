import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1680520000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    const checkExist = await queryRunner.hasTable("user");
    if (checkExist) {
      return;
    }

    queryRunner.query(`
        create table public."user"
        (
            id       uuid      default uuid_generate_v4() not null
                constraint "PK_cace4a159ff9f2512dd42373760" primary key,
            created  timestamp default now()              not null,
            username text                                 not null
                constraint "UQ_78a916df40e02a9deb1c4b75edb" unique,
            password text                                 not null
        );
    `);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
