import { useNavigate } from 'react-router-dom';
import { Box, ButtonBase } from '@mui/material';

export const SideNavItem = ({ active, icon, path, title }) => {

  const navigate = useNavigate();
  // const linkProps = path
  //   ? external
  //     ? {
  //       component: 'a',
  //       href: path,
  //       target: '_blank'
  //     }
  //     : {
  //       // component: NextLink,
  //       href: path
  //     }
  //   : {};

  return (
    <li key={title}>
      <ButtonBase
        onClick={() => navigate(path)}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '10px',
          pr: '16px',
          py: '10px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(255, 255, 255, 0.06)'
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }
        }}
      // {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: '#9da4ae',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'primary.main'
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: '#9da4ae',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 17,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white'
            }),
            //   ...(disabled && {
            //     color: 'neutral.500'
            //   })
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};
