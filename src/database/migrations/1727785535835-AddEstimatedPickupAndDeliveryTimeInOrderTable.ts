import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEstimatedPickupAndDeliveryTimeInOrderTable1727785535835
  implements MigrationInterface
{
  name = 'AddEstimatedPickupAndDeliveryTimeInOrderTable1727785535835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`estimated_delivery_time\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`estimated_pickup_time\` date NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`estimated_pickup_time\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`estimated_delivery_time\``,
    );
  }
}
