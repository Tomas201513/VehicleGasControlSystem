import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = ({ setSearchKeyword }) => (
  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search customer"
      onChange={(e) => setSearchKeyword(e.target.value)}
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <SearchIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
);
