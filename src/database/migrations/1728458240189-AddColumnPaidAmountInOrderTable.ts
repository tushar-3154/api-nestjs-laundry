import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnPaidAmountInOrderTable1728458240189
  implements MigrationInterface
{
  name = 'AddColumnPaidAmountInOrderTable1728458240189';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`paid_amount\` decimal NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`paid_amount\``,
    );
  }
}
