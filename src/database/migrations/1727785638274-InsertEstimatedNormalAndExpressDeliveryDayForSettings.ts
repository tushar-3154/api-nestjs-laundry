import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertEstimatedNormalAndExpressDeliveryDayForSettings1727785638274
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`settings\` (\`setting_key\`, \`setting_value\`) VALUES 
            ('estimate_delivery_normal_day', 3),
            ('estimate_delivery_express_day', 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`settings\` WHERE \`setting_key\` IN ('estimate_delivery_normal_day', 'estimated_delivery_express_day')`,
    );
  }
}
