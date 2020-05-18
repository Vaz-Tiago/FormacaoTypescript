import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1589765780353
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentUser', // Nome para ForeignKey
        columnNames: ['user_id'], // Coluna que recebe
        referencedColumnNames: ['id'], // Coluna de origem
        referencedTableName: 'users', // Tabela de origem
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // O processo reverso deve acontecer na ordem reversa de criação
    await queryRunner.dropForeignKey('appointments', 'AppointmentUser');

    await queryRunner.dropColumn('appointments', 'user_id');
  }
}
