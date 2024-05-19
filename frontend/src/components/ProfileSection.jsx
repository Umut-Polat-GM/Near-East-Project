import { Avatar, Button } from "@mui/material";

const ProfileSection = () => {
    return (
        <section className="flex size-full flex-col gap-1 fifth-step">
            <div className="flex justify-between h-[240px] w-full rounded-[20px] bg-hero bg-cover">
                <Avatar
                    alt="User Avatar"
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    sx={{ width: 144, height: 144, marginRight: 1 }}
                    className="self-end my-3 mx-4"
                />
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col justify-start items-start my-1 mx-8">
                    <h1 className="text-xl font-bold">John Doe</h1>
                    <p className="text-sm">Frontend Developer</p>
                    <p className="text-sm">Istanbul, Turkey</p>
                </div>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{
                        borderRadius: "2rem",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        my: "0.5rem",
                    }}
                >
                    Edit Profile
                </Button>
            </div>
        </section>
    );
};

export default ProfileSection;
