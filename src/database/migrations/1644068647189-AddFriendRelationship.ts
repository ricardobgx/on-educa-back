import {MigrationInterface, QueryRunner} from "typeorm";

export class AddFriendRelationship1644068647189 implements MigrationInterface {
    name = 'AddFriendRelationship1644068647189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people_friends_people" ("peopleId_1" uuid NOT NULL, "peopleId_2" uuid NOT NULL, CONSTRAINT "PK_e12f1654d49f757af914945bdc7" PRIMARY KEY ("peopleId_1", "peopleId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_89cb432e9b8db89d1ac4295099" ON "people_friends_people" ("peopleId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_9e799fc7d03a2b262bdc845d54" ON "people_friends_people" ("peopleId_2") `);
        await queryRunner.query(`ALTER TABLE "people_friends_people" ADD CONSTRAINT "FK_89cb432e9b8db89d1ac42950991" FOREIGN KEY ("peopleId_1") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "people_friends_people" ADD CONSTRAINT "FK_9e799fc7d03a2b262bdc845d54f" FOREIGN KEY ("peopleId_2") REFERENCES "people"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people_friends_people" DROP CONSTRAINT "FK_9e799fc7d03a2b262bdc845d54f"`);
        await queryRunner.query(`ALTER TABLE "people_friends_people" DROP CONSTRAINT "FK_89cb432e9b8db89d1ac42950991"`);
        await queryRunner.query(`DROP INDEX "IDX_9e799fc7d03a2b262bdc845d54"`);
        await queryRunner.query(`DROP INDEX "IDX_89cb432e9b8db89d1ac4295099"`);
        await queryRunner.query(`DROP TABLE "people_friends_people"`);
    }

}
