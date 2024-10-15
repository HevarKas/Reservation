import { redirect, useLoaderData, useSearchParams, Form } from "@remix-run/react";
import { useEffect, useState, useMemo } from "react";
import { getReservedByDate } from "~/data/reservationService";

interface Reservation {
    id: number;
    name: string;
    phoneNumber: string;
    email: string;
    appointmentDate: Date;
    appointmentTime: string;
}

export const loader = async ({ request }: { request: Request }): Promise<Reservation[] | Response> => {
    const cookieHeader = request.headers.get("Cookie");
    const cookies = cookieHeader?.split(";").reduce((prev, current) => {
        const [name, value] = current.trim().split("=");
        prev[name] = value;
        return prev;
    }, {} as Record<string, string>);

    const isLoggedIn = cookies?.["logged_in"] === "true";
    if (!isLoggedIn) {
        return redirect("/login");
    }

    const url = new URL(request.url);
    const selectedDate = url.searchParams.get('date');
    const date = selectedDate ? new Date(selectedDate) : new Date(new Date().toISOString().split('T')[0]);

    try {
        const reservations = await getReservedByDate(date);
        return reservations;
    } catch (error) {
        throw new Error('Failed to get reservations');
    }
};

function Dashboard() {
    const loaderData = useLoaderData<Reservation[]>();
    const [searchParams] = useSearchParams();
    const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const filteredReservations = useMemo(() => {
        const dateParam = searchParams.get("date");
        const selectedDate = dateParam ? new Date(dateParam) : new Date();
    
        return loaderData
            .filter((reservation) => {
                const appointmentDate = new Date(reservation.appointmentDate);
    
                if (appointmentDate.toDateString() === selectedDate.toDateString()) {
    
                    if (selectedDate.toDateString() === new Date().toDateString()) {
                        const [currentHour, currentMinute] = currentTime.split(':').map(Number);
                        const [appointmentHour, appointmentMinute] = reservation.appointmentTime.split(':').map(Number);
    
                        if (appointmentHour > currentHour || (appointmentHour === currentHour && appointmentMinute > currentMinute)) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
                return false;
            })
            .sort((a, b) => {
                const appointmentADate = new Date(a.appointmentDate);
                const appointmentBDate = new Date(b.appointmentDate);
    
                const formattedDateA = appointmentADate.toISOString().split("T")[0];
                const formattedDateB = appointmentBDate.toISOString().split("T")[0];
    
                const appointmentATime = new Date(`${formattedDateA}T${a.appointmentTime}`).getTime();
                const appointmentBTime = new Date(`${formattedDateB}T${b.appointmentTime}`).getTime();
    
                return appointmentATime - appointmentBTime;
            });
    }, [loaderData, searchParams, currentTime]);
    
    

    const nextAppointment = filteredReservations.length > 0 ? filteredReservations[0] : null;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Dashboard 
                    <span className="ml-2 text-gray-500">({filteredReservations.length} Appointments)</span>
                </h1>
                <div className="text-lg font-semibold">
                    <p>Current Time: {currentTime}</p>
                    {nextAppointment && (
                        <p className="text-green-500">
                            Next Appointment: {nextAppointment.name} at {nextAppointment.appointmentTime}
                        </p>
                    )}
                </div>
            </div>

            {/* Date selection form */}
            <Form method="get" className="mb-6">
                <label htmlFor="date" className="block mb-2 text-lg font-medium text-gray-700">
                    Select a date to view appointments:
                </label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    min={new Date().toISOString().split("T")[0]}
                    defaultValue={searchParams.get("date") || new Date().toISOString().split("T")[0]}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                />
                <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                    Check Appointments
                </button>
            </Form>

            {filteredReservations.length === 0 && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-md text-center flex items-center justify-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 12h4m-2-2v4m10-10H4a2 2 0 00-2 2v14a2 2 0 002 2h20a2 2 0 002-2V4a2 2 0 00-2-2z" />
                    </svg>
                    <span className="text-lg font-semibold">No upcoming appointments.</span>
                </div>
            )}

            {filteredReservations.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReservations.map((item) => (
                        <div key={item.id} className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
                            <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                            <p className="text-gray-600">Phone: {item.phoneNumber}</p>
                            <p className="text-gray-600">Email: {item.email}</p>
                            <p className="text-gray-600">Appointment Date: {new Date(item.appointmentDate).toLocaleDateString()}</p>
                            <p className="text-gray-600">Appointment Time: {item.appointmentTime}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
