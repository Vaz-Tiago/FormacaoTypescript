import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// GET
appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();
  return res.json(appointments);
});

// CREATE
appointmentsRouter.post('/', (req, res) => {
  // Tratando o erro:
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    // injeta a instancia no construtor do service:
    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    // Cria um appointment com os dados que chegam na rota:
    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ Error: err.message });
  }
});

export default appointmentsRouter;
