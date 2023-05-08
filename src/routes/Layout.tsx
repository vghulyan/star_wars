import { useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import TopNav from 'src/top-nav/TopNav';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { getMyTheme } from 'src/theme/AppTheme';
import ThemeContext from 'src/theme/ThemeContext';
import Grid from '@mui/material/Unstable_Grid2';
import { GREY } from 'src/theme/palette';

const Layout = () => {
  const themeContext = useContext(ThemeContext);
  const theme: Theme = useMemo(() => {
    return createTheme(getMyTheme(themeContext.currentTheme));
  }, [themeContext.currentTheme]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <CssBaseline />

        <TopNav />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? GREY[100] : null
          }}
        >
          <Grid
            container
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? GREY[100] : null
            }}
            pb={5}
          >
            <Outlet />
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
