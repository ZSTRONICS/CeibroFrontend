import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Box, Drawer } from '@mui/material';
// hooks
import assets from 'assets/assets';
import Sidebar from 'components/Sidebar/Sidebar';
import useResponsive from '../../../hooks/useResponsive';

const NAV_WIDTH = 200;

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

interface Props{
  openNav:any
 onCloseNav:any
}

export default function Nav({ openNav, onCloseNav }:Props) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg', "");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <Box sx={{display: 'inline-flex' }}>
      <img src={assets.logo} alt="ceibro-logo" />
      </Box>

      {/* <Box> */}
      <Sidebar />
      {/* </Box> */}

      {/* <NavSection data={navConfig} /> */}

      {/* <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
      
          
        </Stack>
      </Box> */}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}