import React from 'react';
import Link from 'next/link';

type NavbarProps = {
  userEmail?: string;
  userRole?: string;
};

const Navbar: React.FC<NavbarProps> = ({ userEmail, userRole }) => {
  return (
    <nav className="bg-black text-white px-4 py-3 flex justify-between items-center">
      <div className="font-bold text-xl">
        <Link href="/">GENIQX</Link>
      </div>
      <div className="space-x-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/settings">Settings</Link>
        <button
          className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
          onClick={() => alert('Logout logic goes here')}
        >
          Logout
        </button>
      </div>
      {userEmail && (
        <div className="ml-6 text-sm text-gray-300">
          Logged in as: <span className="font-semibold">{userEmail}</span> ({userRole})
        </div>
      )}
    </nav>
  );
};

export default Navbar;
