import { Outlet } from "react-router-dom";
import Navbar from './Navbar';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Outlet />
    </ThemeProvider>
  )
}