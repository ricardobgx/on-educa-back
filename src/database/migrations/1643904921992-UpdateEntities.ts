import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntities1643904921992 implements MigrationInterface {
    name = 'UpdateEntities1643904921992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_day_performance" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_day_performance" ADD "createdAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."teacher_week_day_performance" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher_week_day_performance" ADD "createdAt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."teacher_week_day_performance" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher_week_day_performance" ADD "createdAt" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_day_performance" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_day_performance" ADD "createdAt" integer NOT NULL`);
    }

}
