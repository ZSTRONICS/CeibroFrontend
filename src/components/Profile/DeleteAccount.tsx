import { Container, Divider } from "@mui/material";
import assets from "assets";
import { LoadingButton } from "components/Button";
import {
  CustomStack,
  DocumentNameTag,
  SubHeading,
} from "components/CustomTags";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser, userApiAction } from "redux/action";
import { purgeStoreStates } from "redux/store";
import { socket } from "services/socket.services";
import { LOGIN_ROUTE } from "utills/axios";

interface Props {
  closeDialog: () => void;
}
function DeleteAccount(props: Props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleCancel = () => {
    history.push("/profile");
    props.closeDialog();
  };
  function handleClick(): void {
    dispatch(
      userApiAction.deleteUser({
        success: () => {
          history.push(LOGIN_ROUTE);
          socket.getSocket()?.emit("logout-window");
          localStorage.removeItem("showFullView");
          dispatch(logoutUser());
          purgeStoreStates();
          props.closeDialog();
        },
      })
    );
  }

  return (
    <>
      <Container
        sx={{
          margin: "0 auto",
          width: "100%",
          padding: "22px 24px",
          textAlign: "center",
        }}
      >
        <CustomStack sx={{ flexDirection: "column", gap: 2 }}>
          <div
            style={{
              width: "282px",
              height: "222px",
              background: `url(${assets.ConfirmDeleteWebp}) no-repeat`,
              backgroundSize: "100%",
            }}
          ></div>
          <SubHeading sx={{ color: "black", fontSize: "20px" }}>
            Are you sure to delete your account?
          </SubHeading>
          <DocumentNameTag
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#3C3C4399",
              px: 4.5,
            }}
          >
            We will only retain your user data for 30 days and it will be
            permanently deleted. You can reactivate your account at the point
            within 30 days of deactivation by logging back in. Please enter
            password for confirmation.
          </DocumentNameTag>
          <Divider
            sx={{ color: "#818181", width: "100%", borderWidth: "1px" }}
          />
          <CustomStack
            sx={{
              width: "100%",
              px: 2,
              justifyContent: "space-between",
              //   borderTop: "1px solid #818181",
            }}
          >
            <LoadingButton
              onClick={handleCancel}
              variant="text"
              sx={{
                fontSize: "14px",
                color: "#5856D6",
                fontWeight: "500",
              }}
            >
              CANCEL
            </LoadingButton>
            <LoadingButton
              onClick={() => handleClick()}
              variant="text"
              sx={{
                fontSize: "14px",
                color: "#D9000D",
                fontWeight: "500",
              }}
            >
              DELETE
            </LoadingButton>
          </CustomStack>
        </CustomStack>
      </Container>
    </>
  );
}

export default DeleteAccount;
