import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntities1644349186498 implements MigrationInterface {
    name = 'UpdateEntities1644349186498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."friend_request" DROP CONSTRAINT "FK_9347bde29efe00b67d39f29d9e7"`);
        await queryRunner.query(`ALTER TABLE "public"."friend_request" DROP CONSTRAINT "FK_cf520e238d9d970a642c53e7d42"`);
        await queryRunner.query(`ALTER TABLE "public"."friend_request" DROP CONSTRAINT "REL_9347bde29efe00b67d39f29d9e"`);
        await queryRunner.query(`ALTER TABLE "public"."friend_request" DROP CONSTRAINT "REL_cf520e238d9d970a642c53e7d4"`);
        await queryRunner.query(`ALTER TABLE "public"."friend_request" ADD CONSTRAINT "FK_9347bde29efe00b67d39f29d9e7" FOREIGN KEY ("requesterId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."friend_request" ADD CONSTRAINT "FK_cf520e238d9d970a642c53e7d42" FOREIGN KEY ("requestedId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."friend_request" DROP CONSTRAINT "FK_cf520e238d9d970a642c53e7d42"`);
        await queryRunner.query(`ALTER TABLE "public"."friend_request" DROP CONSTRAINT "FK_9347bde29efe00b67d39f29d9e7"`);
        await queryRunner.query(`ALTER TABLE "public"."friend_request" ADD CONSTRAINT "REL_cf520e238d9d970a642c53e7d4" UNIQUE ("requestedId")`);
        await queryRunner.query(`ALTER TABLE "public"."friend_request" ADD CONSTRAINT "REL_9347bde29efe00b67d39f29d9e" UNIQUE ("requesterId")`);
        await queryRunner.query(`ALTER TABLE "public"."friend_request" ADD CONSTRAINT "FK_cf520e238d9d970a642c53e7d42" FOREIGN KEY ("requestedId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."friend_request" ADD CONSTRAINT "FK_9347bde29efe00b67d39f29d9e7" FOREIGN KEY ("requesterId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
