import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLoginHistoryAndDeviceUsersTable1723634258442
  implements MigrationInterface
{
  name = 'CreateLoginHistoryAndDeviceUsersTable1723634258442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`device_users\` (\`device_id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`device_type\` varchar(255) NOT NULL, \`device_token\` varchar(255) NOT NULL, PRIMARY KEY (\`device_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`login_history\` (\`login_id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`type\` varchar(20) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`login_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`device_users\` ADD CONSTRAINT \`FK_70ec8028d54d41825163d5aa453\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`login_history\` ADD CONSTRAINT \`FK_ad9ce49cb73c0b33746a56b6bd1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`login_history\` DROP FOREIGN KEY \`FK_ad9ce49cb73c0b33746a56b6bd1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`device_users\` DROP FOREIGN KEY \`FK_70ec8028d54d41825163d5aa453\``,
    );
    await queryRunner.query(`DROP TABLE \`login_history\``);
    await queryRunner.query(`DROP TABLE \`device_users\``);
  }
}
