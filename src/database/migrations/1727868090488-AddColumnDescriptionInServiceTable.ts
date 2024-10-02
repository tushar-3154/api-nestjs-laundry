import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnDescriptionInServiceTable1727868090488
  implements MigrationInterface
{
  name = 'AddColumnDescriptionInServiceTable1727868090488';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`services\` ADD \`description\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`services\` DROP COLUMN \`description\``,
    );
  }
}
