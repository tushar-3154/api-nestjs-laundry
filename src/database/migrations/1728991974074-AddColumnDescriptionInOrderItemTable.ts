import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnDescriptionInOrderItemTable1728991974074
  implements MigrationInterface
{
  name = 'AddColumnDescriptionInOrderItemTable1728991974074';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD \`description\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP COLUMN \`description\``,
    );
  }
}
