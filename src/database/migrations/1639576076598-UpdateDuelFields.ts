import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDuelFields1639576076598 implements MigrationInterface {
    name = 'UpdateDuelFields1639576076598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel" RENAME COLUMN "maxGroupParts" TO "maxGroupParticipants"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD "lastParticipantIndex" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP COLUMN "lastParticipantIndex"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" RENAME COLUMN "maxGroupParticipants" TO "maxGroupParts"`);
    }

}
