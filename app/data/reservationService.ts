import prisma from '~/data/db.server';

type ReservationType = {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  appointmentDate: Date;
  appointmentTime: string;
};

type CreateReservationInput = {
  name: string;
  phoneNumber: string;
  email: string;
  appointmentDate: Date;
  appointmentTime: string;
};

export const createReservation = async (data: CreateReservationInput) => {
  // Check for existing reservations on the same date and time
  const existingReservation = await prisma.reservation.findFirst({
    where: {
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
    },
  });

  if (existingReservation) {
    throw new Error('This time slot is already taken. Please choose another time.');
  }

  // Create the new reservation if no conflicts
  return await prisma.reservation.create({
    data,
  });
};

// Fetch reserved times for a specific date
export const getReservedTimesByDate = async (date: Date): Promise<string[]> => {
  const reservations = await prisma.reservation.findMany({
    where: {
      appointmentDate: date,
    },
    select: {
      appointmentTime: true,
    },
  });
  
  return reservations.map(reservation => reservation.appointmentTime);
};

export const getAllReservations = async (): Promise<ReservationType[]> => {
  return await prisma.reservation.findMany();
};

export const getReservationById = async (id: number): Promise<ReservationType | null> => {
  return await prisma.reservation.findUnique({
    where: { id },
  });
};

export const deleteExpiredReservations = async () => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1); 
  
   await prisma.reservation.deleteMany({
      where: {
        appointmentDate: {
          lt: yesterday,
        },
      },
    });
  };

  
export const deleteReservation = async (id: number): Promise<ReservationType> => {
  return await prisma.reservation.delete({
    where: { id },
  });
};
