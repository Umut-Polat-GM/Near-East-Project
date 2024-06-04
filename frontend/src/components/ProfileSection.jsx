import { Avatar, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { showNotification } from "../store/notifications/notificationSlice";
import { delPost, getMyPosts, postLikePost, postUnlikePost } from "../services/Requests";
import PostCard from "./PostCard";

const ProfileSection = () => {
    const [myPosts, setMyPosts] = useState([]);

    const fetchPosts = async (dispatch) => {
        try {
            const response = await getMyPosts();
            const result = await response.json();
            if (response.ok) {
                setMyPosts(result.posts);
            } else {
                dispatch(
                    showNotification({
                        message: `${result.msg}`,
                        type: "warning",
                    })
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const timeFormatter = (time) => {
        return new Date(time).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const onLikePost = async (postId) => {
        try {
            const response = await postLikePost({ postId });
            const result = await response.json();
            if (response.ok) {
                showNotification({
                    message: "Post Liked Successfully!",
                    type: "success",
                });
            } else {
                showNotification({
                    message: `${result.msg}`,
                    type: "warning",
                });
            }
            fetchPosts();
        } catch (error) {
            console.error(error);

            showNotification({
                message: "Something went wrong!",
                type: "error",
            });
        }
    };

    const onUnLikePost = async (postId) => {
        try {
            const response = await postUnlikePost({ postId });
            const result = await response.json();
            if (response.ok) {
                showNotification({
                    message: "Post Unliked Successfully!",
                    type: "success",
                });
            } else {
                showNotification({
                    message: `${result.msg}`,
                    type: "warning",
                });
            }
            fetchPosts();
        } catch (error) {
            console.error(error);

            showNotification({
                message: "Something went wrong!",
                type: "error",
            });
        }
    };

    const delSinglePost = async (postId) => {
        try {
            const response = await delPost(postId);
            const result = await response.json();
            if (response.ok) {
                showNotification({
                    message: "Post Deleted Successfully!",
                    type: "success",
                });
            } else {
                showNotification({
                    message: `${result.msg}`,
                    type: "warning",
                });
            }
            fetchPosts();
        } catch (error) {
            console.error(error);

            showNotification({
                message: "Something went wrong!",
                type: "error",
            });
        }
    };

    return (
        <section
            style={{
                overflowY: "auto",
                maxHeight: "calc(100vh - 100px)",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(200, 200, 200, 0.5) transparent",
                WebkitScrollbarWidth: "thin",
                WebkitScrollbarColor: "rgba(0, 0, 0, 0.5) transparent",
                marginTop: "1rem",
            }}
        >
            <div className="flex justify-between h-[240px] w-full rounded-[20px] bg-hero bg-cover">
                <Avatar
                    alt="Fatih Keskin"
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    sx={{ width: 144, height: 144, marginRight: 1 }}
                    className="self-end my-3 mx-4"
                />
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col justify-start items-start my-1 mx-8">
                    <h1 className="text-xl font-bold">Fatih Keskin</h1>
                    <p className="text-sm">Software Developer</p>
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
            {myPosts?.map((post) => (
                <PostCard
                    key={post._id}
                    post={post}
                    onLikePost={onLikePost}
                    onUnLikePost={onUnLikePost}
                    delSinglePost={delSinglePost}
                    timeFormatter={timeFormatter}
                />
            ))}
        </section>
    );
};

export default ProfileSection;
