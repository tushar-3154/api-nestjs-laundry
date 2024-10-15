import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeCouponTableColumnType1728909247940
  implements MigrationInterface
{
  name = 'ChangeCouponTableColumnType1728909247940';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupons\` DROP COLUMN \`discount_value\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`coupons\` ADD \`discount_value\` float NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`coupons\` DROP COLUMN \`discount_value\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`coupons\` ADD \`discount_value\` decimal NOT NULL`,
    );
  }
}
