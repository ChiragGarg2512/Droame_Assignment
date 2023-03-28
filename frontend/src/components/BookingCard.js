import {
  Divider,
  IconButton,
  Paper,
  Typography,
  Box,
  Backdrop,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useReducer, useEffect } from "react";
import DeleteBooking from "./DeleteBooking";
import EditBooking from "./EditBooking";

const initialState = {
  editBdo: false,
  deleteBdo: false,
  droneShotID: "",
  locationID: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateEditBackdrop":
      return { ...state, editBdo: action.payload };
    case "updateDeleteBackdrop":
      return { ...state, deleteBdo: action.payload };
    case "updateShotID":
      return { ...state, droneShotID: action.payload };
    case "updateLocation":
      return { ...state, locationID: action.payload };
    default:
      throw new Error();
  }
}

// This is the format in how the booking data is shown on screen
export default function BookingCard({
  booking,
  customer,
  setOriginalBookings,
  setBookings,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const date = new Date(booking.createdAt);

  useEffect(() => {
    if (state.editBdo) {
      dispatch({ type: "updateShotID", payload: booking.droneShotID });
      dispatch({ type: "updateLocation", payload: booking.locationID });
    }
  }, [state.editBdo]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: 1, backdropFilter: "blur(5px)" }}
        open={state.editBdo}
      >
        <EditBooking
          dispatch={dispatch}
          booking={booking}
          customer={customer}
          droneShotID={state.droneShotID}
          locationID={state.locationID}
          setBooking={setBookings}
          setOriginalBooking={setOriginalBookings}
        />
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: 1, backdropFilter: "blur(5px)" }}
        open={state.deleteBdo}
      >
        <DeleteBooking
          dispatch={dispatch}
          bookingID={booking._id}
          setBookings={setBookings}
          setOriginalBookings={setOriginalBookings}
        />
      </Backdrop>
      <Paper
        elevation={0}
        sx={{
          m: 1,
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography>
            <strong>Booking ID:</strong> {booking._id}
          </Typography>
          <Typography>
            <strong>Location: </strong> {booking.locationID}
          </Typography>
          <Typography>
            <strong>Drone-shot ID: </strong> {booking.droneShotID}
          </Typography>
          <Typography>
            <strong>Created On: </strong> {date.toDateString()}
          </Typography>
        </Box>

        <Box>
          <IconButton
            color="secondary"
            onClick={() =>
              dispatch({ type: "updateEditBackdrop", payload: true })
            }
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() =>
              dispatch({ type: "updateDeleteBackdrop", payload: true })
            }
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
      <Divider />
    </>
  );
}
