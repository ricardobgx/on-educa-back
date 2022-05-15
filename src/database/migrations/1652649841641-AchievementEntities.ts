import {MigrationInterface, QueryRunner} from "typeorm";

export class AchievementEntities1652649841641 implements MigrationInterface {
    name = 'AchievementEntities1652649841641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "achievement_activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "activity" character varying NOT NULL, "achievementId" uuid, CONSTRAINT "PK_61ebd41aa681f465ea3f9703c32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "achievement_progress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "progress" integer NOT NULL, "status" integer NOT NULL, "peopleId" uuid, "levelId" uuid, "achievementId" uuid, CONSTRAINT "PK_901cc379a8dbe909f3d617c0da1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "achievement_level" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "level" integer NOT NULL, "goal" integer NOT NULL, "achievementId" uuid, CONSTRAINT "PK_096d66239cd6688ab576a769390" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "achievement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "isStudentAchievement" boolean NOT NULL, CONSTRAINT "PK_441339f40e8ce717525a381671e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "achievement_activity" ADD CONSTRAINT "FK_8d50ca00e36fbd525982d475322" FOREIGN KEY ("achievementId") REFERENCES "achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "achievement_progress" ADD CONSTRAINT "FK_5e8224b47a68f9ccc31e1ed4f60" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "achievement_progress" ADD CONSTRAINT "FK_511e71a9dc5ec414e61e01bc583" FOREIGN KEY ("levelId") REFERENCES "achievement_level"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "achievement_progress" ADD CONSTRAINT "FK_20adca3c4217744bfd8a485e98d" FOREIGN KEY ("achievementId") REFERENCES "achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "achievement_level" ADD CONSTRAINT "FK_5f0fb2164b978849357c1ab20b9" FOREIGN KEY ("achievementId") REFERENCES "achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "achievement_level" DROP CONSTRAINT "FK_5f0fb2164b978849357c1ab20b9"`);
        await queryRunner.query(`ALTER TABLE "achievement_progress" DROP CONSTRAINT "FK_20adca3c4217744bfd8a485e98d"`);
        await queryRunner.query(`ALTER TABLE "achievement_progress" DROP CONSTRAINT "FK_511e71a9dc5ec414e61e01bc583"`);
        await queryRunner.query(`ALTER TABLE "achievement_progress" DROP CONSTRAINT "FK_5e8224b47a68f9ccc31e1ed4f60"`);
        await queryRunner.query(`ALTER TABLE "achievement_activity" DROP CONSTRAINT "FK_8d50ca00e36fbd525982d475322"`);
        await queryRunner.query(`DROP TABLE "achievement"`);
        await queryRunner.query(`DROP TABLE "achievement_level"`);
        await queryRunner.query(`DROP TABLE "achievement_progress"`);
        await queryRunner.query(`DROP TABLE "achievement_activity"`);
    }

}
