import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material"; // importing matrial UI package
import { Routes, Route } from "react-router-dom";
import ListCustomers from "./pages/ListCustomers"; // used for importing react components
import Header from "./components/Header";
import Bookings from "./pages/Bookings";

// The main application function
function App() {
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Header />
        <Routes>
          <Route path="" element={<ListCustomers />} />
          <Route path="bookings/:customerId" element={<Bookings />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
