interface Props {
  color: string;
}
export function PinIcon(props: Props) {
  const { color } = props;
  return (
    <span style={{ transform: "translateX(68px)" }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5.5 10.5L2 7L10 2L14 6L9 14L5.5 10.5Z" fill="#0076C8" />
        <path
          d="M1 15L5.5 10.5M1 6L10 15M9 1L15 7M2 7L10 2M9 14L14 6"
          stroke={color}
          stroke-width="1.5"
        />
      </svg>
    </span>
  );
}
