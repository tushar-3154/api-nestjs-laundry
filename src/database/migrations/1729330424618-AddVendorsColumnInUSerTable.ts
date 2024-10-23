import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVendorsColumnInUSerTable1729330424618
  implements MigrationInterface
{
  name = 'AddVendorsColumnInUSerTable1729330424618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`commission_percentage\` decimal(5,2) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`security_deposit\` decimal(10,2) NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_440458adca1b001c2c29d852c0\` ON \`feedback\` (\`order_id\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`REL_440458adca1b001c2c29d852c0\` ON \`feedback\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`security_deposit\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`commission_percentage\``,
    );
  }
}
