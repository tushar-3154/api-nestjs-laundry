import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCommentColumnInOrderTable1729751834275
  implements MigrationInterface
{
  name = 'AddCommentColumnInOrderTable1729751834275';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`comment\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`comment\``);
  }
}
