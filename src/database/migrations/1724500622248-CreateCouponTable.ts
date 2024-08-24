import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCouponTable1724500622248 implements MigrationInterface {
  name = 'CreateCouponTable1724500622248';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`coupons\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`coupon_id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`description\` text NULL, \`title\` varchar(255) NOT NULL, \`start_time\` timestamp NOT NULL, \`end_time\` timestamp NOT NULL, \`total_usage_count\` int NOT NULL, \`maximum_usage_count_per_user\` int NOT NULL, \`discount_type\` int NULL, \`discount_value\` decimal NOT NULL, \`coupon_type\` int NULL, UNIQUE INDEX \`IDX_e025109230e82925843f2a14c4\` (\`code\`), PRIMARY KEY (\`coupon_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e025109230e82925843f2a14c4\` ON \`coupons\``,
    );
    await queryRunner.query(`DROP TABLE \`coupons\``);
  }
}
