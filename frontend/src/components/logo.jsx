import { useTheme } from '@mui/material/styles';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <svg
      fill="none"
      height="100%"
      viewBox="0 0 24 24"
      width="100%"
    >
      <LocalGasStationIcon sx={{ fontSize: 40, color: fillColor, }} />

    </svg>
  );
};