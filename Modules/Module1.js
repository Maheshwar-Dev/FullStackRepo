import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="font-bold">EquipRent</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/catalog">Catalog</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

function Home() {
  return <div className="p-10 text-center text-xl">Welcome to EquipRent</div>;
}

function Catalog() {
  const items = [
    { id: 1, name: "Camera", price: "₹500/day" },
    { id: 2, name: "Tripod", price: "₹150/day" },
    { id: 3, name: "Lighting Kit", price: "₹300/day" }
  ];
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {items.map(i => (
        <div key={i.id} className="border rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold">{i.name}</h3>
          <p>{i.price}</p>
          <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">View</button>
        </div>
      ))}
    </div>
  );
}

function Login() {
  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <input className="border p-2 w-full mb-2" placeholder="Email" />
      <input className="border p-2 w-full mb-2" placeholder="Password" type="password" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
    </div>
  );
}

function Register() {
  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Register</h2>
      <input className="border p-2 w-full mb-2" placeholder="Name" />
      <input className="border p-2 w-full mb-2" placeholder="Email" />
      <input className="border p-2 w-full mb-2" placeholder="Password" type="password" />
      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
    </div>
  );
}

export default function Module1() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
