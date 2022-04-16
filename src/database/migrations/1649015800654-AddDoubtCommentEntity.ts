import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDoubtCommentEntity1649015800654 implements MigrationInterface {
    name = 'AddDoubtCommentEntity1649015800654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doubt_comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "peopleId" uuid, "doubtId" uuid, CONSTRAINT "PK_49ef32b8ae2d1917dfc85a497ae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "doubt_comment" ADD CONSTRAINT "FK_a8a0d53aa7b7f61371b672c69c5" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "doubt_comment" ADD CONSTRAINT "FK_b15cc2320953bc3b20fffe56610" FOREIGN KEY ("doubtId") REFERENCES "doubt"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doubt_comment" DROP CONSTRAINT "FK_b15cc2320953bc3b20fffe56610"`);
        await queryRunner.query(`ALTER TABLE "doubt_comment" DROP CONSTRAINT "FK_a8a0d53aa7b7f61371b672c69c5"`);
        await queryRunner.query(`DROP TABLE "doubt_comment"`);
    }

}
