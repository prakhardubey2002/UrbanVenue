import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cover from '../assets/cover.png';
import moment from 'moment';

const BreadCrumbBar = () => {
  const location = useLocation();
  const path = location.pathname;

  // Extract the last segment which is the date (assuming it is always the date)
  const segments = path.split('/');
  const rawDate = segments[segments.length - 1];

  // Check if the last segment is a valid date and format it
  const formattedDate = moment(rawDate, 'YYYY-MM-DD').isValid() 
    ? moment(rawDate, 'YYYY-MM-DD').format('DD-MM-YYYY') 
    : rawDate; // Leave it as is if not a valid date

  // Join the path excluding the date for breadcrumb
  const pathWithoutDate = segments.slice(1, -1).join(' / ');

  return (
    <div 
      className="h-[20vh] w-full flex justify-start items-center px-8 relative bg-cover bg-center" 
      style={{ backgroundImage: `url(${Cover})` }}
    >
      <div className="relative z-10 text-black flex">
        <Link className="font-semibold" to="/">Home</Link>
        <p className="ml-2">
          {pathWithoutDate.replace(/%20/g, ' ')} / {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default BreadCrumbBar;
