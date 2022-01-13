import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDuelRoundColumns1642101751346 implements MigrationInterface {
    name = 'UpdateDuelRoundColumns1642101751346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_team" RENAME COLUMN "lastParticipationIndex" TO "participationId"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP COLUMN "lastTeamIndex"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD "teamId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD CONSTRAINT "UQ_498d2b82b13373a001522856385" UNIQUE ("teamId")`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD "questionId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD CONSTRAINT "UQ_5913ac39a7a8e851fe78a275a59" UNIQUE ("questionId")`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP COLUMN "participationId"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD "participationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD CONSTRAINT "UQ_f1d077df1d8a7b2c7cb2cf841d2" UNIQUE ("participationId")`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD CONSTRAINT "FK_f1d077df1d8a7b2c7cb2cf841d2" FOREIGN KEY ("participationId") REFERENCES "duel_team_participation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD CONSTRAINT "FK_498d2b82b13373a001522856385" FOREIGN KEY ("teamId") REFERENCES "duel_team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD CONSTRAINT "FK_5913ac39a7a8e851fe78a275a59" FOREIGN KEY ("questionId") REFERENCES "duel_round_question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP CONSTRAINT "FK_5913ac39a7a8e851fe78a275a59"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP CONSTRAINT "FK_498d2b82b13373a001522856385"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP CONSTRAINT "FK_f1d077df1d8a7b2c7cb2cf841d2"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP CONSTRAINT "UQ_f1d077df1d8a7b2c7cb2cf841d2"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP COLUMN "participationId"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD "participationId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP CONSTRAINT "UQ_5913ac39a7a8e851fe78a275a59"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP COLUMN "questionId"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP CONSTRAINT "UQ_498d2b82b13373a001522856385"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP COLUMN "teamId"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD "lastTeamIndex" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" RENAME COLUMN "participationId" TO "lastParticipationIndex"`);
    }

}
