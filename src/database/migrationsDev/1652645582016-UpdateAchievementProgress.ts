import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAchievementProgress1652645582016 implements MigrationInterface {
    name = 'UpdateAchievementProgress1652645582016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."achievement_progress" ADD "achievementId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."achievement_progress" ADD CONSTRAINT "FK_20adca3c4217744bfd8a485e98d" FOREIGN KEY ("achievementId") REFERENCES "achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."achievement_progress" DROP CONSTRAINT "FK_20adca3c4217744bfd8a485e98d"`);
        await queryRunner.query(`ALTER TABLE "public"."achievement_progress" DROP COLUMN "achievementId"`);
    }

}
