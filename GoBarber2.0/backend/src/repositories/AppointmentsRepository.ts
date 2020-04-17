import { Repository, EntityRepository } from 'typeorm';

import Appointment from '../models/Appointment';

// Todo os métodos básicos de um repository o ORM já fornece
// Como parametro do decorator é passado o model
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // Todo método async deve retornar promise, que recebe como parametro
  // os tipos desejados
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
