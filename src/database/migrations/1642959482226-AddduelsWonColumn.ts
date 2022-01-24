import {MigrationInterface, QueryRunner} from "typeorm";

export class AddduelsWonColumn1642959482226 implements MigrationInterface {
    name = 'AddduelsWonColumn1642959482226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_day_performance" ADD "duelsWon" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student_week_day_performance" DROP COLUMN "duelsWon"`);
    }

}
