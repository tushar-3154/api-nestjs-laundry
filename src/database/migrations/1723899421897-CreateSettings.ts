import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSettings1723899421897 implements MigrationInterface {
  name = 'CreateSettings1723899421897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`settings\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`setting_id\` int NOT NULL AUTO_INCREMENT, \`key\` varchar(255) NOT NULL, \`value\` varchar(255) NOT NULL, PRIMARY KEY (\`setting_id\`)) ENGINE=InnoDB`,
    );

    await queryRunner.query(
      `ALTER TABLE \`device_users\` CHANGE \`device_type\` \`device_type\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`device_users\` CHANGE \`device_token\` \`device_token\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`login_history\` CHANGE \`type\` \`type\` varchar(20) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`login_history\` CHANGE \`type\` \`type\` varchar(20) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`device_users\` CHANGE \`device_token\` \`device_token\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`device_users\` CHANGE \`device_type\` \`device_type\` varchar(255) NULL`,
    );
    await queryRunner.query(`DROP TABLE \`settings\``);
  }
}
