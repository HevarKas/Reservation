import { toast } from "react-toastify";
import { json, useLoaderData, useSearchParams, useNavigation, useActionData, Form } from "@remix-run/react";
import { createReservation, deleteExpiredReservations, getReservedTimesByDate } from "~/data/reservationService";
import { useEffect, useMemo, useState } from "react";
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
 <div className="max-w-lg mx-auto p-6 sm:p-8 bg-white shadow-md rounded-lg space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Enter your phone number"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Appointment Date</label>
        <input
          type="date"
          name="appointmentDate"
          id="appointmentDate"
          min={new Date().toISOString().split('T')[0]}
          required
          value={selectedDate}
          onChange={handleDateChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">Appointment Time</label>
        <select
          name="appointmentTime"
          id="appointmentTime"
          required
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${availableTimeSlots.length === 0 ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          disabled={availableTimeSlots.length === 0}
        >
          <option value="">Select Time</option>
          {availableTimeSlots.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {availableTimeSlots.length === 0 && selectedDate && (
          <p className="text-red-500 text-sm mt-2">No available times for this date.</p>
        )}
      </div>
    </div>

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