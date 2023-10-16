import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { TopBarTitle } from "components/CustomTags";
import useResponsive from "hooks/useResponsive";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { LOGIN_ROUTE } from "utills/axios";
import AuthLayout from "../AuthLayout/AuthLayout";
import useStyles from "./RegisterStyles";

export default function TermsAndConditions() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const isTabletOrMobile = useResponsive("down", "md", "");

  return (
    <AuthLayout title={t("auth.terms_conditions")}>
      {isTabletOrMobile && (
        <div>
          <TopBarTitle sx={{ fontSize: 28, pb: 3 }}>
            Terms & Conditions
          </TopBarTitle>
        </div>
      )}
      <div>
        <Typography variant="body1" className={classes.termsConditions}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur? But I must explain
          to you how all this mistaken idea of denouncing pleasure and praising
          pain was born and I will give you a complete account of the system,
          and expound the actual teachings of the great explorer of the truth,
          the master-builder of human happiness. No one rejects, dislikes, or
          avoids pleasure itself, because it is pleasure, but because those who
          do not know how to pursue pleasure rationally encounter consequences
          that are extremely painful. Nor again is there anyone who loves or
          pursues or desires to obtain pain of itself, because it is pain, but
          because occasionally circumstances occur in which toil and pain can
          procure him some great pleasure. To take a trivial example, which of
          us ever undertakes laborious physical exercise, except to obtain some
          advantage from it? But who has any right to find fault with a man who
          chooses to enjoy a pleasure that has no annoying consequences, or one
          who avoids a pain that produces no resultant pleasure?
        </Typography>
        <FormControlLabel
          sx={{ gap: 1 }}
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              name="checkedB"
              color="primary"
              style={{ padding: 0 }}
            />
          }
          // className={classes.remember}
          style={{ padding: 0 }}
          label={
            <Typography sx={{ fontSize: "14px" }}>
              Yes, I understand and agree to the Terms & Conditions of Ceibro.
            </Typography>
          }
        />
        <Grid
          container
          spacing={1}
          sx={{ padding: "16px 0" }}
          justifyContent="space-between"
        >
          <Grid item xs={3}>
            <Button
              variant="outlined"
              sx={{ width: "100%", borderColor: "#000", color: "#000" }}
              onClick={() => history.push(LOGIN_ROUTE)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={9}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                "&:disabled": {
                  backgroundColor: "#f4f4f4",
                  borderColor: "#fff",
                },
              }}
              disabled={!checked}
              onClick={() => history.push("/profile-setup")}
            >
              Confirm
            </Button>
          </Grid>
        </Grid>
      </div>
    </AuthLayout>
  );
}
