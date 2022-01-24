import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateColumnInStudentWeekDayPerformance1643029339065 implements MigrationInterface {
    name = 'AddDateColumnInStudentWeekDayPerformance1643029339065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_day_performance" ADD "date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_day_performance" DROP COLUMN "date"`);
    }

}
