import { showNotification } from "../store/notifications/notificationSlice";
import { serviceActions } from "../store/service/serviceSlice";
import { getUserPosts } from "./Requests";

export const fetchPosts = async (dispatch) => {
    try {
        const response = await getUserPosts();
        const result = await response.json();
        if (response.ok) {
            dispatch(serviceActions.setPosts(result.posts));
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
