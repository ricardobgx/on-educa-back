import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEntities1644868885962 implements MigrationInterface {
    name = 'UpdateEntities1644868885962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "public"."message" DROP COLUMN "chatId"`);
        await queryRunner.query(`ALTER TABLE "public"."message" ADD "chatId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."chat" DROP CONSTRAINT "PK_9d0b2ba74336710fd31154738a5"`);
        await queryRunner.query(`ALTER TABLE "public"."chat" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."chat" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."chat" ADD CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "public"."message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."message" DROP CONSTRAINT "FK_619bc7b78eba833d2044153bacc"`);
        await queryRunner.query(`ALTER TABLE "public"."chat" DROP CONSTRAINT "PK_9d0b2ba74336710fd31154738a5"`);
        await queryRunner.query(`ALTER TABLE "public"."chat" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."chat" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."chat" ADD CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "public"."message" DROP COLUMN "chatId"`);
        await queryRunner.query(`ALTER TABLE "public"."message" ADD "chatId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."message" ADD CONSTRAINT "FK_619bc7b78eba833d2044153bacc" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
