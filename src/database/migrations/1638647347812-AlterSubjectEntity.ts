import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterSubjectEntity1638647347812 implements MigrationInterface {
    name = 'AlterSubjectEntity1638647347812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."subject" DROP CONSTRAINT "UQ_d011c391e37d9a5e63e8b04c977"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."subject" ADD CONSTRAINT "UQ_d011c391e37d9a5e63e8b04c977" UNIQUE ("name")`);
    }

}
