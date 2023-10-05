import { useLocation } from "react-router-dom";

function ToMeIcon() {
  const location = useLocation();
  const splitedPath = location.pathname.split("/")[2];
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6667 3.99984H20V10.9998M7.33333 3.99984H4V19.9998C4 20.7362 4.59695 21.3332 5.33333 21.3332H10M8 2.6665H16V5.33317C16 6.06955 15.403 6.6665 14.6667 6.6665H9.33333C8.59695 6.6665 8 6.06955 8 5.33317V2.6665Z"
          stroke={splitedPath === "allTaskToMe" ? "#0076C8" : "#131516"}
          strokeWidth="2"
        />
        <path
          d="M18.8321 20.7929L19.5392 21.5L18.125 22.9142L17.4179 22.2071L18.8321 20.7929ZM14.625 18L13.9179 18.7071L13.2108 18L13.9179 17.2929L14.625 18ZM17.4179 13.7929L18.125 13.0858L19.5392 14.5L18.8321 15.2071L17.4179 13.7929ZM17.4179 22.2071L13.9179 18.7071L15.3321 17.2929L18.8321 20.7929L17.4179 22.2071ZM13.9179 17.2929L17.4179 13.7929L18.8321 15.2071L15.3321 18.7071L13.9179 17.2929ZM14.625 17H24V19H14.625V17Z"
          fill={splitedPath === "allTaskToMe" ? "#0076C8" : "#131516"}
        />
      </svg>
    </>
  );
}

export default ToMeIcon;
