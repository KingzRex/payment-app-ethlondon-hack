/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { env } from "@/env";
import type {
  CreateAxiosDefaults,
} from "axios";
import axios from "axios";

const axiosConfig: CreateAxiosDefaults = {
  baseURL: env.NEXT_PUBLIC_PAYMENTS_API_URL,
};

const customAxios = axios.create(axiosConfig);

export default customAxios;