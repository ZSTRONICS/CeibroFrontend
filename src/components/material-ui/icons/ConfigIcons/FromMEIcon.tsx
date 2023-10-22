import { Fragment } from "react";
import { useLocation } from "react-router-dom";

function FromMEIcon() {
  const location = useLocation();
  const splitedPath = location.pathname.split("/")[2];
  return (
    <Fragment>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M16.6667 4.00033H20V11.0003M7.33333 4.00033H4V20.0003C4 20.7367 4.59695 21.3337 5.33333 21.3337H10M8 2.66699H16V5.33366C16 6.07004 15.403 6.66699 14.6667 6.66699H9.33333C8.59695 6.66699 8 6.07004 8 5.33366V2.66699Z"
          stroke={splitedPath === "allTaskFromMe" ? "#0075D0" : "#131516"}
          strokeWidth="2"
        />
        <path
          d="M18.1679 20.7929L17.4608 21.5L18.875 22.9142L19.5821 22.2071L18.1679 20.7929ZM22.375 18L23.0821 18.7071L23.7892 18L23.0821 17.2929L22.375 18ZM19.5821 13.7929L18.875 13.0858L17.4608 14.5L18.1679 15.2071L19.5821 13.7929ZM19.5821 22.2071L23.0821 18.7071L21.6679 17.2929L18.1679 20.7929L19.5821 22.2071ZM23.0821 17.2929L19.5821 13.7929L18.1679 15.2071L21.6679 18.7071L23.0821 17.2929ZM22.375 17H13V19H22.375V17Z"
          fill={splitedPath === "allTaskFromMe" ? "#0075D0" : "#131516"}
        />
      </svg>
    </Fragment>
  );
}

export default FromMEIcon;
