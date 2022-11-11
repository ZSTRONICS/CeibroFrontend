//@ts-nocheck
import { makeStyles } from "@material-ui/core";
import colors from "../../../assets/colors";

interface NameAvatarProps {
  firstName: string;
  surName?: string;
  background?: string;
  url?: string;
  variant?: "small" | "large" | "custom";
}

const NameAvatar: React.FC<NameAvatarProps> = (props) => {
  const classes = useStyles();
  const { firstName, surName, url, variant = "small" } = props;
  const letters =
    firstName?.[0]?.toUpperCase?.() + (surName?.[0]?.toUpperCase?.() || "");

  const getImageClass = () => {
    return variant === "small"
      ? classes.outerWrapper
      : variant === "large"
      ? classes.imgWrapper
      : "";
  };

  return (
    <>
      {!url && (
        <div
          className={classes.letterAvater}
        >
          {letters}
        </div>
      )}

      {url && (
        <div className={getImageClass()}>
          <img src={url} className={classes.img} />
        </div>
      )}
    </>
  );
};

export default NameAvatar;

const useStyles = makeStyles({
  outerWrapper: {
    border: `1px solid ${colors.secondaryGrey}`,
    background: colors.secondaryGrey,
    width: "40px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
    borderRadius: 4,
  },
  letterAvater:{
    border: `1px solid ${colors.secondaryGrey}`,
     padding: '8px 8px',
     display: 'flex',
     justifyContent: 'center',
     alignItems:'center',
      // marginTop: '5px' 
  },
  imgWrapper: {
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    borderRadius: 4,
  },
  img: {
    width: "100%",
    height: "auto",
  },
});
