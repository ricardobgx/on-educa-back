import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialEntities1632840649669 implements MigrationInterface {
    name = 'InitialEntities1632840649669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, "contentId" uuid, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "content_review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_76988fae19e2a3d89ba01bde674" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doubt" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "status" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL, "contentId" uuid, CONSTRAINT "PK_8f23d800a75d09d4e139a40b998" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "interative_room" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "teacherEmail" character varying, CONSTRAINT "PK_902f9a56045e9dad97c2ccd5929" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" character varying NOT NULL, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stud_teach_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" character varying NOT NULL, "chatId" integer, CONSTRAINT "PK_3a9438a29a4224580bf266d5cfd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teach_stud_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" character varying NOT NULL, "chatId" integer, "teacherEmail" character varying, CONSTRAINT "PK_b4b9d3a98b8efa33f4984733323" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stud_teach_chat" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "teacherEmail" character varying, CONSTRAINT "PK_58cf3973983b8def64d482c57de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teach_teach_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" character varying NOT NULL, "teacherEmail" character varying, "chatId" integer, CONSTRAINT "PK_5b4415a7cf10ce743bf4223e665" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teach_teach_chat" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "teacherOneEmail" character varying, "teacherTwoEmail" character varying, CONSTRAINT "PK_c71249298bfabf98570d00aaaaf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("email" character varying NOT NULL, "name" character varying NOT NULL, "profilePicture" character varying NOT NULL, "password" character varying NOT NULL, "isOnline" boolean NOT NULL, CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("email" character varying NOT NULL, "name" character varying NOT NULL, "profilePicture" character varying NOT NULL, "password" character varying NOT NULL, "isOnline" boolean NOT NULL, CONSTRAINT "PK_00634394dce7677d531749ed8e8" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "subject" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_d011c391e37d9a5e63e8b04c977" UNIQUE ("name"), CONSTRAINT "PK_12eee115462e38d62e5455fc054" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "content" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "video" character varying NOT NULL, "schoolGrade" integer NOT NULL, "index" integer NOT NULL, "subjectId" uuid, "teacherEmail" character varying, CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "duel" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "maxGroupParts" integer NOT NULL, CONSTRAINT "PK_1575a4255b3bdf1f11398841d0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "difficulty" integer NOT NULL, "index" character varying NOT NULL, "contentId" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alternative" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "index" integer NOT NULL, "questionId" uuid, CONSTRAINT "PK_93e717011957def707e61de0723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("email" character varying NOT NULL, "name" character varying NOT NULL, "profilePicture" character varying NOT NULL, "password" character varying NOT NULL, "isOnline" boolean NOT NULL, "schoolGrade" integer NOT NULL, CONSTRAINT "PK_a56c051c91dbe1068ad683f536e" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "stud_stud_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" character varying NOT NULL, "chatId" integer, CONSTRAINT "PK_fad5982a7786ffc9c8cbb80c4b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stud_stud_chat" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_ffdaab2f1e6632119ccef28ff4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "content_review_contents_content" ("contentReviewId" uuid NOT NULL, "contentId" uuid NOT NULL, CONSTRAINT "PK_5b937c7da8baa45aeefb6622e03" PRIMARY KEY ("contentReviewId", "contentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_087fe9fdd8e15ce9ae3221f0ba" ON "content_review_contents_content" ("contentReviewId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d148cfdb8c8da174a641df0931" ON "content_review_contents_content" ("contentId") `);
        await queryRunner.query(`CREATE TABLE "interative_room_teachers_teacher" ("interativeRoomId" uuid NOT NULL, "teacherEmail" character varying NOT NULL, CONSTRAINT "PK_d09890f1ce49e9090a1bd59fa99" PRIMARY KEY ("interativeRoomId", "teacherEmail"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99247eb0d041dac5dff873ce1b" ON "interative_room_teachers_teacher" ("interativeRoomId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9480785f6c33f11d6a8e257d34" ON "interative_room_teachers_teacher" ("teacherEmail") `);
        await queryRunner.query(`CREATE TABLE "interative_room_questions_question" ("interativeRoomId" uuid NOT NULL, "questionId" uuid NOT NULL, CONSTRAINT "PK_63549b7b8ce48e6d5fc4bc69fb2" PRIMARY KEY ("interativeRoomId", "questionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4e2cd85136840150f6fc367459" ON "interative_room_questions_question" ("interativeRoomId") `);
        await queryRunner.query(`CREATE INDEX "IDX_6c7221dde585ad26b925e2f4ee" ON "interative_room_questions_question" ("questionId") `);
        await queryRunner.query(`CREATE TABLE "subject_teachers_teacher" ("subjectId" uuid NOT NULL, "teacherEmail" character varying NOT NULL, CONSTRAINT "PK_79263761d392baf82aef9034f96" PRIMARY KEY ("subjectId", "teacherEmail"))`);
        await queryRunner.query(`CREATE INDEX "IDX_145dd9504ff5a5075c2c1f0c3e" ON "subject_teachers_teacher" ("subjectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ecc74beadd0eea8dcd0eac02c0" ON "subject_teachers_teacher" ("teacherEmail") `);
        await queryRunner.query(`CREATE TABLE "duel_questions_question" ("duelId" uuid NOT NULL, "questionId" uuid NOT NULL, CONSTRAINT "PK_a46619ab722b931ff8da8606f54" PRIMARY KEY ("duelId", "questionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_422be4edd69d21b67cde6c379d" ON "duel_questions_question" ("duelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8181c4d50660730da4802f3fd2" ON "duel_questions_question" ("questionId") `);
        await queryRunner.query(`ALTER TABLE "attachment" ADD CONSTRAINT "FK_bba44fec71adc588b9f4136105f" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "doubt" ADD CONSTRAINT "FK_24a6551ef4d2649af7a387941b6" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "interative_room" ADD CONSTRAINT "FK_2dc093b788b5a6009ba6900efcd" FOREIGN KEY ("teacherEmail") REFERENCES "teacher"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stud_teach_message" ADD CONSTRAINT "FK_531b6bd6ea9096ffb588f44faf3" FOREIGN KEY ("chatId") REFERENCES "stud_teach_chat"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teach_stud_message" ADD CONSTRAINT "FK_55be4f8374eb9650f5a513e62d3" FOREIGN KEY ("chatId") REFERENCES "stud_teach_chat"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teach_stud_message" ADD CONSTRAINT "FK_986d5feaeb041e4e21cfd5cc32a" FOREIGN KEY ("teacherEmail") REFERENCES "teacher"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stud_teach_chat" ADD CONSTRAINT "FK_0d3de85033575dd2ca79966171d" FOREIGN KEY ("teacherEmail") REFERENCES "teacher"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teach_teach_message" ADD CONSTRAINT "FK_5e0c388486b060085fcadf10cf7" FOREIGN KEY ("teacherEmail") REFERENCES "teacher"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teach_teach_message" ADD CONSTRAINT "FK_779143e45ba9a5401ec311432e1" FOREIGN KEY ("chatId") REFERENCES "teach_teach_chat"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teach_teach_chat" ADD CONSTRAINT "FK_95cedd024b17c6ac63e50f519d6" FOREIGN KEY ("teacherOneEmail") REFERENCES "teacher"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teach_teach_chat" ADD CONSTRAINT "FK_56f057aff7332751ab9fde01e7f" FOREIGN KEY ("teacherTwoEmail") REFERENCES "teacher"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_aca2d12589a8580b96b9d4dd76a" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_02b51c7f1f531facdc997e846d2" FOREIGN KEY ("teacherEmail") REFERENCES "teacher"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_f7cc42568ef88190783fbaf4274" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "alternative" ADD CONSTRAINT "FK_987e598dc6447a20fa182141434" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stud_stud_message" ADD CONSTRAINT "FK_867a6c29465030d75779287e82b" FOREIGN KEY ("chatId") REFERENCES "stud_stud_chat"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "content_review_contents_content" ADD CONSTRAINT "FK_087fe9fdd8e15ce9ae3221f0ba0" FOREIGN KEY ("contentReviewId") REFERENCES "content_review"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "content_review_contents_content" ADD CONSTRAINT "FK_d148cfdb8c8da174a641df09319" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "interative_room_teachers_teacher" ADD CONSTRAINT "FK_99247eb0d041dac5dff873ce1bb" FOREIGN KEY ("interativeRoomId") REFERENCES "interative_room"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "interative_room_teachers_teacher" ADD CONSTRAINT "FK_9480785f6c33f11d6a8e257d341" FOREIGN KEY ("teacherEmail") REFERENCES "teacher"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "interative_room_questions_question" ADD CONSTRAINT "FK_4e2cd85136840150f6fc3674594" FOREIGN KEY ("interativeRoomId") REFERENCES "interative_room"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "interative_room_questions_question" ADD CONSTRAINT "FK_6c7221dde585ad26b925e2f4ee8" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subject_teachers_teacher" ADD CONSTRAINT "FK_145dd9504ff5a5075c2c1f0c3e4" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subject_teachers_teacher" ADD CONSTRAINT "FK_ecc74beadd0eea8dcd0eac02c04" FOREIGN KEY ("teacherEmail") REFERENCES "teacher"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_questions_question" ADD CONSTRAINT "FK_422be4edd69d21b67cde6c379d8" FOREIGN KEY ("duelId") REFERENCES "duel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_questions_question" ADD CONSTRAINT "FK_8181c4d50660730da4802f3fd2f" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "duel_questions_question" DROP CONSTRAINT "FK_8181c4d50660730da4802f3fd2f"`);
        await queryRunner.query(`ALTER TABLE "duel_questions_question" DROP CONSTRAINT "FK_422be4edd69d21b67cde6c379d8"`);
        await queryRunner.query(`ALTER TABLE "subject_teachers_teacher" DROP CONSTRAINT "FK_ecc74beadd0eea8dcd0eac02c04"`);
        await queryRunner.query(`ALTER TABLE "subject_teachers_teacher" DROP CONSTRAINT "FK_145dd9504ff5a5075c2c1f0c3e4"`);
        await queryRunner.query(`ALTER TABLE "interative_room_questions_question" DROP CONSTRAINT "FK_6c7221dde585ad26b925e2f4ee8"`);
        await queryRunner.query(`ALTER TABLE "interative_room_questions_question" DROP CONSTRAINT "FK_4e2cd85136840150f6fc3674594"`);
        await queryRunner.query(`ALTER TABLE "interative_room_teachers_teacher" DROP CONSTRAINT "FK_9480785f6c33f11d6a8e257d341"`);
        await queryRunner.query(`ALTER TABLE "interative_room_teachers_teacher" DROP CONSTRAINT "FK_99247eb0d041dac5dff873ce1bb"`);
        await queryRunner.query(`ALTER TABLE "content_review_contents_content" DROP CONSTRAINT "FK_d148cfdb8c8da174a641df09319"`);
        await queryRunner.query(`ALTER TABLE "content_review_contents_content" DROP CONSTRAINT "FK_087fe9fdd8e15ce9ae3221f0ba0"`);
        await queryRunner.query(`ALTER TABLE "stud_stud_message" DROP CONSTRAINT "FK_867a6c29465030d75779287e82b"`);
        await queryRunner.query(`ALTER TABLE "alternative" DROP CONSTRAINT "FK_987e598dc6447a20fa182141434"`);
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_f7cc42568ef88190783fbaf4274"`);
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_02b51c7f1f531facdc997e846d2"`);
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_aca2d12589a8580b96b9d4dd76a"`);
        await queryRunner.query(`ALTER TABLE "teach_teach_chat" DROP CONSTRAINT "FK_56f057aff7332751ab9fde01e7f"`);
        await queryRunner.query(`ALTER TABLE "teach_teach_chat" DROP CONSTRAINT "FK_95cedd024b17c6ac63e50f519d6"`);
        await queryRunner.query(`ALTER TABLE "teach_teach_message" DROP CONSTRAINT "FK_779143e45ba9a5401ec311432e1"`);
        await queryRunner.query(`ALTER TABLE "teach_teach_message" DROP CONSTRAINT "FK_5e0c388486b060085fcadf10cf7"`);
        await queryRunner.query(`ALTER TABLE "stud_teach_chat" DROP CONSTRAINT "FK_0d3de85033575dd2ca79966171d"`);
        await queryRunner.query(`ALTER TABLE "teach_stud_message" DROP CONSTRAINT "FK_986d5feaeb041e4e21cfd5cc32a"`);
        await queryRunner.query(`ALTER TABLE "teach_stud_message" DROP CONSTRAINT "FK_55be4f8374eb9650f5a513e62d3"`);
        await queryRunner.query(`ALTER TABLE "stud_teach_message" DROP CONSTRAINT "FK_531b6bd6ea9096ffb588f44faf3"`);
        await queryRunner.query(`ALTER TABLE "interative_room" DROP CONSTRAINT "FK_2dc093b788b5a6009ba6900efcd"`);
        await queryRunner.query(`ALTER TABLE "doubt" DROP CONSTRAINT "FK_24a6551ef4d2649af7a387941b6"`);
        await queryRunner.query(`ALTER TABLE "attachment" DROP CONSTRAINT "FK_bba44fec71adc588b9f4136105f"`);
        await queryRunner.query(`DROP INDEX "IDX_8181c4d50660730da4802f3fd2"`);
        await queryRunner.query(`DROP INDEX "IDX_422be4edd69d21b67cde6c379d"`);
        await queryRunner.query(`DROP TABLE "duel_questions_question"`);
        await queryRunner.query(`DROP INDEX "IDX_ecc74beadd0eea8dcd0eac02c0"`);
        await queryRunner.query(`DROP INDEX "IDX_145dd9504ff5a5075c2c1f0c3e"`);
        await queryRunner.query(`DROP TABLE "subject_teachers_teacher"`);
        await queryRunner.query(`DROP INDEX "IDX_6c7221dde585ad26b925e2f4ee"`);
        await queryRunner.query(`DROP INDEX "IDX_4e2cd85136840150f6fc367459"`);
        await queryRunner.query(`DROP TABLE "interative_room_questions_question"`);
        await queryRunner.query(`DROP INDEX "IDX_9480785f6c33f11d6a8e257d34"`);
        await queryRunner.query(`DROP INDEX "IDX_99247eb0d041dac5dff873ce1b"`);
        await queryRunner.query(`DROP TABLE "interative_room_teachers_teacher"`);
        await queryRunner.query(`DROP INDEX "IDX_d148cfdb8c8da174a641df0931"`);
        await queryRunner.query(`DROP INDEX "IDX_087fe9fdd8e15ce9ae3221f0ba"`);
        await queryRunner.query(`DROP TABLE "content_review_contents_content"`);
        await queryRunner.query(`DROP TABLE "stud_stud_chat"`);
        await queryRunner.query(`DROP TABLE "stud_stud_message"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "alternative"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "duel"`);
        await queryRunner.query(`DROP TABLE "content"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "teach_teach_chat"`);
        await queryRunner.query(`DROP TABLE "teach_teach_message"`);
        await queryRunner.query(`DROP TABLE "stud_teach_chat"`);
        await queryRunner.query(`DROP TABLE "teach_stud_message"`);
        await queryRunner.query(`DROP TABLE "stud_teach_message"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "interative_room"`);
        await queryRunner.query(`DROP TABLE "doubt"`);
        await queryRunner.query(`DROP TABLE "content_review"`);
        await queryRunner.query(`DROP TABLE "attachment"`);
    }

}
