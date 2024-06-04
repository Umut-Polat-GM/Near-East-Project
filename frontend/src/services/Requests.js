import { BASEURL } from "./BaseUrl";
import { get, postJSON, del, patch, post } from "./request";

export const postUserLogin = (data) => postJSON(`${BASEURL}login`, data);
export const postUserRegister = (data) => postJSON(`${BASEURL}register`, data);
export const postUserPost = (data) => post(`${BASEURL}posts`, data);
export const getUserPosts = () => get(`${BASEURL}posts`);
export const getMyPosts = () => get(`${BASEURL}my-posts`);
export const checkFavoritePost = (id) => get(`${BASEURL}likes/${id}`);
export const postLikePost = (data) => postJSON(`${BASEURL}like`, data);
export const postUnlikePost = (data) => postJSON(`${BASEURL}unlike`, data);
export const delPost = (id) => del(`${BASEURL}posts/${id}`);
export const patchPost = (data) => patch(`${BASEURL}posts/${data._id}`, data);
