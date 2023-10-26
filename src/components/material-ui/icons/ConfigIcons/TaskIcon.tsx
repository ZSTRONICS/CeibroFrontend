import { useLocation } from "react-router-dom";

function TaskIcon() {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  return (
    <>
      <svg
        width="25"
        height="26"
        viewBox="0 0 25 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.3609 4.66672H20.8332V21.3334C20.8332 22.1004 20.2113 22.7223 19.4443 22.7223H5.55539C4.78833 22.7223 4.1665 22.1004 4.1665 21.3334V4.66672H7.63873M8.33317 3.27783H16.6665V6.05561C16.6665 6.82267 16.0447 7.4445 15.2776 7.4445H9.72206C8.955 7.4445 8.33317 6.82267 8.33317 6.05561V3.27783Z"
          stroke={path === "tasks" ? "#131516" : "#F1B740"}
        />
      </svg>
    </>
  );
}

export default TaskIcon;
