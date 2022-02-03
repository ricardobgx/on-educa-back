import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntities1643906392608 implements MigrationInterface {
    name = 'UpdateEntities1643906392608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "FK_acfcdb377f4dbf7e0ac61fd98a0"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "UQ_00634394dce7677d531749ed8e8"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP COLUMN "isOnline"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP COLUMN "isStudent"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP COLUMN "profilePictureId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD "profilePictureId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD "isStudent" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD "isOnline" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "FK_acfcdb377f4dbf7e0ac61fd98a0" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
