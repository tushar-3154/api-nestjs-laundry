import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeliveryChargesToSettingsTable1729075563345
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`settings\` (\`setting_key\`, \`setting_value\`) VALUES 
              ('estimate_delivery_normal_charges', 50),
              ('estimate_delivery_express_charges', 100)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`settings\` WHERE \`setting_key\` IN ('estimate_delivery_normal_charges', 'estimate_delivery_express_charges')`,
    );
  }
}
