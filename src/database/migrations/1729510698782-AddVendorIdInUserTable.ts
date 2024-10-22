import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVendorIdInUserTable1729510698782 implements MigrationInterface {
  name = 'AddVendorIdInUserTable1729510698782';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`vendor_id\` int NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`vendor_id\``);
  }
}
