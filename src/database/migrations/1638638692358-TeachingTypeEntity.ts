import {MigrationInterface, QueryRunner} from "typeorm";

export class TeachingTypeEntity1638638692358 implements MigrationInterface {
    name = 'TeachingTypeEntity1638638692358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."content" DROP CONSTRAINT "FK_02b51c7f1f531facdc997e846d2"`);
        await queryRunner.query(`ALTER TABLE "public"."content" DROP CONSTRAINT "FK_aca2d12589a8580b96b9d4dd76a"`);
        await queryRunner.query(`CREATE TABLE "unity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "subjectId" uuid, CONSTRAINT "PK_bd68d5ab918eab83daa1203032f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "school_grade" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "index" integer NOT NULL, "teachingTypeId" uuid, CONSTRAINT "PK_eae314198c548c010a720c875e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teaching_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, CONSTRAINT "PK_d976c2a8ea85fac42049a718abe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."content" DROP COLUMN "subjectId"`);
        await queryRunner.query(`ALTER TABLE "public"."content" DROP COLUMN "teacherEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."subject" ADD "schoolGradeId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD "teachingTypeId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."content" ADD "unityId" uuid`);
        await queryRunner.query(`ALTER TABLE "unity" ADD CONSTRAINT "FK_c8c6acef92752b428d651516920" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."subject" ADD CONSTRAINT "FK_ce164c28fa601e77c850a18254b" FOREIGN KEY ("schoolGradeId") REFERENCES "school_grade"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "school_grade" ADD CONSTRAINT "FK_63d5d0cf569c2acbfeadf78bc6b" FOREIGN KEY ("teachingTypeId") REFERENCES "teaching_type"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "FK_604fe325d9a0a93e52d5c8758b5" FOREIGN KEY ("teachingTypeId") REFERENCES "teaching_type"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."content" ADD CONSTRAINT "FK_d553a9a07bbb76b508eb19f2b0f" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."content" DROP CONSTRAINT "FK_d553a9a07bbb76b508eb19f2b0f"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "FK_604fe325d9a0a93e52d5c8758b5"`);
        await queryRunner.query(`ALTER TABLE "school_grade" DROP CONSTRAINT "FK_63d5d0cf569c2acbfeadf78bc6b"`);
        await queryRunner.query(`ALTER TABLE "public"."subject" DROP CONSTRAINT "FK_ce164c28fa601e77c850a18254b"`);
        await queryRunner.query(`ALTER TABLE "unity" DROP CONSTRAINT "FK_c8c6acef92752b428d651516920"`);
        await queryRunner.query(`ALTER TABLE "public"."content" DROP COLUMN "unityId"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP COLUMN "teachingTypeId"`);
        await queryRunner.query(`ALTER TABLE "public"."subject" DROP COLUMN "schoolGradeId"`);
        await queryRunner.query(`ALTER TABLE "public"."content" ADD "teacherEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."content" ADD "subjectId" uuid`);
        await queryRunner.query(`DROP TABLE "teaching_type"`);
        await queryRunner.query(`DROP TABLE "school_grade"`);
        await queryRunner.query(`DROP TABLE "unity"`);
        await queryRunner.query(`ALTER TABLE "public"."content" ADD CONSTRAINT "FK_aca2d12589a8580b96b9d4dd76a" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."content" ADD CONSTRAINT "FK_02b51c7f1f531facdc997e846d2" FOREIGN KEY ("teacherEmail") REFERENCES "teacher"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
