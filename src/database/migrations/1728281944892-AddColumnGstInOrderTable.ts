import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnGstInOrderTable1728281944892
  implements MigrationInterface
{
  name = 'AddColumnGstInOrderTable1728281944892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`gst\` decimal NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`gst\``);
  }
}
