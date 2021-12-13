import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterReferenceStudentField1639312527357 implements MigrationInterface {
    name = 'AlterReferenceStudentField1639312527357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_dcc9a6fa13769727b2df315f5eb"`);
        await queryRunner.query(`ALTER TABLE "public"."student" RENAME COLUMN "teachingTypeId" TO "schoolGradeId"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "FK_6cc7822397ff3a38132cd582e58" FOREIGN KEY ("schoolGradeId") REFERENCES "school_grade"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "FK_6cc7822397ff3a38132cd582e58"`);
        await queryRunner.query(`ALTER TABLE "public"."student" RENAME COLUMN "schoolGradeId" TO "teachingTypeId"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "FK_dcc9a6fa13769727b2df315f5eb" FOREIGN KEY ("teachingTypeId") REFERENCES "teaching_type"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
