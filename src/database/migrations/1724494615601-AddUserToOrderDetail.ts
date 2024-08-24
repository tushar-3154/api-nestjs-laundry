import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserToOrderDetail1724494615601 implements MigrationInterface {
  name = 'AddUserToOrderDetail1724494615601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`user_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`user_id\``);
  }
}
