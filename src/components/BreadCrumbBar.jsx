import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cover from '../assets/cover.png';
import moment from 'moment';
import { DASHBOARD_ROUTE } from '../routes/Routes';

const BreadCrumbBar = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Handle the last segment (assuming it's a date)
  const lastSegment = pathnames[pathnames.length - 1];
  const isValidDate = moment(lastSegment, 'YYYY-MM-DD').isValid();
  const formattedDate = isValidDate
    ? moment(lastSegment, 'YYYY-MM-DD').format('DD-MM-YYYY')
    : lastSegment;

  // Exclude the date from the path for the breadcrumb if it's a valid date
  const breadcrumbPathnames = isValidDate
    ? pathnames.slice(0, -1)
    : pathnames;

  return (
    <div
      className="h-[20vh] w-full flex justify-start items-center px-8 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${Cover})` }}
    >
      <div className="relative z-10 text-black flex">
        <ul className="flex flex-wrap space-x-2 text-sm text-gray-700">
          <li>
            <Link className="font-semibold" to={DASHBOARD_ROUTE}>Home</Link>
            <span className="mx-2 text-gray-500">/</span>
          </li>
          {breadcrumbPathnames.map((value, index) => {
            const to = `/${breadcrumbPathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === breadcrumbPathnames.length - 1;

            return (
              <li key={to} className="breadcrumb-item flex items-center">
                {!isLast ? (
                  <>
                    <Link
                      to={to}
                      className="font-semibold text-gray-800 hover:text-blue-500"
                    >
                      {value.replace(/%20/g, ' ')}
                    </Link>
                    <span className="mx-2 text-gray-500">/</span>
                  </>
                ) : (
                  <>
                    <span className="text-gray-800">{value.replace(/%20/g, ' ')}</span>
                    <span className="mx-2 text-gray-500">/</span>
                    {isValidDate && <span className="text-gray-500">{formattedDate}</span>}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BreadCrumbBar;
