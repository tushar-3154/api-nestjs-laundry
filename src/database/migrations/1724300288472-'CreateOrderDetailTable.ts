import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrderDetailTable1724300288472 implements MigrationInterface {
  name = 'CreateOrderDetailTable1724300288472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`orders\` (
            \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), 
            \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), 
            \`deleted_at\` timestamp(6) NULL, 
            \`order_id\` int NOT NULL AUTO_INCREMENT, 
            \`category_id\` int NOT NULL, 
            \`product_id\` int NOT NULL, 
            \`service_id\` int NOT NULL, 
            \`price\` int NOT NULL, 
            \`description\` text NULL, 
            \`coupon_code\` varchar(255) NULL, 
            \`express_delivery_charges\` int NULL, 
            \`sub_total\` decimal NOT NULL, 
            \`shipping_charge\` decimal NOT NULL, 
            \`total\` decimal NOT NULL, 
            \`address_id\` int NOT NULL, 
            PRIMARY KEY (\`order_id\`)
        ) ENGINE=InnoDB`);
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_37c2e3e825c219a7c4f3e3be04b\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`category_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_ac832121b6c331b084ecc4121fd\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`product_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_8612f4a8dd8f756d53d2856a09a\` FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`service_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_d39c53244703b8534307adcd073\` FOREIGN KEY (\`address_id\`) REFERENCES \`user_addresses\`(\`address_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_d39c53244703b8534307adcd073\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_8612f4a8dd8f756d53d2856a09a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_ac832121b6c331b084ecc4121fd\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_37c2e3e825c219a7c4f3e3be04b\``,
    );
    await queryRunner.query(`DROP TABLE \`orders\``);
  }
}
