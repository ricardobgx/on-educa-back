import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDoubtStatusField1648596147041 implements MigrationInterface {
    name = 'UpdateDoubtStatusField1648596147041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD "status" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD "status" boolean NOT NULL`);
    }

}
