import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateDuelRelationsFields1639591470769 implements MigrationInterface {
    name = 'UpdateDuelRelationsFields1639591470769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "duel_team_participation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "duelTeamId" uuid, "studentId" uuid, "studentEmail" character varying, CONSTRAINT "PK_05f3af6e748256b53814cfa187e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "duel_question_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "duelTeamParticipationId" uuid, "selectedAlternativeId" uuid, CONSTRAINT "PK_4a2618931cb64990c13922bc563" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD "participationsId" uuid`);
        await queryRunner.query(`ALTER TABLE "duel_team_participation" ADD CONSTRAINT "FK_51efdef94e91f8eef995fd2120a" FOREIGN KEY ("duelTeamId") REFERENCES "duel_team"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_team_participation" ADD CONSTRAINT "FK_5c2d1f1f58755fbcce49e26f94f" FOREIGN KEY ("studentId", "studentEmail") REFERENCES "student"("id","email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" ADD CONSTRAINT "FK_71bb89d792303446ce1d9b17bd1" FOREIGN KEY ("participationsId") REFERENCES "duel_team_participation"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_question_answer" ADD CONSTRAINT "FK_d0d92b073c5abfc503f57d1f73d" FOREIGN KEY ("duelTeamParticipationId") REFERENCES "duel_team_participation"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_question_answer" ADD CONSTRAINT "FK_bd5c0c75a54d5dcbe611219f334" FOREIGN KEY ("selectedAlternativeId") REFERENCES "alternative"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duel_question_answer" DROP CONSTRAINT "FK_bd5c0c75a54d5dcbe611219f334"`);
        await queryRunner.query(`ALTER TABLE "duel_question_answer" DROP CONSTRAINT "FK_d0d92b073c5abfc503f57d1f73d"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP CONSTRAINT "FK_71bb89d792303446ce1d9b17bd1"`);
        await queryRunner.query(`ALTER TABLE "duel_team_participation" DROP CONSTRAINT "FK_5c2d1f1f58755fbcce49e26f94f"`);
        await queryRunner.query(`ALTER TABLE "duel_team_participation" DROP CONSTRAINT "FK_51efdef94e91f8eef995fd2120a"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_team" DROP COLUMN "participationsId"`);
        await queryRunner.query(`DROP TABLE "duel_question_answer"`);
        await queryRunner.query(`DROP TABLE "duel_team_participation"`);
    }

}
