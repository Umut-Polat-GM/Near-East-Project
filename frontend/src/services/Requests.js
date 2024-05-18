import { BASEURL } from "./BaseUrl";
import {get, postJSON} from './request';

export const postUserLogin = (data) => postJSON(`${BASEURL}login`, data);