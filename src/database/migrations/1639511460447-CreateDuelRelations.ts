import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDuelRelations1639511460447 implements MigrationInterface {
    name = 'CreateDuelRelations1639511460447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP CONSTRAINT "FK_577c8cacbb5008013870738527c"`);
        await queryRunner.query(`CREATE TABLE "duel_team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "duelId" uuid, CONSTRAINT "PK_bdf57234725fcc0ab78b7fc4b02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "duel_participation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "duelId" uuid, "duelTeamId" uuid, "studentId" uuid, "studentEmail" character varying, CONSTRAINT "PK_781e1c6d5e1ebdb03bef2f30c82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "duel_question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "duelId" uuid, "questionId" uuid, CONSTRAINT "PK_1782cacfd91a4d7fdd0664ec951" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "duel_question_alternative" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "duelParticipationId" uuid, "questionAlternativeId" uuid, CONSTRAINT "PK_42cf1b749e3999539dcd0f24e1e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "duel_team_participations_duel_participation" ("duelTeamId" uuid NOT NULL, "duelParticipationId" uuid NOT NULL, CONSTRAINT "PK_120fcabc3e0c448693ba27104a3" PRIMARY KEY ("duelTeamId", "duelParticipationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_84dc94f81e8a715e074cadbc63" ON "duel_team_participations_duel_participation" ("duelTeamId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ace76d60c01c88b721aa8d28f3" ON "duel_team_participations_duel_participation" ("duelParticipationId") `);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "studentId"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "studentEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "timeForQuestion" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "questionsPerContent" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "duelOwnerId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "duelOwnerEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "duel_team" ADD CONSTRAINT "FK_1d6f9ffd05f4c2992d358b6b8c8" FOREIGN KEY ("duelId") REFERENCES "duel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_participation" ADD CONSTRAINT "FK_40d1c3cdc243f63b365fc47eea5" FOREIGN KEY ("duelId") REFERENCES "duel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_participation" ADD CONSTRAINT "FK_8b86faf3c0e85c071ef5f38ddd9" FOREIGN KEY ("duelTeamId") REFERENCES "duel_team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_participation" ADD CONSTRAINT "FK_fd59599614ef036c1a619c59ad6" FOREIGN KEY ("studentId", "studentEmail") REFERENCES "student"("id","email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD CONSTRAINT "FK_2cfc486cba8d2002820e76c0fa1" FOREIGN KEY ("duelOwnerId", "duelOwnerEmail") REFERENCES "student"("id","email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_question" ADD CONSTRAINT "FK_9cffe673973783ecd00702ac9a4" FOREIGN KEY ("duelId") REFERENCES "duel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_question" ADD CONSTRAINT "FK_fa9877a9d51b77388c7f0e79a2a" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_question_alternative" ADD CONSTRAINT "FK_2d599b1b73f596c501e473266f9" FOREIGN KEY ("duelParticipationId") REFERENCES "duel_participation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_question_alternative" ADD CONSTRAINT "FK_57e376216c5146232d99dd5ae7a" FOREIGN KEY ("questionAlternativeId") REFERENCES "alternative"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_team_participations_duel_participation" ADD CONSTRAINT "FK_84dc94f81e8a715e074cadbc63a" FOREIGN KEY ("duelTeamId") REFERENCES "duel_team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_team_participations_duel_participation" ADD CONSTRAINT "FK_ace76d60c01c88b721aa8d28f3c" FOREIGN KEY ("duelParticipationId") REFERENCES "duel_participation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duel_team_participations_duel_participation" DROP CONSTRAINT "FK_ace76d60c01c88b721aa8d28f3c"`);
        await queryRunner.query(`ALTER TABLE "duel_team_participations_duel_participation" DROP CONSTRAINT "FK_84dc94f81e8a715e074cadbc63a"`);
        await queryRunner.query(`ALTER TABLE "duel_question_alternative" DROP CONSTRAINT "FK_57e376216c5146232d99dd5ae7a"`);
        await queryRunner.query(`ALTER TABLE "duel_question_alternative" DROP CONSTRAINT "FK_2d599b1b73f596c501e473266f9"`);
        await queryRunner.query(`ALTER TABLE "duel_question" DROP CONSTRAINT "FK_fa9877a9d51b77388c7f0e79a2a"`);
        await queryRunner.query(`ALTER TABLE "duel_question" DROP CONSTRAINT "FK_9cffe673973783ecd00702ac9a4"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP CONSTRAINT "FK_2cfc486cba8d2002820e76c0fa1"`);
        await queryRunner.query(`ALTER TABLE "duel_participation" DROP CONSTRAINT "FK_fd59599614ef036c1a619c59ad6"`);
        await queryRunner.query(`ALTER TABLE "duel_participation" DROP CONSTRAINT "FK_8b86faf3c0e85c071ef5f38ddd9"`);
        await queryRunner.query(`ALTER TABLE "duel_participation" DROP CONSTRAINT "FK_40d1c3cdc243f63b365fc47eea5"`);
        await queryRunner.query(`ALTER TABLE "duel_team" DROP CONSTRAINT "FK_1d6f9ffd05f4c2992d358b6b8c8"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "duelOwnerEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "duelOwnerId"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "questionsPerContent"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "timeForQuestion"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "studentEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "studentId" uuid`);
        await queryRunner.query(`DROP INDEX "IDX_ace76d60c01c88b721aa8d28f3"`);
        await queryRunner.query(`DROP INDEX "IDX_84dc94f81e8a715e074cadbc63"`);
        await queryRunner.query(`DROP TABLE "duel_team_participations_duel_participation"`);
        await queryRunner.query(`DROP TABLE "duel_question_alternative"`);
        await queryRunner.query(`DROP TABLE "duel_question"`);
        await queryRunner.query(`DROP TABLE "duel_participation"`);
        await queryRunner.query(`DROP TABLE "duel_team"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD CONSTRAINT "FK_577c8cacbb5008013870738527c" FOREIGN KEY ("studentEmail", "studentId") REFERENCES "student"("email","id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
