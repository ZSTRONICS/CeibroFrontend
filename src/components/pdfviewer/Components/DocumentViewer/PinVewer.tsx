interface Props {
  markers: {
    x: number;
    y: number;
    taskUID: string;
    _id: string;
    taskRootState: string;
  }[];
}
function PinVewer(props: Props) {
  const { markers } = props;
  return (
    <>
      {markers &&
        markers.map((marker, index) => (
          <div
            id={marker._id}
            key={index}
            style={{
              background: "red",
              borderRadius: "50%",
              color: "white",
              padding: "6px",
              width: "80px",
            }}
          >
            <p>{marker.taskUID}</p>
          </div>
        ))}
    </>
  );
}

export default PinVewer;
