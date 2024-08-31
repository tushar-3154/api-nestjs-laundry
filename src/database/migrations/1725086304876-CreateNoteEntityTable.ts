import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNoteEntityTable1725086304876 implements MigrationInterface {
  name = 'CreateNoteEntityTable1725086304876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`notes\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` timestamp(6) NULL, \`note_id\` int NOT NULL AUTO_INCREMENT, \`order_id\` int NOT NULL, \`user_id\` int NOT NULL, \`text_note\` text NOT NULL, \`image\` varchar(255) NOT NULL, PRIMARY KEY (\`note_id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notes\` ADD CONSTRAINT \`FK_8379244139d5bd1aa28bc382c86\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`order_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`notes\` ADD CONSTRAINT \`FK_7708dcb62ff332f0eaf9f0743a7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`notes\` DROP FOREIGN KEY \`FK_7708dcb62ff332f0eaf9f0743a7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`notes\` DROP FOREIGN KEY \`FK_8379244139d5bd1aa28bc382c86\``,
    );
    await queryRunner.query(`DROP TABLE \`notes\``);
  }
}
