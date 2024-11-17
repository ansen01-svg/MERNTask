import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectInput(props) {
  const { label, labelFor, placeholder, value, handleChange, options } = props;

  return (
    <div className="w-full flex flex-col items-start justify-center gap-2">
      <label
        htmlFor={labelFor}
        className="text-[14px] text-primaryLight font-medium"
      >
        {label}
      </label>
      <FormControl
        sx={{
          ".MuiInputBase-root": {
            fontSize: "13px",
          },
          ".MuiSelect-select": { padding: "8px 10px" },
        }}
        fullWidth
        variant="outlined"
      >
        <Select
          displayEmpty
          placeholder={placeholder}
          name={labelFor}
          id={labelFor}
          value={value}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span style={{ color: "#9ca3af" }}>{placeholder}</span>;
            }

            return selected;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            ".MuiButtonBase-root": {
              fontSize: "13px",
            },
          }}
        >
          <MenuItem disabled value="" sx={{ fontSize: "13px" }}>
            <span>{placeholder}</span>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option} value={option} sx={{ fontSize: "13px" }}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
