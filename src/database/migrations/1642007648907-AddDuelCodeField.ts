import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDuelCodeField1642007648907 implements MigrationInterface {
    name = 'AddDuelCodeField1642007648907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD CONSTRAINT "UQ_d707d0af31625c5d9fc04d65634" UNIQUE ("code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP CONSTRAINT "UQ_d707d0af31625c5d9fc04d65634"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "code"`);
    }

}
