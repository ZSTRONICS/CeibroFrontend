import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import {
  userApiAction
} from "redux/action/user.action";

import { useDispatch, useSelector } from "react-redux";

import NoData from "components/Chat/NoData";
import { Contact } from "constants/interfaces/user.interface";
import { useHistory } from "react-router-dom";
import { RootState } from "redux/reducers";
import ConnectionCard from "./ConnectionCard";
interface IConnectionsProps {}

const Connections: React.FunctionComponent<IConnectionsProps> = (props) => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const [apiCalled, setApiCalled] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const { userAllContacts, loadingContacts } = useSelector(
    (state: RootState) => state.user
  );

  const sortedData: Contact[] = userAllContacts.sort((a: any, b: any) => {
    const aName = a.contactFirstName.toLowerCase();
    const bName = b.contactFirstName.toLowerCase();
    if (aName < bName) {
      return -1;
    } else if (aName > bName) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    if (containerRef.current) {
      if (!apiCalled) {
        const payload = {
          other: { userId: user._id },
        };

        userAllContacts.length < 1 &&
          dispatch(userApiAction.getUserContacts(payload));
        setApiCalled(true);
      }
    }
  }, []);

  useLayoutEffect(() => {
    const conectionContainer: any =
      document.getElementById("conectionContainer");
    if (conectionContainer) {
      conectionContainer.scrollTop = 0;
    }
  });


  return (
    <>
      {loadingContacts && (
        <Box sx={{ textAlign: "center", mt: "10%" }}>
          <CircularProgress size={35} />
        </Box>
      )}
      {loadingContacts === false && userAllContacts.length < 1 && (
        <NoData title="No Data Found" />
      )}
      <Box
        ref={containerRef}
        id="conectionContainer"
        sx={{
          maxHeight: { md: "calc(100vh - 120px)", xs: "calc(100vh - 90px)" },
          overflowY: "auto",
        }}
        px={1}
      >
        {sortedData &&
          sortedData.map((userContact: Contact) => {
            const {
              contactFirstName,
              contactSurName,
              userCeibroData,
              contactFullName,
              isBlocked,
              isCeiborUser,
            } = userContact;

            return (
              <Box key={userContact._id}>
                <ConnectionCard
                ceibroUserData={userCeibroData}
                  firstName={contactFirstName}
                  surName={contactSurName}
                  companyName={userCeibroData?.companyName}
                  contactFullName={contactFullName}
                  isBlocked={isBlocked}
                  isCeiborUser={isCeiborUser}
                  profilePic={userCeibroData?.profilePic}
                 
                />
              </Box>
            );
          })}
      </Box>
    </>
  );
};

export default Connections;
