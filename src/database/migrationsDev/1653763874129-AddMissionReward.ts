import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMissionReward1653763874129 implements MigrationInterface {
    name = 'AddMissionReward1653763874129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."mission" ADD "reward" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."mission" DROP COLUMN "reward"`);
    }

}
