import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialEntities1632837506191 implements MigrationInterface {
    name = 'InitialEntities1632837506191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP CONSTRAINT "FK_96d2d4833ed229d8d2ce384d4cc"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP CONSTRAINT "FK_117b36dab2f0e7024eb5e8863b0"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" DROP CONSTRAINT "FK_a38d437d2959cc49f5d12e2435c"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" DROP CONSTRAINT "FK_329678d517ab363ac6f6827013d"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" DROP CONSTRAINT "FK_b6505396582d2aa239804d44ad3"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP CONSTRAINT "FK_128b81cd149d2e89848839976a8"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP CONSTRAINT "FK_f0bdb9c0c4fe8c23b20dadd7da6"`);
        await queryRunner.query(`ALTER TABLE "public"."content_review" DROP CONSTRAINT "FK_88f1dfe6c182255d987a60ce976"`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD CONSTRAINT "FK_96d2d4833ed229d8d2ce384d4cc" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD CONSTRAINT "FK_117b36dab2f0e7024eb5e8863b0" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" ADD CONSTRAINT "FK_a38d437d2959cc49f5d12e2435c" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" ADD CONSTRAINT "FK_329678d517ab363ac6f6827013d" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" ADD CONSTRAINT "FK_b6505396582d2aa239804d44ad3" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD CONSTRAINT "FK_128b81cd149d2e89848839976a8" FOREIGN KEY ("studentOneEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD CONSTRAINT "FK_f0bdb9c0c4fe8c23b20dadd7da6" FOREIGN KEY ("studentTwoEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."content_review" ADD CONSTRAINT "FK_88f1dfe6c182255d987a60ce976" FOREIGN KEY ("studentEmail") REFERENCES "student"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."content_review" DROP CONSTRAINT "FK_88f1dfe6c182255d987a60ce976"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP CONSTRAINT "FK_f0bdb9c0c4fe8c23b20dadd7da6"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" DROP CONSTRAINT "FK_128b81cd149d2e89848839976a8"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" DROP CONSTRAINT "FK_b6505396582d2aa239804d44ad3"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" DROP CONSTRAINT "FK_329678d517ab363ac6f6827013d"`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" DROP CONSTRAINT "FK_a38d437d2959cc49f5d12e2435c"`);
        await queryRunner.query(`ALTER TABLE "public"."duel" DROP CONSTRAINT "FK_117b36dab2f0e7024eb5e8863b0"`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" DROP CONSTRAINT "FK_96d2d4833ed229d8d2ce384d4cc"`);
        await queryRunner.query(`ALTER TABLE "public"."content_review" ADD CONSTRAINT "FK_88f1dfe6c182255d987a60ce976" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD CONSTRAINT "FK_f0bdb9c0c4fe8c23b20dadd7da6" FOREIGN KEY ("studentTwoEmail") REFERENCES "students"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_chat" ADD CONSTRAINT "FK_128b81cd149d2e89848839976a8" FOREIGN KEY ("studentOneEmail") REFERENCES "students"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_stud_message" ADD CONSTRAINT "FK_b6505396582d2aa239804d44ad3" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_chat" ADD CONSTRAINT "FK_329678d517ab363ac6f6827013d" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."stud_teach_message" ADD CONSTRAINT "FK_a38d437d2959cc49f5d12e2435c" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."duel" ADD CONSTRAINT "FK_117b36dab2f0e7024eb5e8863b0" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."doubt" ADD CONSTRAINT "FK_96d2d4833ed229d8d2ce384d4cc" FOREIGN KEY ("studentEmail") REFERENCES "students"("email") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
