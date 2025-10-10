import React, { useState } from "react";

function BookingForm() {
  const [equipment, setEquipment] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Book Equipment</h2>
      <select className="border p-2 w-full mb-2" value={equipment} onChange={e => setEquipment(e.target.value)}>
        <option value="">Select Equipment</option>
        <option value="Camera">Camera</option>
        <option value="Tripod">Tripod</option>
        <option value="Lighting Kit">Lighting Kit</option>
      </select>
      <input className="border p-2 w-full mb-2" type="date" value={start} onChange={e => setStart(e.target.value)} />
      <input className="border p-2 w-full mb-2" type="date" value={end} onChange={e => setEnd(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Check Availability</button>
    </div>
  );
}

function AvailabilityCalendar() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="p-6">
      <h2 className="text-xl mb-3">Availability Calendar</h2>
      <div className="grid grid-cols-7 gap-2">
        {days.map(d => (
          <div key={d} className="border p-4 text-center rounded">{d}</div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const rentals = [
    { id: 1, item: "Camera", status: "Pending" },
    { id: 2, item: "Tripod", status: "Confirmed" }
  ];
  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">My Rentals</h2>
      {rentals.map(r => (
        <div key={r.id} className="border p-3 rounded mb-2 flex justify-between">
          <span>{r.item}</span>
          <span>{r.status}</span>
        </div>
      ))}
    </div>
  );
}

export default function Module2() {
  return (
    <div className="space-y-10">
      <BookingForm />
      <AvailabilityCalendar />
      <Dashboard />
    </div>
  );
}
