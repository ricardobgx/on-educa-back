import {MigrationInterface, QueryRunner} from "typeorm";

export class PracticeEntityAndRelationShips1642615085997 implements MigrationInterface {
    name = 'PracticeEntityAndRelationShips1642615085997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "practice_question_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "selectedAlternativeId" uuid, CONSTRAINT "PK_b0d3bec695f7a2cbb79ebf4b34e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "practice_question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "practiceId" uuid, "answerId" uuid, CONSTRAINT "REL_c848ffc24782a6ebda999e7224" UNIQUE ("answerId"), CONSTRAINT "PK_eeca02a27b041e559b7699b765a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "practice" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" integer NOT NULL, "studentId" uuid, "contentId" uuid, CONSTRAINT "PK_4d094a10eae690da34cc5b8ea32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "practice_question_answer" ADD CONSTRAINT "FK_b587993af4c4872394e7d884fc8" FOREIGN KEY ("selectedAlternativeId") REFERENCES "alternative"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "practice_question" ADD CONSTRAINT "FK_25d91d39206740f640e250ffa70" FOREIGN KEY ("practiceId") REFERENCES "practice"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "practice_question" ADD CONSTRAINT "FK_c848ffc24782a6ebda999e7224e" FOREIGN KEY ("answerId") REFERENCES "practice_question_answer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "practice" ADD CONSTRAINT "FK_e902934461d2ef50aeea7ab3a59" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "practice" ADD CONSTRAINT "FK_a241099872f28e00e91d59a59ee" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "practice" DROP CONSTRAINT "FK_a241099872f28e00e91d59a59ee"`);
        await queryRunner.query(`ALTER TABLE "practice" DROP CONSTRAINT "FK_e902934461d2ef50aeea7ab3a59"`);
        await queryRunner.query(`ALTER TABLE "practice_question" DROP CONSTRAINT "FK_c848ffc24782a6ebda999e7224e"`);
        await queryRunner.query(`ALTER TABLE "practice_question" DROP CONSTRAINT "FK_25d91d39206740f640e250ffa70"`);
        await queryRunner.query(`ALTER TABLE "practice_question_answer" DROP CONSTRAINT "FK_b587993af4c4872394e7d884fc8"`);
        await queryRunner.query(`DROP TABLE "practice"`);
        await queryRunner.query(`DROP TABLE "practice_question"`);
        await queryRunner.query(`DROP TABLE "practice_question_answer"`);
    }

}
