import { faHome, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { MdSupervisorAccount, MdUpdate } from 'react-icons/md';
import { FaChessQueen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './sidbar.css';

export default function Sidebar(props) {
    const [isOpen, setIsOpen] = useState(false);

    const sidebarItems = [
        {
            title: 'Phase Data',
            key: 'All_Users',
            icon: <MdSupervisorAccount className="text-2xl text-black" />,
            link: '/home',
        },

        {
            title: 'Configure Bot',
            key: 'Configure_Bot',
            icon: <MdSupervisorAccount className="text-2xl text-black" />,
            link: '/botConfiguration',
        },
        {
            title: 'Roles Permissions',
            key: 'Roles_Permissions',
            icon: <MdSupervisorAccount className="text-2xl text-black" />,
            link: '/roles_permissions',
        },
        {
            title: 'Queries',
            key: 'Queries',
            icon: <FaChessQueen className="text-2xl text-black" />,
            link: '/agent/home',
        },
        {
            title: 'Connect to Device',
            key: 'connecttodevice',
            icon: <FaChessQueen className="text-2xl text-black" />,
            link: '/connecttodevice',
        },
        // {
        //     title: 'Profile Update',
        //     key: 'Profile_Update',
        //     icon: <MdUpdate className="text-2xl text-black mt-2" />,
        //     link: '/profile/update', // Adjust this link as needed
        // },
        {
            title: 'Graphs',
            key: 'activeagent',
            icon: <MdUpdate className="text-2xl text-black mt-2" />,
            link: '/activeagent', // Adjust this link as needed
        },
    ];

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="h-full font-bold">
            {/* Mobile Menu Button */}
            <div className="bg-white-200 p-2 flex justify-between items-center lg:hidden">
                <button onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-xl text-black" />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`bg-white-200 lg:bg-white-100 h-full w-20 p-4 lg:p-4 flex flex-col rounded-l-md items-start text-left transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 fixed lg:relative z-50`}
            >
                <div className="flex flex-col flex-wrap items-start px-2">
                    <div className="my-6 w-full flex items-start">
                        <Link className="flex items-center" to={'/dashboard'}>
                            <FontAwesomeIcon icon={faHome} className="text-xl text-black" />
                            <p className="text-lg text-black px-2 pt-1 hidden lg:block">Dashboard</p>
                        </Link>
                    </div>
                    {sidebarItems.map((item, index) => (
                        <div key={index} className="my-6 w-full flex items-start">
                            <Link className="flex items-center" to={item.link}>
                                {item.icon}
                                <p className="text-lg text-black px-2 pt-1 hidden lg:block">{item.title}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
