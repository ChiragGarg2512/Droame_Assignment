// This is used to design the header for the webpage
import {Box, Typography} from "@mui/material" // Box and Typography are used as materials from MUI

// Header function
export default function Header() {
    return(
       <Box component="header" sx={{width:"100vh", p:1}} >
            <Typography variant='h2' sx={{fontWeight: 700}}>Droame</Typography>
       </Box>
    )
}