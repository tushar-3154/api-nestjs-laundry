import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertDataForSettings1724229394450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO settings (setting_key, value) VALUES ('estimate_pickup_normal_hour', '50'),('estimate_pickup_express_hour', '24')
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM settings WHERE setting_key IN ('estimate_pickup_normal_hour', 'estimate_pickup_express_hour')
          `);
  }
}
