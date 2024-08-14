import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoles1723632214151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO roles (role_id, name) VALUES 
        (1,'Super Admin'),
        (2,'Sub Admin'),
        (3,'Branch Manager'),
        (4,'Delivery Boy'),
        (5,'Customer'),
        (6,'Workshop Manager'),
        (7,'Vendor/Reseller');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM roles WHERE name IN (
          'Super Admin',
          'Sub Admin',
          'Branch Manager',
          'Delivery Boy',
          'Customer',
          'Workshop Manager',
          'Vendor/Reseller'
        );
      `);
  }
}
