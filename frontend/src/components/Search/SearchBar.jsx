import { Box, InputAdornment, OutlinedInput, SvgIcon, TextField, Typography } from '@mui/material';
import propTypes from 'prop-types';

import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = ({ setSearchKeyword }) => (
  <Box >
    <TextField
      variant="standard"
      defaultValue=""
      fullWidth
      placeholder="Search..."
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
      sx={{ maxWidth: 500, height: '6vh' }}
    />
 </Box>
);

SearchBar.propTypes = {
  setSearchKeyword: propTypes.func.isRequired,
};
