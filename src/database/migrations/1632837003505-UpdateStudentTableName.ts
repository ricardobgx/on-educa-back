import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateStudentTableName1632837003505 implements MigrationInterface {
    name = 'UpdateStudentTableName1632837003505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP CONSTRAINT "FK_96d2d4833ed229d8d2ce384d4cc"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP CONSTRAINT "FK_117b36dab2f0e7024eb5e8863b0"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" DROP CONSTRAINT "FK_a38d437d2959cc49f5d12e2435c"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" DROP CONSTRAINT "FK_329678d517ab363ac6f6827013d"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" DROP CONSTRAINT "FK_b6505396582d2aa239804d44ad3"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP CONSTRAINT "FK_128b81cd149d2e89848839976a8"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP CONSTRAINT "FK_f0bdb9c0c4fe8c23b20dadd7da6"`);
        await queryRunner.query(`ALTER TABLE "public"."content_review" DROP CONSTRAINT "FK_88f1dfe6c182255d987a60ce976"`);
        await queryRunner.query(`CREATE TABLE "users" ("email" character varying NOT NULL, "name" character varying NOT NULL, "profilePicture" character varying NOT NULL, "password" character varying NOT NULL, "isOnline" boolean NOT NULL, CONSTRAINT "PK_97672ac88f789774dd47f7c8be3" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "students" ("email" character varying NOT NULL, "name" character varying NOT NULL, "profilePicture" character varying NOT NULL, "password" character varying NOT NULL, "isOnline" boolean NOT NULL, "schoolGrade" integer NOT NULL, CONSTRAINT "PK_25985d58c714a4a427ced57507b" PRIMARY KEY ("email"))`);
        await queryRunner.query(`CREATE TABLE "duel_students_students" ("duelId" uuid NOT NULL, "studentsEmail" character varying NOT NULL, CONSTRAINT "PK_489960e0b28eb35b8d2cbcdc4d8" PRIMARY KEY ("duelId", "studentsEmail"))`);
        await queryRunner.query(`CREATE INDEX "IDX_187bd89d57356ae1c1621adf72" ON "duel_students_students" ("duelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_96d5b20995cfb39c23f9257f6c" ON "duel_students_students" ("studentsEmail") `);
        await queryRunner.query(`CREATE TABLE "interative_room_students_students" ("interativeRoomId" uuid NOT NULL, "studentsEmail" character varying NOT NULL, CONSTRAINT "PK_0aeda6f9bfa69249e71092e58a5" PRIMARY KEY ("interativeRoomId", "studentsEmail"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5609df1ad0c431380a9fcc328a" ON "interative_room_students_students" ("interativeRoomId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f473cc8c23575066e1cc1c03f" ON "interative_room_students_students" ("studentsEmail") `);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD CONSTRAINT "FK_96d2d4833ed229d8d2ce384d4cc" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD CONSTRAINT "FK_117b36dab2f0e7024eb5e8863b0" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" ADD CONSTRAINT "FK_a38d437d2959cc49f5d12e2435c" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" ADD CONSTRAINT "FK_329678d517ab363ac6f6827013d" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" ADD CONSTRAINT "FK_b6505396582d2aa239804d44ad3" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD CONSTRAINT "FK_128b81cd149d2e89848839976a8" FOREIGN KEY ("studentOneEmail") REFERENCES "students"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD CONSTRAINT "FK_f0bdb9c0c4fe8c23b20dadd7da6" FOREIGN KEY ("studentTwoEmail") REFERENCES "students"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."content_review" ADD CONSTRAINT "FK_88f1dfe6c182255d987a60ce976" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_students_students" ADD CONSTRAINT "FK_187bd89d57356ae1c1621adf728" FOREIGN KEY ("duelId") REFERENCES "duel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_students_students" ADD CONSTRAINT "FK_96d5b20995cfb39c23f9257f6ca" FOREIGN KEY ("studentsEmail") REFERENCES "students"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "interative_room_students_students" ADD CONSTRAINT "FK_5609df1ad0c431380a9fcc328ae" FOREIGN KEY ("interativeRoomId") REFERENCES "interative_room"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "interative_room_students_students" ADD CONSTRAINT "FK_3f473cc8c23575066e1cc1c03fa" FOREIGN KEY ("studentsEmail") REFERENCES "students"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interative_room_students_students" DROP CONSTRAINT "FK_3f473cc8c23575066e1cc1c03fa"`);
        await queryRunner.query(`ALTER TABLE "interative_room_students_students" DROP CONSTRAINT "FK_5609df1ad0c431380a9fcc328ae"`);
        await queryRunner.query(`ALTER TABLE "duel_students_students" DROP CONSTRAINT "FK_96d5b20995cfb39c23f9257f6ca"`);
        await queryRunner.query(`ALTER TABLE "duel_students_students" DROP CONSTRAINT "FK_187bd89d57356ae1c1621adf728"`);
        await queryRunner.query(`ALTER TABLE "public"."content_review" DROP CONSTRAINT "FK_88f1dfe6c182255d987a60ce976"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP CONSTRAINT "FK_f0bdb9c0c4fe8c23b20dadd7da6"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP CONSTRAINT "FK_128b81cd149d2e89848839976a8"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" DROP CONSTRAINT "FK_b6505396582d2aa239804d44ad3"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" DROP CONSTRAINT "FK_329678d517ab363ac6f6827013d"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" DROP CONSTRAINT "FK_a38d437d2959cc49f5d12e2435c"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP CONSTRAINT "FK_117b36dab2f0e7024eb5e8863b0"`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP CONSTRAINT "FK_96d2d4833ed229d8d2ce384d4cc"`);
        await queryRunner.query(`DROP INDEX "IDX_3f473cc8c23575066e1cc1c03f"`);
        await queryRunner.query(`DROP INDEX "IDX_5609df1ad0c431380a9fcc328a"`);
        await queryRunner.query(`DROP TABLE "interative_room_students_students"`);
        await queryRunner.query(`DROP INDEX "IDX_96d5b20995cfb39c23f9257f6c"`);
        await queryRunner.query(`DROP INDEX "IDX_187bd89d57356ae1c1621adf72"`);
        await queryRunner.query(`DROP TABLE "duel_students_students"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "public"."content_review" ADD CONSTRAINT "FK_88f1dfe6c182255d987a60ce976" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD CONSTRAINT "FK_f0bdb9c0c4fe8c23b20dadd7da6" FOREIGN KEY ("studentTwoEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD CONSTRAINT "FK_128b81cd149d2e89848839976a8" FOREIGN KEY ("studentOneEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" ADD CONSTRAINT "FK_b6505396582d2aa239804d44ad3" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" ADD CONSTRAINT "FK_329678d517ab363ac6f6827013d" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" ADD CONSTRAINT "FK_a38d437d2959cc49f5d12e2435c" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD CONSTRAINT "FK_117b36dab2f0e7024eb5e8863b0" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD CONSTRAINT "FK_96d2d4833ed229d8d2ce384d4cc" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
