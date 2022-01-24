import {MigrationInterface, QueryRunner} from "typeorm";

export class StudentWeekPerformance1642945594897 implements MigrationInterface {
    name = 'StudentWeekPerformance1642945594897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student_week_day_performance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dailyXP" integer NOT NULL, "studiedContents" integer NOT NULL, "questionsAnswered" integer NOT NULL, "rightQuestionsAnswered" integer NOT NULL, "duelsParticipated" integer NOT NULL, "weekPerformanceId" uuid, CONSTRAINT "PK_a8479c0c61766816f06a49380cf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_week_performance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "xp" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_9766eca31737a21f96491141c46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD "weekPerformanceId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "UQ_5465b0ba7b6fa4f3133215c8ad2" UNIQUE ("weekPerformanceId")`);
        await queryRunner.query(`ALTER TABLE "student_week_day_performance" ADD CONSTRAINT "FK_d48a33305021f04124a91a4d7f5" FOREIGN KEY ("weekPerformanceId") REFERENCES "student_week_performance"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "FK_5465b0ba7b6fa4f3133215c8ad2" FOREIGN KEY ("weekPerformanceId") REFERENCES "student_week_performance"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_5465b0ba7b6fa4f3133215c8ad2"`);
        await queryRunner.query(`ALTER TABLE "student_week_day_performance" DROP CONSTRAINT "FK_d48a33305021f04124a91a4d7f5"`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "UQ_5465b0ba7b6fa4f3133215c8ad2"`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "weekPerformanceId"`);
        await queryRunner.query(`DROP TABLE "student_week_performance"`);
        await queryRunner.query(`DROP TABLE "student_week_day_performance"`);
    }

}
