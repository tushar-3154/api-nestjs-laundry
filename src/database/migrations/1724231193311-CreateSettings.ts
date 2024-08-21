import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSettings1724231193311 implements MigrationInterface {
  name = 'CreateSettings1724231193311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`settings\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`setting_id\` int NOT NULL AUTO_INCREMENT, \`setting_key\` varchar(255) NOT NULL, \`setting_value\` varchar(255) NOT NULL, PRIMARY KEY (\`setting_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`settings\``);
  }
}
