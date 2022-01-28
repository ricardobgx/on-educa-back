import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateStudentWeekPerformanceRelation1643390009506 implements MigrationInterface {
    name = 'UpdateStudentWeekPerformanceRelation1643390009506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student" ADD "weekPerformanceId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "UQ_5465b0ba7b6fa4f3133215c8ad2" UNIQUE ("weekPerformanceId")`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "FK_5465b0ba7b6fa4f3133215c8ad2" FOREIGN KEY ("weekPerformanceId") REFERENCES "student_week_performance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_5465b0ba7b6fa4f3133215c8ad2"`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "UQ_5465b0ba7b6fa4f3133215c8ad2"`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "weekPerformanceId"`);
    }

}
