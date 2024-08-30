import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderAndPaymentStatusToOrdersTable1724996596774
  implements MigrationInterface
{
  name = 'AddOrderAndPaymentStatusToOrdersTable1724996596774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_7fdb8279503d87a8b6a1880e3d4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` CHANGE \`orderOrderId\` \`order_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`shipping_charge\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`coupon_discount\` decimal NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`shipping_charges\` decimal NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`user_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`order_status\` int NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`payment_status\` int NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` CHANGE \`order_id\` \`order_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`order_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` CHANGE \`order_id\` \`order_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`payment_status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`order_status\``,
    );
    await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`user_id\``);
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`shipping_charges\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP COLUMN \`coupon_discount\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD \`shipping_charge\` decimal NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` CHANGE \`order_id\` \`orderOrderId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_7fdb8279503d87a8b6a1880e3d4\` FOREIGN KEY (\`orderOrderId\`) REFERENCES \`orders\`(\`order_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
