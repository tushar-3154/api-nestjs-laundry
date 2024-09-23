import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartItemTable1727071425608 implements MigrationInterface {
  name = 'CreateCartItemTable1727071425608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cart_items\` (\`cart_id\` int NOT NULL AUTO_INCREMENT, \`category_id\` int NOT NULL, \`product_id\` int NOT NULL, \`service_id\` int NOT NULL, \`user_id\` int NOT NULL, \`quantity\` int NOT NULL, \`price\` decimal NOT NULL, PRIMARY KEY (\`cart_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_b7213c20c1ecdc6597abc8f1212\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_30e89257a105eab7648a35c7fce\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`product_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_854217c28c0e9c61d2c0543925e\` FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`service_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_4e82bdedb073bc75206e364f8da\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`category_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_4e82bdedb073bc75206e364f8da\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_854217c28c0e9c61d2c0543925e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_30e89257a105eab7648a35c7fce\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_b7213c20c1ecdc6597abc8f1212\``,
    );
    await queryRunner.query(`DROP TABLE \`cart_items\``);
  }
}
