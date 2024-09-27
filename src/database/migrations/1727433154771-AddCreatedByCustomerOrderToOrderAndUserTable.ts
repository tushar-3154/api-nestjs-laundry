import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedByCustomerOrderToOrderAndUserTable1727433154771
  implements MigrationInterface
{
  name = 'AddCreatedByCustomerOrderToOrderAndUserTable1727433154771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`created_by_user_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`created_by_user_id\` int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`created_by_user_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`created_by_user_id\``,
    );
  }
}
