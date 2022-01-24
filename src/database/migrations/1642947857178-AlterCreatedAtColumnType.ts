import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterCreatedAtColumnType1642947857178 implements MigrationInterface {
    name = 'AlterCreatedAtColumnType1642947857178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD "createdAt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD "createdAt" TIMESTAMP NOT NULL`);
    }

}
