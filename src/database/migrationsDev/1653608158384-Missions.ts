import {MigrationInterface, QueryRunner} from "typeorm";

export class Missions1653608158384 implements MigrationInterface {
    name = 'Missions1653608158384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mission_activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "activity" character varying NOT NULL, "missionId" uuid, CONSTRAINT "PK_6fe15dbf29efb146ea6cc6b19dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "goal" integer NOT NULL, "isStudentMission" boolean NOT NULL, CONSTRAINT "PK_54f1391034bc7dd30666dee0d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mission_progress" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "progress" integer NOT NULL, "status" integer NOT NULL, "peopleId" uuid, "missionId" uuid, CONSTRAINT "PK_0667484709439992c15dcbae23f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mission_activity" ADD CONSTRAINT "FK_e388e5bfca6aa145fe2735193eb" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "mission_progress" ADD CONSTRAINT "FK_265e42a7a535f04af1e2bb8efe2" FOREIGN KEY ("peopleId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "mission_progress" ADD CONSTRAINT "FK_3538c7327f94a3fd8ea0b855eab" FOREIGN KEY ("missionId") REFERENCES "mission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mission_progress" DROP CONSTRAINT "FK_3538c7327f94a3fd8ea0b855eab"`);
        await queryRunner.query(`ALTER TABLE "mission_progress" DROP CONSTRAINT "FK_265e42a7a535f04af1e2bb8efe2"`);
        await queryRunner.query(`ALTER TABLE "mission_activity" DROP CONSTRAINT "FK_e388e5bfca6aa145fe2735193eb"`);
        await queryRunner.query(`DROP TABLE "mission_progress"`);
        await queryRunner.query(`DROP TABLE "mission"`);
        await queryRunner.query(`DROP TABLE "mission_activity"`);
    }

}
