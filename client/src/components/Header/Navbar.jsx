import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import logo from '/logo.png';
import { FaPhoneAlt } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const menuItems = [
    { label: 'Stats', to: '/' },
    { label: 'Create Campaign', to: '/createcampaign' },
    // {
    //   label: 'Practice Areas',
    //   to: '/practice-area',
    //   dropdown: [
    //     [
    //       { label: 'Education Law', to: '/practice-area1' },
    //       { label: 'CSE / IEP Meetings', to: '/practice-area2' },
    //       { label: 'Independent Education Evaluation', to: '/practice-area3' },
    //       { label: 'Due Process Hearings', to: '/practice-area4' },
    //       { label: 'Appeals To SRO And Federal Court', to: '/practice-area5' },
    //       { label: 'Section 504 Services', to: '/practice-area6' },
    //     ],
    //     [
    //       { label: 'School Suspension Defense', to: '/practice-area7' },
    //       { label: 'Bullying and Harassment', to: '/practice-area8' },
    //       { label: 'Transportation Issues', to: '/practice-area9' },
    //       { label: 'Placement & Reimbursement', to: '/practice-area10' },
    //       { label: 'Residency & Enrollment Disputes', to: '/practice-area11' },
    //       { label: 'Misconduct & Expulsion Defense', to: '/practice-area12' },
    //     ],
    //   ],
    // },
    { label: 'View All Campaigns', to: '/testimonial' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <nav className="bg-[rgba(0,0,0,0.7)] text-white max-h-[100px] py-3 sticky top-0 z-50 ">
        <div className="container  mx-auto px-4 flex items-center justify-between flex-wrap ">
          <Link to="/" className="flex items-center space-x-1">
            <img src={logo} alt="Logo" className="h-12 w-20  object-contain" />
            <div className="leading-tight hidden sm:block md:block">
              <h1 className="font-semibold text-3xl text-primary">Foundation</h1>
              <span className="text-xs text-gray-300 block">Dont Waste Your Food</span>
            </div>
          </Link>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>

          <div
            className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-6 w-full mt-98 md:w-auto md:mt-0 absolute md:static left-0 bg-gray-900 md:bg-transparent z-50`}
          >
            <ul className="flex flex-col md:flex-row w-full md:w-auto md:items-center md:space-x-6 p-4 md:p-0">
              {menuItems.map((item, index) => (
                <li key={index} className="relative group">
                  <div
                    className="flex items-center justify-between md:justify-start cursor-pointer py-2 md:py-0"
                    onClick={item.dropdown ? toggleDropdown : undefined}
                  >
                    <Link
                      to={item.to}
                      className="text-white hover:text-primary font-medium"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <IoIosArrowDown className={`ml-1 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                  {item.dropdown && (
                    <ul className={`${isDropdownOpen ? 'block' : 'hidden'} md:group-hover:block absolute left-0 top-full bg-gray-800 rounded-md shadow-lg p-4 w-full md:w-[420px] z-50`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.dropdown.map((col, colIndex) => (
                          <div key={colIndex}>
                            {col.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.to}
                                className="block py-1 text-white hover:text-yellow-400 text-base"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsDropdownOpen(false);
                                }}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </ul>
                  )}
                </li>
              ))}
              <li className="mt-4 md:mt-0">
                <div className='flex flex-row justify-center items-center'>
                  <div>
                    <FaPhoneAlt className="mr-2 text-2xl text-primary" />
                  </div>
                  <div className='text-2xl'>
                    <a href="tel:516-226-0330" className="text-primary hover:text-gray-300 no-underline">
                      516-226-0330
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


