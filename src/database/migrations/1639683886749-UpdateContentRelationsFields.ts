import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateContentRelationsFields1639683886749 implements MigrationInterface {
    name = 'UpdateContentRelationsFields1639683886749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."content" DROP CONSTRAINT "FK_d553a9a07bbb76b508eb19f2b0f"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP CONSTRAINT "FK_2cfc486cba8d2002820e76c0fa1"`);
        await queryRunner.query(`CREATE TABLE "duel_questions_duel_question" ("duelId" uuid NOT NULL, "duelQuestionId" uuid NOT NULL, CONSTRAINT "PK_ec13235da2026d4e0d985e9d4fa" PRIMARY KEY ("duelId", "duelQuestionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a767122e874273e3c32ecb4432" ON "duel_questions_duel_question" ("duelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b2a8a8f04dc7a984ed0a4594ca" ON "duel_questions_duel_question" ("duelQuestionId") `);
        await queryRunner.query(`ALTER TABLE "public"."question" DROP COLUMN "index"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "duelOwnerId"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "duelOwnerEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "ownerEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."content" ADD CONSTRAINT "FK_d553a9a07bbb76b508eb19f2b0f" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD CONSTRAINT "FK_91563867cfc7d2826f51400ae91" FOREIGN KEY ("ownerId", "ownerEmail") REFERENCES "student"("id","email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_questions_duel_question" ADD CONSTRAINT "FK_a767122e874273e3c32ecb4432f" FOREIGN KEY ("duelId") REFERENCES "duel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_questions_duel_question" ADD CONSTRAINT "FK_b2a8a8f04dc7a984ed0a4594ca0" FOREIGN KEY ("duelQuestionId") REFERENCES "duel_question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duel_questions_duel_question" DROP CONSTRAINT "FK_b2a8a8f04dc7a984ed0a4594ca0"`);
        await queryRunner.query(`ALTER TABLE "duel_questions_duel_question" DROP CONSTRAINT "FK_a767122e874273e3c32ecb4432f"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP CONSTRAINT "FK_91563867cfc7d2826f51400ae91"`);
        await queryRunner.query(`ALTER TABLE "public"."content" DROP CONSTRAINT "FK_d553a9a07bbb76b508eb19f2b0f"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "ownerEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "duelOwnerEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "duelOwnerId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."question" ADD "index" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "IDX_b2a8a8f04dc7a984ed0a4594ca"`);
        await queryRunner.query(`DROP INDEX "IDX_a767122e874273e3c32ecb4432"`);
        await queryRunner.query(`DROP TABLE "duel_questions_duel_question"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD CONSTRAINT "FK_2cfc486cba8d2002820e76c0fa1" FOREIGN KEY ("duelOwnerEmail", "duelOwnerId") REFERENCES "student"("email","id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."content" ADD CONSTRAINT "FK_d553a9a07bbb76b508eb19f2b0f" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
