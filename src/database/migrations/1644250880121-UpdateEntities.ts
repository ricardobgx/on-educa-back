import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntities1644250880121 implements MigrationInterface {
    name = 'UpdateEntities1644250880121'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student" ADD "duelTeamParticipationsId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team_participation" ADD "studentId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "studentId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "FK_c53bd959aa9e9b9cacf83824158" FOREIGN KEY ("duelTeamParticipationsId") REFERENCES "duel_team_participation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team_participation" ADD CONSTRAINT "FK_8c402b0f7beb061c05d9c8abbc1" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD CONSTRAINT "FK_be3e507e24557cfa40f1acb2f22" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP CONSTRAINT "FK_be3e507e24557cfa40f1acb2f22"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team_participation" DROP CONSTRAINT "FK_8c402b0f7beb061c05d9c8abbc1"`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_c53bd959aa9e9b9cacf83824158"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "studentId"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team_participation" DROP COLUMN "studentId"`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "duelTeamParticipationsId"`);
    }

}
