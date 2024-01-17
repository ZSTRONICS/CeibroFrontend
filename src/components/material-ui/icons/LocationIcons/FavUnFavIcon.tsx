const FavIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12.5087 9.59682L13.0965 10.9815L14.5952 11.1108L15.9006 11.2233L14.9114 12.0819L13.7746 13.0685L14.1146 14.5347L14.4089 15.8038L13.2918 15.1296L12 14.3499L10.7082 15.1296L9.60066 15.7981L9.89463 14.538L10.2374 13.0685L9.09693 12.0804L8.11542 11.2301L9.40134 11.1211L10.9035 10.9936L11.4918 9.60557L12.0017 8.4024L12.5087 9.59682Z"
        stroke="#F1B740"
        strokeWidth="5"
      />
    </svg>
  );
};
const UnFavIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
    >
      <path
        d="M22 9.74L14.81 9.12L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77L18.18 21.5L16.55 14.47L22 9.74ZM12 15.9L8.24 18.17L9.24 13.89L5.92 11.01L10.3 10.63L12 6.6L13.71 10.64L18.09 11.02L14.77 13.9L15.77 18.18L12 15.9Z"
        fill="black"
      />
    </svg>
  );
};

export { FavIcon, UnFavIcon };
