import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEstimatedPickupAndDeliveryDateTimeInOrderTable1727695649797
  implements MigrationInterface
{
  name = 'AddEstimatedPickupAndDeliveryDateTimeInOrderTable1727695649797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`delivery_date\` date NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`estimated_pickup_time\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`estimated_pickup_time\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`delivery_date\``,
    );
  }
}
