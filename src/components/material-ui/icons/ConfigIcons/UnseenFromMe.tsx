import { useLocation } from "react-router-dom";

function UnseenFromMe() {
  const location = useLocation();
  const splitedPath = location.pathname.split("/")[2];
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="24"
        viewBox="0 0 26 24"
        fill="none"
      >
        <path
          d="M17.1667 3.99984H20.5V10.9998M7.83333 3.99984H4.5V19.9998C4.5 20.7362 5.09695 21.3332 5.83333 21.3332H10.5M8.5 2.6665H16.5V5.33317C16.5 6.06955 15.903 6.6665 15.1667 6.6665H9.83333C9.09695 6.6665 8.5 6.06955 8.5 5.33317V2.6665Z"
          stroke={splitedPath === "allTaskFromMe" ? "#0076C8" : "#131516"}
          strokeWidth="2"
        />
        <path
          d="M18.6679 20.7929L17.9608 21.5L19.375 22.9142L20.0821 22.2071L18.6679 20.7929ZM22.875 18L23.5821 18.7071L24.2892 18L23.5821 17.2929L22.875 18ZM20.0821 13.7929L19.375 13.0858L17.9608 14.5L18.6679 15.2071L20.0821 13.7929ZM20.0821 22.2071L23.5821 18.7071L22.1679 17.2929L18.6679 20.7929L20.0821 22.2071ZM23.5821 17.2929L20.0821 13.7929L18.6679 15.2071L22.1679 18.7071L23.5821 17.2929ZM22.875 17H13.5V19H22.875V17Z"
          fill={splitedPath === "allTaskFromMe" ? "#0076C8" : "#131516"}
        />
        <rect x="18" y="0.5" width="7" height="7" rx="3.5" fill="#FA0808" />
      </svg>
    </>
  );
}

export default UnseenFromMe;
