import { toast } from "react-toastify";
import { json, useLoaderData, useSearchParams, useNavigation, useActionData, Form } from "@remix-run/react";
import { createReservation, deleteExpiredReservations, getReservedTimesByDate } from "~/data/reservationService";
import { useEffect, useMemo, useState } from "react";
import ReservationDetails from "~/components/ReservationDetails";
import { Element } from "react-scroll";
import NavbarReservation from "~/components/NavbarForReservation";

type ActionResult = {
    type: 'success' | 'error';
    error?: Error;
  };
  
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };
  
  export const loader = async ({ request }: { request: Request }) => {
    await deleteExpiredReservations();
    const url = new URL(request.url);
    const selectedDate = url.searchParams.get('date');
    const reservedTimes = selectedDate ? await getReservedTimesByDate(new Date(selectedDate)) : [];
    return json({ reservedTimes });
  };
  
  export const action = async ({ request }: { request: Request }): Promise<ActionResult | null> => {
    const formData = new URLSearchParams(await request.text());
    const newReservation = {
      name: formData.get('name') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      email: formData.get('email') as string,
      appointmentDate: new Date(formData.get('appointmentDate') as string),
      appointmentTime: formData.get('appointmentTime') as string,
    };

    try {
      await createReservation(newReservation);
      return { type: 'success' };
    } catch (error) {
      return { type: 'error', error: error as Error };
    }
  };

function Reservation() {
    const actionData = useActionData<ActionResult>();
    const { reservedTimes } = useLoaderData<{ reservedTimes: string[] }>();
    const timeSlots = useMemo(generateTimeSlots, []);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedDate = searchParams.get('date') || '';
    const availableTimeSlots = selectedDate ? timeSlots.filter(time => !reservedTimes.includes(time)) : [];
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';
  
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = e.target.value;
        setSearchParams({ date });
      };
    
      useEffect(() => {
        if (actionData?.type === 'success') {
          setName('');
          setPhoneNumber('');
          setEmail('');
          setAppointmentTime('');
          setSearchParams({ date: '' });
          toast.success('Reservation created successfully!');
        }
    
        if (actionData?.type === 'error' && actionData.error) {
          toast.error(actionData.error.message);
        }
      }, [actionData, setSearchParams]);
    
    
  return (
    <article className="text-gray-700">
      <NavbarReservation />
      <Element name="reservation">
  <div className="max-w-4xl mx-auto px-4 py-[150px]">
    <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">
      Make a Reservation
    </h2>

    <Form
      method="post"
      className="space-y-6"
    >
      <ReservationDetails
        name={name}
        setName={setName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
        appointmentTime={appointmentTime}
        setAppointmentTime={setAppointmentTime}
        availableTimeSlots={availableTimeSlots}
      />

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </Form>
  </div>
</Element>
    </article>
  )
}

export default Reservation