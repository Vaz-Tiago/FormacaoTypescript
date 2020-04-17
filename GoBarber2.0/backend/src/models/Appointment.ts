import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid') // Porque é uma PrimaryKey
  id: string;

  @Column()
  provider_id: string;

  // Inicio Relacionamento
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;
  // Fim Relacionamento

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // O construtor se torna obsoleto. Os métodos utilizados para manipulação de
  // de dados são todos dele
}

export default Appointment;
