import { Button } from "@mui/material";
import { useState } from "react";

interface Props {
  less: string;
  more: string;
  data: any;
  count: number;
}

const ShowmoreComponent = ({ less, more, data, count }: Props) => {
  const [showMore, setShowMore] = useState(false);

  const handleClick = (event: any) => {
    event.stopPropagation();
    setShowMore((prev) => !prev);
  };

  const ShowmoreFun = () => {
    return (
      <>
        <pre
          style={{
            color: "#131516",
            fontSize: "14px",
            fontWeight: "500",
            fontFamily: "Inter",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
          }}
        >
          {data && data?.length < count ? (
            data
          ) : showMore ? (
            <>
              {`${data} `}
              <Button
                onClick={handleClick}
                style={{
                  textTransform: "unset",
                  marginLeft: "5px",
                  color: "#0076C8",
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {less}
              </Button>
            </>
          ) : (
            <>
              {`${data.substring(0, count)} ...`}
              <Button
                onClick={handleClick}
                style={{
                  marginLeft: "-6px",
                  border: "none",
                  textTransform: "unset",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  color: "#0076C8",
                  fontWeight: "500",
                  fontSize: "12px",
                }}
              >
                {more}
              </Button>
            </>
          )}
        </pre>
      </>
    );
  };

  return <ShowmoreFun />;
};

export default ShowmoreComponent;
