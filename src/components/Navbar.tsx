'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
//   const { data: session } = useSession();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Quiz', href: '/quiz' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          QuizMaster
        </Link>

        {/* Nav Links */}
        <div className="space-x-6 hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium ${
                pathname === link.href ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Button */}
        <div className="flex items-center gap-3">
          {/* {session ? ( */}
            <>
              {/* <span className="hidden md:block text-sm text-gray-600">{session.user?.name}</span> */}
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          {/* ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
            >
              Login
            </button>
          )} */}
        </div>

        {/* Mobile Menu (optional) */}
        <button className="md:hidden">
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </nav>
  );
}
