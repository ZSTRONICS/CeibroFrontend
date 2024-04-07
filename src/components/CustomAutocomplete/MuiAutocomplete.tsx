import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { OptionType } from "components/Tasks/type";
import { hasOnlySpaces } from "components/Utills/Globals";
import { useDispatch } from "react-redux";
import { taskActions } from "redux/action";

const filter = createFilterOptions<OptionType>();
interface IProps {
  inputLabel: string;
  placeholder: string;
  options: OptionType[] | null;
  onChangeValues: (value: any | OptionType[]) => void;
}
export default function MuiAutocomplete(props: IProps) {
  const { inputLabel, options, onChangeValues, placeholder } = props;
  const dispatch = useDispatch();
  const handleCreateTitle = (label: string): void => {
    if (hasOnlySpaces(label)) {
      return;
    }
    if (label.length > 0) {
      dispatch(
        taskActions.createTopic({
          body: {
            topic: label,
          },
          success: (res) => {
            if (res.data.newTopic) {
              dispatch(taskActions.getAllTopic());
            }
          },
        })
      );
    }
  };

  return (
    <Autocomplete
      size="small"
      multiple
      limitTags={2}
      onKeyDown={(event: any) => {
        if (event.key === "Enter") {
          event.defaultMuiPrevented = true;
          return;
        }
      }}
      onChange={(event, newValue) => {
        const updatedValue = newValue.map((option: OptionType | any) => {
          if (String(option.label).startsWith("Add ")) {
            const newLabel = option.label.substring(4);
            handleCreateTitle(newLabel);
            return Object.assign(option, {
              label: newLabel,
            });
          }
          return option;
        });
        onChangeValues(updatedValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        if (
          filtered.length === 0 &&
          inputValue !== "" &&
          !hasOnlySpaces(inputValue)
        ) {
          filtered.push({
            label: `Add ${inputValue}`,
            value: inputValue,
          });
        }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="tags-standard"
      options={options ? options : []}
      sx={{ width: "97%", m: 0.45 }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label={inputLabel}
          inputProps={{ ...params.inputProps, maxLength: 100 }}
          placeholder={placeholder}
        />
      )}
    />
  );
}
