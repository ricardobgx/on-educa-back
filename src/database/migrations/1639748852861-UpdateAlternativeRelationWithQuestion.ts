import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateAlternativeRelationWithQuestion1639748852861 implements MigrationInterface {
    name = 'UpdateAlternativeRelationWithQuestion1639748852861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."content" DROP CONSTRAINT "FK_d553a9a07bbb76b508eb19f2b0f"`);
        await queryRunner.query(`ALTER TABLE "public"."question" ADD "rightAlternativeId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."question" ADD CONSTRAINT "UQ_1816486b8bdfb8eef8d49c57dd3" UNIQUE ("rightAlternativeId")`);
        await queryRunner.query(`ALTER TABLE "public"."question" ADD CONSTRAINT "FK_1816486b8bdfb8eef8d49c57dd3" FOREIGN KEY ("rightAlternativeId") REFERENCES "alternative"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."content" ADD CONSTRAINT "FK_d553a9a07bbb76b508eb19f2b0f" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."content" DROP CONSTRAINT "FK_d553a9a07bbb76b508eb19f2b0f"`);
        await queryRunner.query(`ALTER TABLE "public"."question" DROP CONSTRAINT "FK_1816486b8bdfb8eef8d49c57dd3"`);
        await queryRunner.query(`ALTER TABLE "public"."question" DROP CONSTRAINT "UQ_1816486b8bdfb8eef8d49c57dd3"`);
        await queryRunner.query(`ALTER TABLE "public"."question" DROP COLUMN "rightAlternativeId"`);
        await queryRunner.query(`ALTER TABLE "public"."content" ADD CONSTRAINT "FK_d553a9a07bbb76b508eb19f2b0f" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
