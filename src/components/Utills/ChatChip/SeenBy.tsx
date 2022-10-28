import React from "react";
import { makeStyles } from "@material-ui/core";
import colors from "assets/colors";

interface SeenByInt {
  url: string | any;
  firstName: string;
  surName: string;
}

const SeenBy: React.FC<SeenByInt> = (props) => {
  const { url, firstName, surName } = props;
  const classes = useStyles();

  const letters =
    firstName?.[0]?.toUpperCase?.() + (surName?.[0]?.toUpperCase?.() || "");
  return (<>
      { url ?(<div className={classes.seenAvatar}>
     <img src={url} className={classes.seenChip} />
    </div>):(
          <div className={classes.lettersAvatar}>
          {letters}
          </div>
        ) }
  </>
  );
};

export default SeenBy;

const useStyles = makeStyles({
  lettersAvatar:{
padding: '3px 4px',
  background: colors.grey,
  fontSize: 10,  
},
  seenAvatar: {
    width: 20,
    // background: colors.grey,
    fontSize: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  seenChip: {
    width: "100%",
    height: '85%',
    borderRadius: '100%',
  },
});
