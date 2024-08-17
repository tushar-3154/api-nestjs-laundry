import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderDetailTable1723898404997 implements MigrationInterface {
    name = 'CreateOrderDetailTable1723898404997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order_details\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`order_id\` int NOT NULL AUTO_INCREMENT, \`items\` json NOT NULL, \`description\` text NULL, \`coupon_code\` varchar(255) NULL, \`extra_charges\` int NULL, \`sub_total\` decimal NOT NULL, \`shipping_charge\` decimal NOT NULL, \`total\` decimal NOT NULL, \`address_id\` int NOT NULL, \`category_id\` int NULL, \`product_id\` int NULL, \`service_id\` int NULL, PRIMARY KEY (\`order_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_6504c11ff0d81a959a66f46e5bc\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`category_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_ce1f689e43b39edd9330cadaeb8\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`product_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_4853018b51ce225698d18517bfa\` FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`service_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_details\` ADD CONSTRAINT \`FK_faae12698a8b40f4be1ae8a2830\` FOREIGN KEY (\`address_id\`) REFERENCES \`user_addresses\`(\`address_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_faae12698a8b40f4be1ae8a2830\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_4853018b51ce225698d18517bfa\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_ce1f689e43b39edd9330cadaeb8\``);
        await queryRunner.query(`ALTER TABLE \`order_details\` DROP FOREIGN KEY \`FK_6504c11ff0d81a959a66f46e5bc\``);
        await queryRunner.query(`DROP TABLE \`order_details\``);
    }

}
