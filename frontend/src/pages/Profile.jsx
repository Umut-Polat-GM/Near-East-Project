import { Box, Grid } from "@mui/material";
import ListSection from "../components/ListSection";
import SideSection from "../components/Sidesection";
import ProfileSection from "../components/ProfileSection";
const Profile = () => {
    return (
        <Box sx={{ flexGrow: 1 }} className="text-black container mx-auto">
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <ListSection />
                </Grid>
                <Grid item xs={6}>
                    <ProfileSection />
                </Grid>
                <Grid item xs={3}>
                    <SideSection />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;
