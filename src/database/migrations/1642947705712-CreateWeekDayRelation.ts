import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateWeekDayRelation1642947705712 implements MigrationInterface {
    name = 'CreateWeekDayRelation1642947705712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD "weekDayId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD CONSTRAINT "UQ_1be831617fdd654f7ebeb33abff" UNIQUE ("weekDayId")`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD CONSTRAINT "FK_1be831617fdd654f7ebeb33abff" FOREIGN KEY ("weekDayId") REFERENCES "student_week_day_performance"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP CONSTRAINT "FK_1be831617fdd654f7ebeb33abff"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP CONSTRAINT "UQ_1be831617fdd654f7ebeb33abff"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP COLUMN "weekDayId"`);
    }

}
