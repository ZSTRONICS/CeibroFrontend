import { Box } from "@mui/material";
import { Heading2 } from "components/CustomTags";
import { InputSearch } from "components/GenericComponents";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import DrawingFileCard from "./DrawingFileCard";

interface Props {
  windowActualHeight: number;
}
function LocationDrawingFiles({ windowActualHeight }: Props) {
  const [searchText, setSearchText] = useState("");
  const searchContainer: any = useRef(null);
  const [contHeight, setContHeight] = useState<number>(50);
  const { selectedDrawingFiles } = useSelector(
    (state: RootState) => state.project
  );
  useEffect(() => {
    if (searchContainer.current) {
      setContHeight(searchContainer.current.clientHeight + 25);
    }
  }, [windowActualHeight]);

  const handleSearchTextChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  return (
    <>
      <Box>
        <Box
          ref={searchContainer}
          sx={{
            pt: 1.25,
          }}
        >
          <InputSearch value={searchText} onChange={handleSearchTextChange} />
          <Heading2 sx={{ py: 2 }}>Drawing Files</Heading2>
        </Box>
        <Box
          sx={{
            height: `${windowActualHeight - contHeight}px`,
            overflow: "auto",
          }}
        >
          {selectedDrawingFiles.length > 0 ? (
            selectedDrawingFiles.map((drawing: any) => {
              return <DrawingFileCard drawing={drawing} />;
            })
          ) : (
            <>No Drawing file Found!</>
          )}
        </Box>
      </Box>
    </>
  );
}

export default LocationDrawingFiles;
