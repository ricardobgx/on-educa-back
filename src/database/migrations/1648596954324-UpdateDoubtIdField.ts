import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDoubtIdField1648596954324 implements MigrationInterface {
    name = 'UpdateDoubtIdField1648596954324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP CONSTRAINT "PK_8f23d800a75d09d4e139a40b998"`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD CONSTRAINT "PK_8f23d800a75d09d4e139a40b998" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP CONSTRAINT "PK_8f23d800a75d09d4e139a40b998"`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD CONSTRAINT "PK_8f23d800a75d09d4e139a40b998" PRIMARY KEY ("id")`);
    }

}
