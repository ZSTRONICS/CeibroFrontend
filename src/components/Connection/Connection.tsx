import { useEffect, useRef, useState } from "react";
import { VariableSizeList } from "react-window";

// redux
import { useDispatch, useSelector } from "react-redux";
import { userApiAction } from "redux/action/user.action";
import { RootState } from "redux/reducers/appReducer";

// component
import NoData from "components/NotFound/NoData";
import { ConnectionCardSkeleton } from "components/material-ui/skeleton";
import { Contact } from "constants/interfaces";
import useResponsive from "hooks/useResponsive";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const isRenderEffect = useRef<any>(false);
  const containerRef = useRef<any>(null);

  const { userAllContacts, loadingContacts } = useSelector(
    (state: RootState) => state.user
  );
  const isTabOrMobile = useResponsive("down", "sm", "");
  const headerHeight = isTabOrMobile ? 80 : 120;
  const [windowHeight, setWindowHeight] = useState<number>(
    window.innerHeight - headerHeight
  );

  useEffect(() => {
    if (!isRenderEffect.current) {
      userAllContacts.length < 1 && dispatch(userApiAction.getUserContacts());
    }
    return () => {
      isRenderEffect.current = true;
    };
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
    const userContact: Contact = userAllContacts[index];
    if (!userContact) {
      return <></>;
    }
    const {
      contactFirstName,
      contactSurName,
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
        isBlocked={isBlocked}
        isCeiborUser={isCeiborUser}
        profilePic={userCeibroData?.profilePic}
      />
    );
  };

  return (
    <>
      {loadingContacts ? (
        Array.from({ length: 10 }).map((_, index) => (
          <ConnectionCardSkeleton key={index} />
        ))
      ) : userAllContacts.length < 1 ? (
        <NoData title="No Data Found" />
      ) : (
        <div
          style={{
            position: "relative",
            minWidth: "960",
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "7px",
            height: "100%",
            width: "100%",
          }}
          id="Contactscontainer"
          ref={containerRef}
        >
          <VariableSizeList
            height={windowHeight + 35}
            style={{
              paddingBottom: "2rem",
            }}
            itemCount={userAllContacts.length}
            overscanCount={13}
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
