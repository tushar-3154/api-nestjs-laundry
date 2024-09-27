import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedByCustomerOrderToOrder1727430530970
  implements MigrationInterface
{
  name = 'AddCreatedByCustomerOrderToOrder1727430530970';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`created_by_customer_order\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`created_by_customer_order\``,
    );
  }
}
