import { ChangeEvent } from "react";

type ReservationDetailsProps = {
  name: string;
  setName: (name: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  email: string;
  setEmail: (email: string) => void;
  selectedDate: string;
  handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
  appointmentTime: string;
  setAppointmentTime: (time: string) => void;
  availableTimeSlots: string[];
};

export default function ReservationDetails({
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  selectedDate,
  handleDateChange,
  appointmentTime,
  setAppointmentTime,
  availableTimeSlots,
}: ReservationDetailsProps) {
  return (
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
        {availableTimeSlots.length === 0 && (
          <p className="text-red-500 text-sm mt-2">No available times for this date.</p>
        )}
      </div>
    </div>
  );
}
