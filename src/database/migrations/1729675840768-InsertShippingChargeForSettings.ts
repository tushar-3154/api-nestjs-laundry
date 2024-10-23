import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertShippingChargeForSettings1729675840768
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`settings\` (\`setting_key\`, \`setting_value\`) VALUES 
              ('shipping_charge', 50)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`settings\` WHERE \`setting_key\` = 'shipping_charge'`,
    );
  }
}
