interface Props {
  markers: {
    id: string;
    x: number;
    y: number;
  }[];
}
function PinVewer(props: Props) {
  const { markers } = props;
  return (
    <>
      {markers &&
        markers.map((overlay, index) => (
          <div
            id={overlay.id}
            key={index}
            style={{
              background: "red",
              borderRadius: "50%",
              color: "white",
              padding: "6px",
            }}
          >
            <p>pin {index}</p>
          </div>
        ))}
    </>
  );
}

export default PinVewer;
