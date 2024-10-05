import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnQuantityInOrderItemTable1727933985449
  implements MigrationInterface
{
  name = 'AddColumnQuantityInOrderItemTable1727933985449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD \`quantity\` int NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP COLUMN \`quantity\``,
    );
  }
}
