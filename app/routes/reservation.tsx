import { toast } from "react-toastify";
import { json, useLoaderData, useSearchParams, useNavigation, useActionData, Form } from "@remix-run/react";
import { createReservation, deleteExpiredReservations, getReservedTimesByDate } from "~/data/reservationService";
import { useEffect, useMemo, useState } from "react";
import { Element } from "react-scroll";
import NavbarReservation from "~/components/NavbarForReservation";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from "react-i18next";

type ActionResult = {
  type: 'success' | 'error';
  error?: Error;
};

const generateTimeSlots = () => {
  const slots: string[] = [];
  for (let hour = 9; hour <= 16; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 16 && minute === 30) continue; // Exclude 16:30
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
    goalsOfMeeting: formData.get('goalOfTheMeeting') as string,
    location: formData.get('location') as string,
  };

  try {
    await createReservation(newReservation);

    console
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
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [goalOfTheMeeting, setGoalOfTheMeeting] = useState('');

  const handleDateChange = (date: Date) => {
    const appointmentDate = new Date(date.setHours(12, 0, 0));
    setAppointmentDate(appointmentDate);
    setSearchParams({ date: appointmentDate.toISOString().split('T')[0] });
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    return date.getDay() === 0; // Disable only Sundays (0 represents Sunday in JavaScript's Date object)
  };
  

  useEffect(() => {
    if (actionData?.type === 'success') {
      setName('');
      setPhoneNumber('');
      setEmail('');
      setAppointmentTime('');
      setSearchParams({ date: '' });
      setAppointmentDate(new Date());
      toast.success('Reservation created successfully!');
    }

    if (actionData?.type === 'error' && actionData.error) {
      toast.error(actionData.error.message);
    }
  }, [actionData, setSearchParams]);

  return (
    <article className="text-gray-700 bg-gray-50 min-h-screen flex flex-col">
      <NavbarReservation />
      <Element name="reservation">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32 lg:py-40">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-6 md:text-5xl">
            {t('inputFields.makeAreservation')}
          </h2>
          
          <p className="text-lg text-center text-gray-600 mb-2 md:text-xl">
            {t('inputFields.paragraph')}
          </p>
          <p className="text-base text-center text-gray-500 mb-8 md:text-lg">
            {t('inputFields.subtitle')}
          </p>

          <Form method="post" className="bg-white p-8 shadow-lg rounded-xl space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t('inputFields.name')}</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={t('inputFields.namePlaceHolder')}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">{t('inputFields.phoneNumber')}</label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder={t('inputFields.phoneNumberPlaceholder')}
                required
                value={phoneNumber}
                onChange={(e) => { if (/^\d*$/.test(e.target.value)) setPhoneNumber(e.target.value); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t('inputFields.email')}</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder={t('inputFields.emailPlaceholder')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Date Picker */}
            <div>
              <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-1">{t('inputFields.appointmentDate')}</label>
              <input type="hidden" name="appointmentDate" value={appointmentDate.toISOString().split('T')[0]} />
              <Calendar
                onChange={handleDateChange as never}
                value={appointmentDate}
                // the text color should be black for all day
                className="rounded-lg border border-gray-300 shadow-sm p-2 font-semibold"
                minDate={new Date()}
                tileDisabled={tileDisabled}
              />
            </div>

            {/* Time Selection */}
            <div>
              <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700 mb-1">
                {t('inputFields.appointmentTime')}
                <span className="font-bold text-red-500"> ({t('inputFields.finland')})</span>
              </label>
              <select
                name="appointmentTime"
                id="appointmentTime"
                required
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${availableTimeSlots.length === 0 ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                disabled={availableTimeSlots.length === 0}
              >
                <option value="">{t('inputFields.selectTime')}</option>
                {availableTimeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {availableTimeSlots.length === 0 && selectedDate && (
                <p className="text-red-500 text-sm mt-2">{t('inputFields.noAvailableTimes')}</p>
              )}
            </div>

            {/* Location Selection */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">{t('inputFields.location')}</label>
              <select
                name="location"
                id="location"
                required
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="onsite">{t('inputFields.onsite')}</option>
                <option value="zoom">{t('inputFields.zoom')}</option>
              </select>
            </div>

            {/* Meeting Goal */}
            <div>
              <label htmlFor="goalOfTheMeeting" className="block text-sm font-medium text-gray-700 mb-1">{t('inputFields.goalOfTheMeeting')}</label>
              <input
                type="text"
                name="goalOfTheMeeting"
                id="goalOfTheMeeting"
                placeholder={t('inputFields.goalOfTheMeeting')}
                value={goalOfTheMeeting}
                onChange={(e) => setGoalOfTheMeeting(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? t('inputFields.loading') : t('inputFields.submit')}
            </button>
          </Form>
        </div>
      </Element>
    </article>
  );
}

export default Reservation;
