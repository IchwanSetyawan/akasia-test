import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10 ">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer">
            <Link href={'/'}>
              <a className="text-gray-800 text-xl font-bold mr-4">Akasia</a>
            </Link>
          </div>
          <div className="flex items-center">
            <ul className="flex">
              <li className="mr-6 cursor-pointer">
                <Link href={'/'}>
                  <a className="text-gray-800 hover:text-blue-500">All Planet</a>
                </Link>
              </li>
              <li className="mr-6 cursor-pointer">
                <Link href={'/wishlist'}>
                  <a className="text-gray-800 hover:text-blue-500">My Wishlist</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
