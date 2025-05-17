import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function DashboardPage() {
  const [user, setUser] = useState({ email: 'admin@geniqx.com', role: 'admin' });

  useEffect(() => {
    // Load user from token/session (replace with real logic)
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userEmail={user.email} userRole={user.role} />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard title="GPT Assistant" link="/gpt" />
          <ModuleCard title="MedTech Overlay" link="/medtech" />
          <ModuleCard title="DeleteMe AI" link="/deleteme" />
          <ModuleCard title="Course Builder (CPD)" link="/cpd" />
          <ModuleCard title="Finance Tracker" link="/finance" />
          <ModuleCard title="Legal Form AI" link="/legal" />
        </div>
      </main>
    </div>
  );
}

type ModuleCardProps = {
  title: string;
  link: string;
};

const ModuleCard: React.FC<ModuleCardProps> = ({ title, link }) => (
  <a
    href={link}
    className="block p-4 border rounded shadow hover:bg-gray-100 transition duration-200"
  >
    <h2 className="text-xl font-semibold mb-1">{title}</h2>
    <p className="text-sm text-gray-500">Access {title} tools and controls</p>
  </a>
);
