import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateStudentWeekPerformanceRelation1643391628548 implements MigrationInterface {
    name = 'UpdateStudentWeekPerformanceRelation1643391628548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "FK_f58f9c73bc58e409038e56a4055"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "FK_acfcdb377f4dbf7e0ac61fd98a0"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP CONSTRAINT "FK_1be831617fdd654f7ebeb33abff"`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_54bf32e2919294aa43bbc2783f7"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "FK_f58f9c73bc58e409038e56a4055" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "FK_acfcdb377f4dbf7e0ac61fd98a0" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD CONSTRAINT "FK_1be831617fdd654f7ebeb33abff" FOREIGN KEY ("weekDayId") REFERENCES "student_week_day_performance"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "FK_54bf32e2919294aa43bbc2783f7" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_54bf32e2919294aa43bbc2783f7"`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" DROP CONSTRAINT "FK_1be831617fdd654f7ebeb33abff"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "FK_acfcdb377f4dbf7e0ac61fd98a0"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "FK_f58f9c73bc58e409038e56a4055"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "FK_54bf32e2919294aa43bbc2783f7" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."student_week_performance" ADD CONSTRAINT "FK_1be831617fdd654f7ebeb33abff" FOREIGN KEY ("weekDayId") REFERENCES "student_week_day_performance"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "FK_acfcdb377f4dbf7e0ac61fd98a0" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "FK_f58f9c73bc58e409038e56a4055" FOREIGN KEY ("profilePictureId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
