import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLoginHistoryAndDeviceUsersTable1724238824327
  implements MigrationInterface
{
  name = 'CreateLoginHistoryAndDeviceUsersTable1724238824327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`device_users\` (\`device_id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`device_type\` varchar(255) NULL, \`device_token\` varchar(255) NULL, PRIMARY KEY (\`device_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`login_history\` (\`login_id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`type\` varchar(20) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`login_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_details\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`order_id\` int NOT NULL AUTO_INCREMENT, \`items\` json NOT NULL, \`description\` text NULL, \`coupon_code\` varchar(255) NULL, \`sub_total\` decimal NOT NULL, \`shipping_charge\` decimal NOT NULL, \`total\` decimal NOT NULL, \`address_id\` int NOT NULL, \`category_id\` int NULL, \`product_id\` int NULL, \`service_id\` int NULL, PRIMARY KEY (\`order_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`device_users\` ADD CONSTRAINT \`FK_70ec8028d54d41825163d5aa453\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`login_history\` ADD CONSTRAINT \`FK_ad9ce49cb73c0b33746a56b6bd1\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_6504c11ff0d81a959a66f46e5bc\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`category_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_ce1f689e43b39edd9330cadaeb8\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`product_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_4853018b51ce225698d18517bfa\` FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`service_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_faae12698a8b40f4be1ae8a2830\` FOREIGN KEY (\`address_id\`) REFERENCES \`user_addresses\`(\`address_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_faae12698a8b40f4be1ae8a2830\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_4853018b51ce225698d18517bfa\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_ce1f689e43b39edd9330cadaeb8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_6504c11ff0d81a959a66f46e5bc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`login_history\` DROP FOREIGN KEY \`FK_ad9ce49cb73c0b33746a56b6bd1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`device_users\` DROP FOREIGN KEY \`FK_70ec8028d54d41825163d5aa453\``,
    );
    await queryRunner.query(`DROP TABLE \`order_details\``);
    await queryRunner.query(`DROP TABLE \`login_history\``);
    await queryRunner.query(`DROP TABLE \`device_users\``);
  }
}
