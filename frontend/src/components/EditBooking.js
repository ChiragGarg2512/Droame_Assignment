import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material"; // Materials from MUI
import CloseIcon from "@mui/icons-material/Close"; // CloseIcon from MUI materials
import axios from "../utils/axios"; // axios from utils
import { useState } from "react"; // function useState imported from react

// Function used to edit the booking
export default function EditBooking({
  dispatch,
  booking,
  customer,
  droneShotID,
  locationID,
  setBooking,
  setOriginalBooking,
}) {
  const [alert, setAlert] = useState(false);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`/booking/${booking._id}`, {
        customer,
        droneShotID,
        locationID,
      })
      .then((res) => {
        setBooking(res.data);
        setOriginalBooking(res.data);
        dispatch({ type: "updateEditBackdrop", payload: false });
      })
      .catch((e) => {
        setAlert(true);
        console.log(e);
      });
  };

  return (
    <>
      <Snackbar
        open={alert}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlert(false)}
      >
        <Alert severity="error" variant="filled">
          Cannot edit the information!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          minWidth: "30vw",
          backgroundColor: "#fff",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "text.primary",
              fontSize: 30,
              fontWeight: 700,
              pb: 4,
            }}
          >
            Edit Drone details
          </Typography>

          <IconButton
            sx={{ color: "primary.main", mb: 4 }}
            onClick={() =>
              dispatch({ type: "updateEditBackdrop", payload: false })
            }
          >
            <CloseIcon sx={{ color: "error.main" }} />
          </IconButton>
        </Box>

        <TextField
          name="droneShotID"
          placeholder="Enter Drone Shot"
          sx={{ width: "100%", mb: 2 }}
          value={droneShotID}
          onChange={(e) =>
            dispatch({ type: "updateShotID", payload: e.target.value })
          }
        />

        <TextField
          name="locationID"
          placeholder="Enter location"
          sx={{ width: "100%", mb: 2 }}
          value={locationID}
          onChange={(e) =>
            dispatch({ type: "updateLocation", payload: e.target.value })
          }
        />

        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            color="info"
            onClick={handleUpdate}
            disabled={locationID === "" || droneShotID === ""}
          >
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
}
