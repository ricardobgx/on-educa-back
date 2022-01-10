import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserTypeFieldInUser1641819335021 implements MigrationInterface {
    name = 'AddUserTypeFieldInUser1641819335021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."duel_round" ADD "status" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "userType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD "userType" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD "userType" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "userType"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP COLUMN "userType"`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "userType"`);
        await queryRunner.query(`ALTER TABLE "public"."duel_round" DROP COLUMN "status"`);
    }

}
