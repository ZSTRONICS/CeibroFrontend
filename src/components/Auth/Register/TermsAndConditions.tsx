import React from "react";
import useStyles from "./RegisterStyles";
import { Typography, Button, Grid } from "@mui/material";
import assets from "assets/assets";
import { CBox } from "components/material-ui";

export default function TermsAndConditions() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.logoWrapper}>
        <img src={assets.logo} alt="ceibro-logo" />
      </div>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>Terms & Conditions</Typography>
      </div>
      <Typography variant="body1" className={classes.termsConditions}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur? But I must explain to you how all this mistaken
        idea of denouncing pleasure and praising pain was born and I will give
        you a complete account of the system, and expound the actual teachings
        of the great explorer of the truth, the master-builder of human
        happiness. No one rejects, dislikes, or avoids pleasure itself, because
        it is pleasure, but because those who do not know how to pursue pleasure
        rationally encounter consequences that are extremely painful. Nor again
        is there anyone who loves or pursues or desires to obtain pain of
        itself, because it is pain, but because occasionally circumstances occur
        in which toil and pain can procure him some great pleasure. To take a
        trivial example, which of us ever undertakes laborious physical
        exercise, except to obtain some advantage from it? But who has any right
        to find fault with a man who chooses to enjoy a pleasure that has no
        annoying consequences, or one who avoids a pain that produces no
        resultant pleasure?
      </Typography>
      <Grid container spacing={1} sx={{ padding: "16px" }}>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            sx={{ width: "100%", borderColor: "#000", color: "#000" }}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              borderColor: "#000",
              color: "#000",
              "&:disabled": {
                backgroundColor: "#f4f4f4",
                borderColor: "#fff",
              },
            }}
            disabled
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
