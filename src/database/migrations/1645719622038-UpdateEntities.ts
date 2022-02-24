import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntities1645719622038 implements MigrationInterface {
    name = 'UpdateEntities1645719622038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD "winnerTeamId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD CONSTRAINT "UQ_29824fb023571bb45075b889d80" UNIQUE ("winnerTeamId")`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD CONSTRAINT "FK_29824fb023571bb45075b889d80" FOREIGN KEY ("winnerTeamId") REFERENCES "duel_team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP CONSTRAINT "FK_29824fb023571bb45075b889d80"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP CONSTRAINT "UQ_29824fb023571bb45075b889d80"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP COLUMN "winnerTeamId"`);
    }

}
