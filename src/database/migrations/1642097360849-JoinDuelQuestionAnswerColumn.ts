import {MigrationInterface, QueryRunner} from "typeorm";

export class JoinDuelQuestionAnswerColumn1642097360849 implements MigrationInterface {
    name = 'JoinDuelQuestionAnswerColumn1642097360849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_round_question" ADD "answerId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round_question" ADD CONSTRAINT "UQ_b042a5935fa75a3eb86bd25591e" UNIQUE ("answerId")`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round_question" ADD CONSTRAINT "FK_b042a5935fa75a3eb86bd25591e" FOREIGN KEY ("answerId") REFERENCES "duel_question_answer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_round_question" DROP CONSTRAINT "FK_b042a5935fa75a3eb86bd25591e"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round_question" DROP CONSTRAINT "UQ_b042a5935fa75a3eb86bd25591e"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round_question" DROP COLUMN "answerId"`);
    }

}
