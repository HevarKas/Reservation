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
  for (let hour = 9; hour <= 14; hour++) {
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
    const day = date.getDay();
    return day !== 5 && day !== 6; // Disable all days except Friday and Saturday
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
    <article className="text-gray-700 bg-gray-50">
      <NavbarReservation />
      <Element name="reservation">
        <div className="max-w-4xl mx-auto px-4 py-[150px]">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-6 sm:text-3xl">
  {t('inputFields.makeAreservation')}
</h2>
{/* subtitle */}
<p className="text-xl text-center text-gray-600 mb-4 sm:text-lg">
  {t('inputFields.subtitle')}
</p>

<p className="text-lg text-center text-gray-600 mb-8 sm:text-base">
  {t('inputFields.paragraph')}
</p>



          <Form method="post" className="space-y-8">
            <div className="max-w-lg mx-auto p-6 sm:p-8 bg-white shadow-xl rounded-lg space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('inputFields.name')}</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={t('inputFields.namePlaceHolder')}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  {t('inputFields.phoneNumber')}
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder={t('inputFields.phoneNumberPlaceholder')}
                  required
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow numbers
                    if (/^\d*$/.test(value)) {
                      setPhoneNumber(value);
                    }
                  }}
                  pattern="[0-9]*" 
                  inputMode="numeric" 
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('inputFields.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t('inputFields.emailPlaceholder')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
                  {t('inputFields.appointmentDate')}
                </label>
                <input type="hidden" name="appointmentDate" value={appointmentDate.toISOString().split('T')[0]} />
                <Calendar
                  onChange={handleDateChange as never}
                  value={appointmentDate}
                  className="mt-1 rounded-lg border border-gray-300 shadow-sm"
                  minDate={new Date()}
                  tileDisabled={tileDisabled}
                />
              </div>

              <div>
                <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">
                  {t('inputFields.appointmentTime')}
                  {/* let's be bold */}
                   <span className="font-bold text-red-500"> ({t('inputFields.finland')})

                  </span>
                </label>
                <select
                  name="appointmentTime"
                  id="appointmentTime"
                  required
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${availableTimeSlots.length === 0 ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  disabled={availableTimeSlots.length === 0}
                >
                  <option value="">
                    {t('inputFields.selectTime')}
                  </option>
                  {availableTimeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {availableTimeSlots.length === 0 && selectedDate && (
                  <p className="text-red-500 text-sm mt-2">{t('inputFields.noAvailableTimes')}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  {t('inputFields.location')}
                </label>
                <select
                  name="location"
                  id="location"
                  required
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="onsite">
                    {t('inputFields.onsite')}
                  </option>
                  <option value="zoom">
                    {t('inputFields.zoom')}
                  </option>
                </select>
              </div>
              <div>
              <label htmlFor="goalOfTheMeeting" className="block text-sm font-medium text-gray-700">{t('inputFields.goalOfTheMeeting')}</label>
                <input
                  type="text"
                  name="goalOfTheMeeting"
                  id="goalOfTheMeeting"
                  placeholder={t('inputFields.goalOfTheMeeting')}
                  value={goalOfTheMeeting}
                  onChange={(e) => setGoalOfTheMeeting(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>

            </div>

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
