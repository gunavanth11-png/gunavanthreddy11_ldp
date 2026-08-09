import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import type { SxProps, Theme } from "@mui/material/styles";

export interface SearchInputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  sx?: SxProps<Theme>;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search any candidate",
  sx,
}: SearchInputProps) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      variant="outlined"
      sx={(theme) => ({
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
        ...sx,
      })}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              sx={(theme) => ({
                fontSize: 18,
                color: theme.palette.text.secondary,
              })}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}
