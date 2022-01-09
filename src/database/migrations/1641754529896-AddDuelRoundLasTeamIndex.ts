import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDuelRoundLasTeamIndex1641754529896 implements MigrationInterface {
    name = 'AddDuelRoundLasTeamIndex1641754529896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP COLUMN "lastParticipantIndex"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD "index" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD "lastParticipationIndex" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team_participation" ADD "index" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD "lastTeamIndex" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP COLUMN "lastTeamIndex"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team_participation" DROP COLUMN "index"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP COLUMN "lastParticipationIndex"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP COLUMN "index"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD "lastParticipantIndex" integer NOT NULL`);
    }

}
