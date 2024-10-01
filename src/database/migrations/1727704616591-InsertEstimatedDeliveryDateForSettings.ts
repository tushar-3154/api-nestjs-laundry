import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertEstimatedDeliveryDateForSettings1727704616591
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`settings\` (\`setting_key\`, \`setting_value\`) VALUES ('estimated_delivery_date', NOW())`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`settings\` WHERE \`setting_key\` = 'estimated_delivery_date'`,
    );
  }
}
