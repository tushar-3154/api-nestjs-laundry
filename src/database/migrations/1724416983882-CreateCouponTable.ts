import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCouponTable1724416983882 implements MigrationInterface {
  name = 'CreateCouponTable1724416983882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`coupons\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`coupon_id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`description\` text NULL, \`title\` varchar(255) NOT NULL, \`start_time\` timestamp NOT NULL, \`end_time\` timestamp NOT NULL, \`total_usage_count\` int NOT NULL, \`maximum_usage_count_per_user\` int NOT NULL, \`discount_type\` int NULL, \`coupon_type\` int NULL, PRIMARY KEY (\`coupon_id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`coupons\``);
  }
}
