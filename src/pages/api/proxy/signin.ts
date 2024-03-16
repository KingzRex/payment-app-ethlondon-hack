import type { NextApiRequest, NextApiResponse } from "next";
import customAxios from "@/data/adapters/axios";
import { cookieSchema, signInResponseSchema } from "@/data/schema/signInSchema";
import { isAxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const authToken = req.headers.authorization?.split(" ")[1];
  
  if (!authToken) return res.status(401).json({ message: "Unauthorized" });

  try {
    const response = await customAxios.post("/auth/signin", null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status !== 200) throw new Error("Sign in failed");

    const parsedData = signInResponseSchema.parse(response.data);

    const cookies = response.headers["set-cookie"];
    const validatedCookies = cookieSchema.safeParse(cookies);

    if (!validatedCookies.success) throw new Error("Invalid cookies");

    const validCookies = validatedCookies.data;

    // Very important step, else cookie won't be set - remove SameSite=None coming from server
    const formattedCookie = (
      Array.isArray(validCookies) ? validCookies[0]! : validCookies
    )
      .split(";")
      .filter((value) => value.trim() !== "SameSite=None")
      .join(";");

    res.setHeader("Set-Cookie", formattedCookie);

    res.status(200).json(parsedData);
  } catch (err) {
    let status = 500;
    let message = "Something went wrong!";
    
    if (isAxiosError(err)) {
        status = err.response?.status ?? status;
        message = err.message;
    }

    res.status(status).json(message);
  }
}