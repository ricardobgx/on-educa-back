import {MigrationInterface, QueryRunner} from "typeorm";

export class League1653742723954 implements MigrationInterface {
    name = 'League1653742723954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "league" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" integer NOT NULL, "level" integer NOT NULL, "minScore" integer NOT NULL, "requiredScore" integer NOT NULL, CONSTRAINT "PK_0bd74b698f9e28875df738f7864" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."people" ADD "leagueId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."people" ADD CONSTRAINT "FK_ea9ad9bb9b85bce56346abc7202" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."people" DROP CONSTRAINT "FK_ea9ad9bb9b85bce56346abc7202"`);
        await queryRunner.query(`ALTER TABLE "public"."people" DROP COLUMN "leagueId"`);
        await queryRunner.query(`DROP TABLE "league"`);
    }

}
