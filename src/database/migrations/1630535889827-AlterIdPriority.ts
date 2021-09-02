import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterIdPriority1630535889827 implements MigrationInterface {
    name = 'AlterIdPriority1630535889827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9" PRIMARY KEY ("id", "email")`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "PK_00634394dce7677d531749ed8e8"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "PK_5c0837a4bd45afb3ca779026d10" PRIMARY KEY ("id", "email")`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "PK_a56c051c91dbe1068ad683f536e"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "PK_78f0656779bd27e868856e6eb89" PRIMARY KEY ("id", "email")`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22" PRIMARY KEY ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9" PRIMARY KEY ("email", "id")`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "PK_5c0837a4bd45afb3ca779026d10"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "PK_00634394dce7677d531749ed8e8" PRIMARY KEY ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "PK_00634394dce7677d531749ed8e8"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "PK_5c0837a4bd45afb3ca779026d10" PRIMARY KEY ("email", "id")`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "PK_78f0656779bd27e868856e6eb89"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "PK_a56c051c91dbe1068ad683f536e" PRIMARY KEY ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "PK_a56c051c91dbe1068ad683f536e"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "PK_78f0656779bd27e868856e6eb89" PRIMARY KEY ("email", "id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "PK_78f0656779bd27e868856e6eb89"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "PK_a56c051c91dbe1068ad683f536e" PRIMARY KEY ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "PK_a56c051c91dbe1068ad683f536e"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "PK_78f0656779bd27e868856e6eb89" PRIMARY KEY ("id", "email")`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "PK_5c0837a4bd45afb3ca779026d10"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "PK_00634394dce7677d531749ed8e8" PRIMARY KEY ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "PK_00634394dce7677d531749ed8e8"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "PK_5c0837a4bd45afb3ca779026d10" PRIMARY KEY ("id", "email")`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22" PRIMARY KEY ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9" PRIMARY KEY ("id", "email")`);
        await queryRunner.query(`ALTER TABLE "public"."student" DROP CONSTRAINT "PK_78f0656779bd27e868856e6eb89"`);
        await queryRunner.query(`ALTER TABLE "public"."student" ADD CONSTRAINT "PK_a56c051c91dbe1068ad683f536e" PRIMARY KEY ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" DROP CONSTRAINT "PK_5c0837a4bd45afb3ca779026d10"`);
        await queryRunner.query(`ALTER TABLE "public"."teacher" ADD CONSTRAINT "PK_00634394dce7677d531749ed8e8" PRIMARY KEY ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."user" DROP CONSTRAINT "PK_95c07c16136adcfdcb8221c1fc9"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD CONSTRAINT "PK_e12875dfb3b1d92d7d7c5377e22" PRIMARY KEY ("email")`);
    }

}
