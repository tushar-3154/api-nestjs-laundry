import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompanyAndBranchTable1725014266529
  implements MigrationInterface
{
  name = 'CreateCompanyAndBranchTable1725014266529';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`branches\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`branch_id\` int NOT NULL AUTO_INCREMENT, \`branch_name\` varchar(255) NOT NULL, \`branch_address\` varchar(255) NOT NULL, \`branch_manager\` varchar(100) NOT NULL, \`branch_phone_number\` varchar(20) NOT NULL, \`branch_email\` varchar(255) NOT NULL, \`branch_registration_number\` varchar(100) NOT NULL, \`company_id\` int NOT NULL, PRIMARY KEY (\`branch_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`companies\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`company_id\` int NOT NULL AUTO_INCREMENT, \`company_name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(100) NOT NULL, \`state\` varchar(100) NOT NULL, \`zip_code\` varchar(20) NOT NULL, \`company_owner_name\` varchar(255) NOT NULL, \`phone_number\` varchar(20) NOT NULL, \`mobile_number\` varchar(20) NOT NULL, \`email\` varchar(255) NOT NULL, \`website\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`registration_number\` varchar(100) NOT NULL, \`registration_date\` date NOT NULL, \`gstin\` varchar(20) NOT NULL, \`company_ownedby\` int NULL, \`contract_document\` varchar(255) NULL, PRIMARY KEY (\`company_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`branches\` ADD CONSTRAINT \`FK_5973f79e64a27c506b07cd84b29\` FOREIGN KEY (\`company_id\`) REFERENCES \`companies\`(\`company_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`branches\` DROP FOREIGN KEY \`FK_5973f79e64a27c506b07cd84b29\``,
    );
    await queryRunner.query(`DROP TABLE \`companies\``);
    await queryRunner.query(`DROP TABLE \`branches\``);
  }
}
