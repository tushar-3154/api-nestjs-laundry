import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAddressTitleInAddressUserTable1729505988876
  implements MigrationInterface
{
  name = 'AddAddressTitleInAddressUserTable1729505988876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_addresses\` ADD \`address_title\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_addresses\` DROP COLUMN \`address_title\``,
    );
  }
}
