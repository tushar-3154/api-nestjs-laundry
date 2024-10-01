import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertEstimatedNormalAndExpressDeliveryDayForSettings1727773082598
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`settings\` (\`setting_key\`, \`setting_value\`) VALUES 
          ('estimated_normal_delivery_day', 3),
          ('estimated_express_delivery_day', 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`settings\` WHERE \`setting_key\` IN ('estimated_normal_delivery_day', 'estimated_express_delivery_day')`,
    );
  }
}
