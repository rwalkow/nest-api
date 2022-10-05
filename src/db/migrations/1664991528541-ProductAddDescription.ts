import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductAddDescription1664991528541 implements MigrationInterface {
    name = 'ProductAddDescription1664991528541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`user_addresses\` DROP FOREIGN KEY \`FK_781afdedafe920f331f6229cb62\``);
        await queryRunner.query(`ALTER TABLE \`user_addresses\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_addresses\` ADD CONSTRAINT \`FK_781afdedafe920f331f6229cb62\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_addresses\` DROP FOREIGN KEY \`FK_781afdedafe920f331f6229cb62\``);
        await queryRunner.query(`ALTER TABLE \`user_addresses\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_addresses\` ADD CONSTRAINT \`FK_781afdedafe920f331f6229cb62\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
    }

}
