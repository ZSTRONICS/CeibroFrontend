import { useLocation } from "react-router-dom";

function UnseenToMe() {
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
          stroke={splitedPath === "allTaskToMe" ? "#0075D0" : "#131516"}
          strokeWidth="2"
        />
        <path
          d="M19.3321 20.7929L20.0392 21.5L18.625 22.9142L17.9179 22.2071L19.3321 20.7929ZM15.125 18L14.4179 18.7071L13.7108 18L14.4179 17.2929L15.125 18ZM17.9179 13.7929L18.625 13.0858L20.0392 14.5L19.3321 15.2071L17.9179 13.7929ZM17.9179 22.2071L14.4179 18.7071L15.8321 17.2929L19.3321 20.7929L17.9179 22.2071ZM14.4179 17.2929L17.9179 13.7929L19.3321 15.2071L15.8321 18.7071L14.4179 17.2929ZM15.125 17H24.5V19H15.125V17Z"
          fill={splitedPath === "allTaskToMe" ? "#0075D0" : "#131516"}
        />
        <rect x="18" y="0.5" width="7" height="7" rx="3.5" fill="#FA0808" />
      </svg>
    </>
  );
}

export default UnseenToMe;
