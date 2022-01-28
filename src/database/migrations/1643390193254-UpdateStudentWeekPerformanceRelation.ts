import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateStudentWeekPerformanceRelation1643390193254 implements MigrationInterface {
    name = 'UpdateStudentWeekPerformanceRelation1643390193254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP CONSTRAINT "FK_0e38faef66a1ef4e96e80d5df23"`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_5465b0ba7b6fa4f3133215c8ad2"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD "weekDayId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD CONSTRAINT "UQ_1be831617fdd654f7ebeb33abff" UNIQUE ("weekDayId")`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD CONSTRAINT "FK_0e38faef66a1ef4e96e80d5df23" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD CONSTRAINT "FK_1be831617fdd654f7ebeb33abff" FOREIGN KEY ("weekDayId") REFERENCES "student_week_day_performance"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "FK_5465b0ba7b6fa4f3133215c8ad2" FOREIGN KEY ("weekPerformanceId") REFERENCES "student_week_performance"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_5465b0ba7b6fa4f3133215c8ad2"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP CONSTRAINT "FK_1be831617fdd654f7ebeb33abff"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP CONSTRAINT "FK_0e38faef66a1ef4e96e80d5df23"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP CONSTRAINT "UQ_1be831617fdd654f7ebeb33abff"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP COLUMN "weekDayId"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "FK_5465b0ba7b6fa4f3133215c8ad2" FOREIGN KEY ("weekPerformanceId") REFERENCES "student_week_performance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD CONSTRAINT "FK_0e38faef66a1ef4e96e80d5df23" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
