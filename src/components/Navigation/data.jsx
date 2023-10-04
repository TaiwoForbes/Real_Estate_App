import { FaCreditCard, FaBook, FaBriefcase } from 'react-icons/fa';
import React from 'react';
const sublinks = [
  {
    page: 'Offers',
    links: [
      { label: 'payment', icon: <FaCreditCard />, url: '/products' },
      { label: 'terminal', icon: <FaCreditCard />, url: '/products' },
      { label: 'connect', icon: <FaCreditCard />, url: '/products' },
    ],
  },
  {
    page: 'Buy',
    links: [
      { label: 'plugins', icon: <FaBook />, url: '/products' },
      { label: 'libraries', icon: <FaBook />, url: '/products' },
      { label: 'help', icon: <FaBook />, url: '/products' },
      { label: 'billing', icon: <FaBook />, url: '/products' },
    ],
  },
  {
    page: 'Rent',
    links: [
      { label: 'List Rentals', icon: <FaBriefcase />, url: '/category/rent' },
      { label: 'Manage rentals', icon: <FaBriefcase />, url: '/create-listing' },
      { label: 'Create a lease', icon: <FaBriefcase />, url: '/create-listing' },
    ],
  },
];

export default sublinks;