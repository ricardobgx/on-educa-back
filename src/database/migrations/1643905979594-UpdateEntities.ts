import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntities1643905979594 implements MigrationInterface {
    name = 'UpdateEntities1643905979594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."people" DROP CONSTRAINT "FK_69a5f11ad15f07abdf62d4ce804"`);
        await queryRunner.query(`ALTER TABLE "public"."people" DROP CONSTRAINT "REL_69a5f11ad15f07abdf62d4ce80"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "FK_acfcdb377f4dbf7e0ac61fd98a0"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "REL_acfcdb377f4dbf7e0ac61fd98a"`);
        await queryRunner.query(`ALTER TABLE "public"."people" ADD CONSTRAINT "FK_69a5f11ad15f07abdf62d4ce804" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "FK_acfcdb377f4dbf7e0ac61fd98a0" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "FK_acfcdb377f4dbf7e0ac61fd98a0"`);
        await queryRunner.query(`ALTER TABLE "public"."people" DROP CONSTRAINT "FK_69a5f11ad15f07abdf62d4ce804"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "REL_acfcdb377f4dbf7e0ac61fd98a" UNIQUE ("profilePictureId")`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "FK_acfcdb377f4dbf7e0ac61fd98a0" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."people" ADD CONSTRAINT "REL_69a5f11ad15f07abdf62d4ce80" UNIQUE ("profilePictureId")`);
        await queryRunner.query(`ALTER TABLE "public"."people" ADD CONSTRAINT "FK_69a5f11ad15f07abdf62d4ce804" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
