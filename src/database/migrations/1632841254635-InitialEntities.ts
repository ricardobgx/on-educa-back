import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialEntities1632841254635 implements MigrationInterface {
    name = 'InitialEntities1632841254635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "duel_students_student" ("duelId" uuid NOT NULL, "studentEmail" character varying NOT NULL, CONSTRAINT "PK_9f73f7481b1cf15cc00a37793b5" PRIMARY KEY ("duelId", "studentEmail"))`);
        await queryRunner.query(`CREATE INDEX "IDX_75ecde94f7707a5840b2f84836" ON "duel_students_student" ("duelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1cb6d826014d7a96dfef970d83" ON "duel_students_student" ("studentEmail") `);
        await queryRunner.query(`CREATE TABLE "interative_room_students_student" ("interativeRoomId" uuid NOT NULL, "studentEmail" character varying NOT NULL, CONSTRAINT "PK_3139c8098147b78a6519b48c601" PRIMARY KEY ("interativeRoomId", "studentEmail"))`);
        await queryRunner.query(`CREATE INDEX "IDX_775a6fcd97e1d308eaea34a8aa" ON "interative_room_students_student" ("interativeRoomId") `);
        await queryRunner.query(`CREATE INDEX "IDX_752d3dd7bdef2df8bf85b35efe" ON "interative_room_students_student" ("studentEmail") `);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD "studentEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD "studentEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" ADD "studentEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" ADD "studentEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" ADD "studentEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD "studentOneEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD "studentTwoEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."content_review" ADD "studentEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD CONSTRAINT "FK_96d2d4833ed229d8d2ce384d4cc" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD CONSTRAINT "FK_117b36dab2f0e7024eb5e8863b0" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" ADD CONSTRAINT "FK_a38d437d2959cc49f5d12e2435c" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" ADD CONSTRAINT "FK_329678d517ab363ac6f6827013d" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" ADD CONSTRAINT "FK_b6505396582d2aa239804d44ad3" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD CONSTRAINT "FK_128b81cd149d2e89848839976a8" FOREIGN KEY ("studentOneEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD CONSTRAINT "FK_f0bdb9c0c4fe8c23b20dadd7da6" FOREIGN KEY ("studentTwoEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."content_review" ADD CONSTRAINT "FK_88f1dfe6c182255d987a60ce976" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_students_student" ADD CONSTRAINT "FK_75ecde94f7707a5840b2f84836f" FOREIGN KEY ("duelId") REFERENCES "duel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "duel_students_student" ADD CONSTRAINT "FK_1cb6d826014d7a96dfef970d83b" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interative_room_students_student" ADD CONSTRAINT "FK_775a6fcd97e1d308eaea34a8aa9" FOREIGN KEY ("interativeRoomId") REFERENCES "interative_room"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "interative_room_students_student" ADD CONSTRAINT "FK_752d3dd7bdef2df8bf85b35efe7" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interative_room_students_student" DROP CONSTRAINT "FK_752d3dd7bdef2df8bf85b35efe7"`);
        await queryRunner.query(`ALTER TABLE "interative_room_students_student" DROP CONSTRAINT "FK_775a6fcd97e1d308eaea34a8aa9"`);
        await queryRunner.query(`ALTER TABLE "duel_students_student" DROP CONSTRAINT "FK_1cb6d826014d7a96dfef970d83b"`);
        await queryRunner.query(`ALTER TABLE "duel_students_student" DROP CONSTRAINT "FK_75ecde94f7707a5840b2f84836f"`);
        await queryRunner.query(`ALTER TABLE "public"."content_review" DROP CONSTRAINT "FK_88f1dfe6c182255d987a60ce976"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP CONSTRAINT "FK_f0bdb9c0c4fe8c23b20dadd7da6"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP CONSTRAINT "FK_128b81cd149d2e89848839976a8"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" DROP CONSTRAINT "FK_b6505396582d2aa239804d44ad3"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" DROP CONSTRAINT "FK_329678d517ab363ac6f6827013d"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" DROP CONSTRAINT "FK_a38d437d2959cc49f5d12e2435c"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP CONSTRAINT "FK_117b36dab2f0e7024eb5e8863b0"`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP CONSTRAINT "FK_96d2d4833ed229d8d2ce384d4cc"`);
        await queryRunner.query(`ALTER TABLE "public"."content_review" DROP COLUMN "studentEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP COLUMN "studentTwoEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP COLUMN "studentOneEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" DROP COLUMN "studentEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" DROP COLUMN "studentEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" DROP COLUMN "studentEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP COLUMN "studentEmail"`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP COLUMN "studentEmail"`);
        await queryRunner.query(`DROP INDEX "IDX_752d3dd7bdef2df8bf85b35efe"`);
        await queryRunner.query(`DROP INDEX "IDX_775a6fcd97e1d308eaea34a8aa"`);
        await queryRunner.query(`DROP TABLE "interative_room_students_student"`);
        await queryRunner.query(`DROP INDEX "IDX_1cb6d826014d7a96dfef970d83"`);
        await queryRunner.query(`DROP INDEX "IDX_75ecde94f7707a5840b2f84836"`);
        await queryRunner.query(`DROP TABLE "duel_students_student"`);
    }

}
