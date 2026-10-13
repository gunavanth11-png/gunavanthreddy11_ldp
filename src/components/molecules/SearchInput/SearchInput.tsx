import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import type { SxProps, Theme } from "@mui/material/styles";
import { DEFAULT_SEARCH_PLACEHOLDER } from "../../../utils/constants";

export interface SearchInputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  sx?: SxProps<Theme>;
}

const searchInputStyles: SxProps<Theme> = (theme) => ({
  width: 360,
  "& .MuiOutlinedInput-root": {
    height: 40,
    borderRadius: `${theme.shape.borderRadius}px`,
    backgroundColor: theme.palette.background.paper,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
    "& fieldset": {
      borderColor: theme.palette.customBorder.dark,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.text.secondary,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1px",
    },
  },
  "& .MuiInputBase-input": {
    py: 0,
  },
  "& .MuiInputBase-input::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 1,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: 400,
  },
});

const searchIconStyles: SxProps<Theme> = (theme) => ({
  fontSize: 18,
  color: theme.palette.text.secondary,
});

const SearchInput = ({
  value,
  onChange,
  placeholder = DEFAULT_SEARCH_PLACEHOLDER,
  sx,
}: SearchInputProps) => {
  const inputStyles = sx
    ? [searchInputStyles, ...(Array.isArray(sx) ? sx : [sx])]
    : searchInputStyles;

  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      variant="outlined"
      sx={inputStyles}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={searchIconStyles} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchInput;
