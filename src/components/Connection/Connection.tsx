// @ts-nocheck
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { VariableSizeList } from "react-window";

// redux
//@ts-ignore
import { useDispatch, useSelector } from "react-redux";
import { userApiAction } from "redux/action/user.action";
import { RootState } from "redux/reducers";

// types
// component
import NoData from "components/Chat/NoData";
import useResponsive from "hooks/useResponsive";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const [apiCalled, setApiCalled] = useState(false);
  const { userAllContacts, loadingContacts } = useSelector(
    (state: RootState) => state.user
  );
  const isTabOrMobile = useResponsive("down", "sm", "");
  const { user } = useSelector((state: RootState) => state.auth);
  const headerHeight = isTabOrMobile ? 75 : 110;
  const [windowHeight, setWindowHeight] = useState<number>(
    window.innerHeight - headerHeight
  );

  useEffect(() => {
    if (!apiCalled) {
      const payload = {
        other: { userId: user._id },
      };

      userAllContacts.length < 1 &&
        dispatch(userApiAction.getUserContacts(payload));
      setApiCalled(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight - headerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [headerHeight]);

  const ContactRow = ({ index, style }: any) => {
    const userContact = userAllContacts[index];
    const {
      contactFirstName,
      contactSurName,
      contactFullName,
      isCeiborUser,
      isBlocked,
      userCeibroData,
    } = userContact;

    return (
      <ConnectionCard
        listIndex={index}
        style={style}
        ceibroUserData={userCeibroData}
        firstName={contactFirstName}
        surName={contactSurName}
        companyName={userCeibroData?.companyName}
        contactFullName={contactFullName}
        isBlocked={isBlocked}
        isCeiborUser={isCeiborUser}
        profilePic={userCeibroData?.profilePic}
      />
    );
  };

  return (
    <>
      {loadingContacts && (
        <Box sx={{ textAlign: "center", mt: "10%" }}>
          <CircularProgress size={35} />
        </Box>
      )}
      {!loadingContacts && userAllContacts.length < 1 ? (
        <NoData title="No Data Found" />
      ) : (
        <div style={{ position: "relative" }} id="Contactscontainer">
          <VariableSizeList
            height={windowHeight}
            itemCount={userAllContacts.length}
            itemSize={() => 57}
            width={"100%"}
          >
            {ContactRow}
          </VariableSizeList>
        </div>
      )}
    </>
  );
};

export default Connections;
