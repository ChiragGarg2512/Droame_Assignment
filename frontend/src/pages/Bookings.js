import { useState, useEffect } from "react"; // import the react package
import axios from "../utils/axios"; // axios file from utils
import { useLocation, useNavigate } from "react-router-dom"; // used for the useLocation and useNavigate from react-router-dom
import {
  Box,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
  Button,
  TextField,
  Snackbar,
  Alert,
  Backdrop,
} from "@mui/material"; // materials from MUI(Material UI)
import BookingCard from "../components/BookingCard"; // Bookingcard react component is imported with all its functionalities
import AddIcon from "@mui/icons-material/Add"; // Used for the add icon present in the MUI
import CreateBooking from "../components/CreateBooking"; // Createcard react component is imported with all its functionalities
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // imports the ArrowBack icon from the MUI

export default function Bookings() {
  const [bookings, setBookings] = useState(null);
  const [alert, setAlert] = useState(false);
  const [originalBookings, setOriginalBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createBdo, setCreateBdo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Function for the search bar
  function searchQuery(searchTerm) {
    if (searchTerm !== "") {
      const filteredBookings = originalBookings.filter((booking) => {
        return (
          booking._id.includes(searchTerm) ||
          booking.locationID.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setBookings(filteredBookings);
    } else {
      setBookings(originalBookings);
    }
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 96,
        height: 96,
        fontSize: "48px",
      },
      children:
        name.split(" ").length === 2
          ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
          : `${name.split(" ")[0][0]}`,
    };
  }

  useEffect(() => {
    axios
      .get(`/booking/${location.pathname.split("/")[2]}`)
      .then((res) => {
        setBookings(res.data);
        setOriginalBookings(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setAlert(true);
        console.log(e);
      });
  }, []);

  return (
    <>
      <Snackbar
        open={alert}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlert(false)}
      >
        <Alert severity="error" variant="filled">
          Cannot connect to server!
        </Alert>
      </Snackbar>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={createBdo}
      >
        <CreateBooking
          setCreateBdo={setCreateBdo}
          setBookings={setBookings}
          setOriginalBookings={setOriginalBookings}
          customer={location.pathname.split("/")[2]}
        />
      </Backdrop>

      {loading ? (
        <Box
          sx={{
            position: "fixed",
            left: "45vw",
            top: "40vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress size={70} />
          <Typography variant="h4" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <>
          <Button
            variant="contained"
            color="success"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{ position: "fixed", right: "10px", top: "10px" }}
          >
            Back
          </Button>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ minWidth: "60vw" }}>
              <Paper
                elevation={6}
                sx={{
                  p: 2,
                  pl: 4,
                  pr: 4,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
                    {location.state.name}
                  </Typography>
                  <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                    #{location.state._id}
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>
                    <strong>Phone no: </strong>
                    {location.state.contact}
                  </Typography>
                  <Typography sx={{ fontSize: 18 }}>
                    {location.state.email}
                  </Typography>

                  <Typography sx={{ fontSize: 22 }}>
                    <strong>No. of bookings: </strong>
                    {bookings.length}
                  </Typography>
                </Box>
                <Avatar {...stringAvatar(location.state.name)} />
              </Paper>

              <Box
                sx={{
                  p: 1,
                  mt: 4,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontSize: 25, fontWeight: 700 }}>
                  Bookings:
                </Typography>

                <TextField
                  name="name"
                  label="Search"
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: "40%" }}
                  onChange={(e) => searchQuery(e.target.value)}
                />

                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AddIcon />}
                  onClick={() => setCreateBdo(true)}
                >
                  Add Booking
                </Button>
              </Box>

              {bookings.map((booking, id) => {
                return (
                  <BookingCard
                    booking={booking}
                    key={id}
                    customer={location.pathname.split("/")[2]}
                    setBookings={setBookings}
                    setOriginalBookings={setOriginalBookings}
                  />
                );
              })}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
