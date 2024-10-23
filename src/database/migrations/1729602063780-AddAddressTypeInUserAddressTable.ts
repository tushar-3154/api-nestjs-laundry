import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAddressTypeInUserAddressTable1729602063780
  implements MigrationInterface
{
  name = 'AddAddressTypeInUserAddressTable1729602063780';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_addresses\` ADD \`address_type\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user_addresses\` DROP COLUMN \`address_type\``,
    );
  }
}
