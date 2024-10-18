import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFeedbackTable1729167408005 implements MigrationInterface {
  name = 'CreateFeedbackTable1729167408005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`feedback\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`feedback_id\` int NOT NULL AUTO_INCREMENT, \`rating\` int NOT NULL, \`comment\` text NULL, \`is_publish\` int NOT NULL DEFAULT '1', \`order_id\` int NOT NULL, UNIQUE INDEX \`IDX_440458adca1b001c2c29d852c0\` (\`order_id\`), PRIMARY KEY (\`feedback_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`feedback\` ADD CONSTRAINT \`FK_440458adca1b001c2c29d852c08\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`order_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`feedback\` DROP FOREIGN KEY \`FK_440458adca1b001c2c29d852c08\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_440458adca1b001c2c29d852c0\` ON \`feedback\``,
    );
    await queryRunner.query(`DROP TABLE \`feedback\``);
  }
}
