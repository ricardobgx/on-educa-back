import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1630535324977 implements MigrationInterface {
    name = 'InitialMigration1630535324977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attachment" ("id" character varying NOT NULL, "name" character varying NOT NULL, "link" character varying NOT NULL, "contentId" character varying, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "photo" character varying NOT NULL, "password" character varying NOT NULL, "isOnline" boolean NOT NULL, CONSTRAINT "UQ_cace4a159ff9f2512dd42373760" UNIQUE ("id"), CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "photo" character varying NOT NULL, "password" character varying NOT NULL, "isOnline" boolean NOT NULL, CONSTRAINT "UQ_2f807294148612a9751dacf1026" UNIQUE ("id"), CONSTRAINT "PK_00634394dce7677d531749ed8e8" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" character varying NOT NULL, "nome" character varying NOT NULL, "contentsId" character varying, CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "content" ("id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "video" character varying NOT NULL, "schoolGrade" integer NOT NULL, "index" integer NOT NULL, "subjectId" character varying, CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" character varying NOT NULL, "description" character varying NOT NULL, "index" integer NOT NULL, "difficulty" integer NOT NULL, "contentId" character varying, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alternative" ("id" character varying NOT NULL, "description" character varying NOT NULL, "index" character varying NOT NULL, "questionId" character varying, CONSTRAINT "PK_93e717011957def707e61de0723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "photo" character varying NOT NULL, "password" character varying NOT NULL, "isOnline" boolean NOT NULL, "schoolGrade" integer NOT NULL, CONSTRAINT "UQ_3d8016e1cb58429474a3c041904" UNIQUE ("id"), CONSTRAINT "PK_a56c051c91dbe1068ad683f536e" PRIMARY KEY ("email"))`);
        await queryRunner.query(`ALTER TABLE "attachment" ADD CONSTRAINT "FK_bba44fec71adc588b9f4136105f" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subject" ADD CONSTRAINT "FK_3343b8cf6c4e88d8db417396b30" FOREIGN KEY ("contentsId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_aca2d12589a8580b96b9d4dd76a" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_f7cc42568ef88190783fbaf4274" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "alternative" ADD CONSTRAINT "FK_987e598dc6447a20fa182141434" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alternative" DROP CONSTRAINT "FK_987e598dc6447a20fa182141434"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_f7cc42568ef88190783fbaf4274"`);
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_aca2d12589a8580b96b9d4dd76a"`);
        await queryRunner.query(`ALTER TABLE "subject" DROP CONSTRAINT "FK_3343b8cf6c4e88d8db417396b30"`);
        await queryRunner.query(`ALTER TABLE "attachment" DROP CONSTRAINT "FK_bba44fec71adc588b9f4136105f"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "alternative"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "content"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "attachment"`);
    }

}
