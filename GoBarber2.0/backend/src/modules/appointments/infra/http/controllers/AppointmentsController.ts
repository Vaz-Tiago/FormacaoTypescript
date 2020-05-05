import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    // Utilizar a injeção de dependencia não instancia mais diretamente a classe
    // intancia-se o container que possuí essa configuração de dependencias
    // const createAppointment = new CreateAppointmentService();
    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return res.json(appointment);
  }
}

export default AppointmentsController;
