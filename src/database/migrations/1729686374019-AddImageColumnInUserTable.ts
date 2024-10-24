import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageColumnInUserTable1729686374019
  implements MigrationInterface
{
  name = 'AddImageColumnInUserTable1729686374019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`image\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`image\``);
  }
}
