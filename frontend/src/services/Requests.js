import { BASEURL } from "./BaseUrl";
import { get, postJSON } from "./request";

export const postUserLogin = (data) => postJSON(`${BASEURL}login`, data);
export const postUserRegister = (data) => postJSON(`${BASEURL}register`, data);
export const postUserPost = (data) => postJSON(`${BASEURL}posts`, data);
export const getUserPosts = () => get(`${BASEURL}posts`);
export const checkFavoritePost = (id) => get(`${BASEURL}likes/${id}`);
export const postLikePost = (data) => postJSON(`${BASEURL}like`, data);
export const postUnlikePost = (data) => postJSON(`${BASEURL}unlike`, data);
