import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateGstColumnInOrderTable1729686080254
  implements MigrationInterface
{
  name = 'UpdateGstColumnInOrderTable1729686080254';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`gst\``);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`gst\` float NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`gst\``);
    await queryRunner.query(`ALTER TABLE \`orders\` ADD \`gst\` decimal NULL`);
  }
}
