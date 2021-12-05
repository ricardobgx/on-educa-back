import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveSchoolGradeFieldOfContent1638730110494 implements MigrationInterface {
    name = 'RemoveSchoolGradeFieldOfContent1638730110494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."content" DROP COLUMN "schoolGrade"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."content" ADD "schoolGrade" integer NOT NULL`);
    }

}
