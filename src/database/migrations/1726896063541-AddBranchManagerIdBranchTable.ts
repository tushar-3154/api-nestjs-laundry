import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBranchManagerIdBranchTable1726896063541
  implements MigrationInterface
{
  name = 'AddBranchManagerIdBranchTable1726896063541';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`branches\` DROP COLUMN \`branch_manager_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`branches\` ADD \`branch_manager_id\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`branches\` ADD CONSTRAINT \`FK_2f11530b10e5af9d1182351fb6c\` FOREIGN KEY (\`branch_manager_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`branches\` DROP FOREIGN KEY \`FK_2f11530b10e5af9d1182351fb6c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`branches\` DROP COLUMN \`branch_manager_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`branches\` ADD \`branch_manager_id\` varchar(100) NOT NULL`,
    );
  }
}
