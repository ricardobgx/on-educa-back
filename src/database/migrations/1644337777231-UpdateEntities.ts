import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntities1644337777231 implements MigrationInterface {
    name = 'UpdateEntities1644337777231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "requesterId" uuid, "requestedId" uuid, CONSTRAINT "REL_9347bde29efe00b67d39f29d9e" UNIQUE ("requesterId"), CONSTRAINT "REL_cf520e238d9d970a642c53e7d4" UNIQUE ("requestedId"), CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_9347bde29efe00b67d39f29d9e7" FOREIGN KEY ("requesterId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_cf520e238d9d970a642c53e7d42" FOREIGN KEY ("requestedId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_cf520e238d9d970a642c53e7d42"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_9347bde29efe00b67d39f29d9e7"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
    }

}
