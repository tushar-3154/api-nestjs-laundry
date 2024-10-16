import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnDescriptionInOrderItemTable1729053936849
  implements MigrationInterface
{
  name = 'AddColumnDescriptionInOrderItemTable1729053936849';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD \`description\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP COLUMN \`description\``,
    );
  }
}
