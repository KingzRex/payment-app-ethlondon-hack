import axios from "axios";
import type { SignInResponseData } from "@/data/schema/signInSchma";

const validateAuthToken = async (token: string) => {
  const endpoint = "/api/proxy/signin";

  const response = await axios.post<SignInResponseData>(
    endpoint,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  );

  return response.data.data.isAuthenticated;
};

export { validateAuthToken };