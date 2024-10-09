import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnVendorCodeAndExpiryDateInUserTable1728372443954
  implements MigrationInterface
{
  name = 'AddColumnVendorCodeAndExpiryDateInUserTable1728372443954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`vendor_code\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`vendor_code_expiry\` timestamp NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`vendor_code_expiry\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`vendor_code\``,
    );
  }
}
