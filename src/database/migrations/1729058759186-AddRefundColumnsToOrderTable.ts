import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefundColumnsToOrderTable1729058759186
  implements MigrationInterface
{
  name = 'AddRefundColumnsToOrderTable1729058759186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`refund_amount\` decimal NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`refund_status\` int NOT NULL DEFAULT '3'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`refund_descriptions\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`refund_descriptions\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`refund_status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`refund_amount\``,
    );
  }
}
