import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterDuelTeamParticipationRelationship1641733818953 implements MigrationInterface {
    name = 'AlterDuelTeamParticipationRelationship1641733818953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP CONSTRAINT "FK_71bb89d792303446ce1d9b17bd1"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP COLUMN "participationsId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD "participationsId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD CONSTRAINT "FK_71bb89d792303446ce1d9b17bd1" FOREIGN KEY ("participationsId") REFERENCES "duel_team_participation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
