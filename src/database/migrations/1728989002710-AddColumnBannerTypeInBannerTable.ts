import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnBannerTypeInBannerTable1728989002710
  implements MigrationInterface
{
  name = 'AddColumnBannerTypeInBannerTable1728989002710';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`banners\` ADD \`banner_type\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`banners\` DROP COLUMN \`banner_type\``,
    );
  }
}
