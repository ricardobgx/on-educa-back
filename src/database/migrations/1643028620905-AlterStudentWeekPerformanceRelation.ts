import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterStudentWeekPerformanceRelation1643028620905 implements MigrationInterface {
    name = 'AlterStudentWeekPerformanceRelation1643028620905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD "studentId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD CONSTRAINT "UQ_0e38faef66a1ef4e96e80d5df23" UNIQUE ("studentId")`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD CONSTRAINT "FK_0e38faef66a1ef4e96e80d5df23" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP CONSTRAINT "FK_0e38faef66a1ef4e96e80d5df23"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP CONSTRAINT "UQ_0e38faef66a1ef4e96e80d5df23"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP COLUMN "studentId"`);
    }

}
