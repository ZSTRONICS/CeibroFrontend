import {
  Grid,
  Typography,
  makeStyles,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormGroup,
  Checkbox,
  CheckboxProps,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useState } from "react";
import colors from "../../../assets/colors";
import { QuestioniarInterface } from "../../../constants/interfaces/questioniar.interface";
import { RadioProps } from "@material-ui/core/Radio";
import { CheckBox } from "@material-ui/icons";
interface multipleQuestionInt {
  question: QuestioniarInterface;
}

const CheckBoxQuestion: React.FC<multipleQuestionInt> = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<any>(1);
  const {
    question: { type, question, options },
  } = props;

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log((event.target as HTMLInputElement).value);
    setSelected(+(event.target as HTMLInputElement).value);
  };

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12}>
        <Typography className={classes.question}>{question}</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormGroup>
            {options?.map((option: string, index: number) => {
              return (
                <FormControlLabel
                  key={index}
                  className={`options-text ${classes.smallRadioButton}`}
                  control={<CustomCheckbox name={option} />}
                  label={option}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CheckBoxQuestion;

const useStyles = makeStyles({
  wrapper: {
    paddingTop: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: 500,
  },
  smallRadioButton: {
    fontSize: "14px !important",
    "& svg": {
      width: "0.8em",
      height: "0.8em",
    },
    "&$checked": {
      color: "green",
    },
  },
});


const CustomCheckbox = withStyles({
  root: {
    '&$checked': {
      color: colors.darkYellow,
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);