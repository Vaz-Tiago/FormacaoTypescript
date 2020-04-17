import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid') // Porque é uma PrimaryKey
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;

  // O construtor se torna obsoleto. Os métodos utilizados para manipulação de
  // de dados são todos dele
}

export default Appointment;
