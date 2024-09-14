import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetTokenToUser1725877640703 implements MigrationInterface {
  name = 'AddResetTokenToUser1725877640703';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`reset_token\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`reset_token_expires\` timestamp NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`reset_token_expires\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`reset_token\``,
    );
  }
}
