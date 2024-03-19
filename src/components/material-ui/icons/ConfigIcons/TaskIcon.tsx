import { useLocation } from "react-router-dom";
interface Props {
  color?: string;
}
function TaskIcon(props: Props) {
  const { color } = props;
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
          d="M3.96528 2.33377H1.1875V15.6671C1.1875 16.2807 1.68496 16.7782 2.29861 16.7782H13.717M4.52083 1.22266H11.1875V3.44488C11.1875 4.05853 10.69 4.55599 10.0764 4.55599H5.63194C5.01829 4.55599 4.52083 4.05853 4.52083 3.44488V1.22266Z"
          stroke={color ? `${color}` : path === "tasks" ? "#131516" : "#605C5C"}
          strokeWidth="2"
        />
        <path
          d="M13.7014 16.7726C14.315 16.7726 14.8125 16.2751 14.8125 15.6615V2.32812H12.0347"
          stroke={color ? `${color}` : path === "tasks" ? "#131516" : "#605C5C"}
          strokeWidth="2"
        />
      </svg>
    </>
  );
}

export default TaskIcon;
