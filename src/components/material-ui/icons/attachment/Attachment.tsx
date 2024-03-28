import { Fragment } from "react";

export function AttachmentIcon(props: any) {
  return (
    <Fragment>
      <svg
        width="14"
        height="16"
        viewBox="0 0 14 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M13.2223 8.00016L7.71096 13.4834C6.94931 14.2411 5.9163 14.6668 4.83916 14.6668C2.59615 14.6668 0.777832 12.8578 0.777832 10.6262C0.777832 9.55458 1.20572 8.52684 1.96737 7.76908L7.64293 2.12247C8.15069 1.6173 8.83937 1.3335 9.55746 1.3335C11.0528 1.3335 12.265 2.53952 12.265 4.02724C12.265 4.74166 11.9798 5.42682 11.472 5.932L5.96067 11.4152C5.70679 11.6678 5.36245 11.8097 5.0034 11.8097C4.25573 11.8097 3.64963 11.2067 3.64963 10.4628C3.64963 10.1056 3.79226 9.76302 4.04614 9.51044L9.39322 4.19064"
          stroke="#0075D0"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </Fragment>
  );
}

const AddIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );
};

const SubtractIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M19 13H5v-2h14v2z" />
    </svg>
  );
};
const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
};

export { AddIcon, HomeIcon, SubtractIcon };
