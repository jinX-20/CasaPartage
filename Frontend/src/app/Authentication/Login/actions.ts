"use server";

import { cookies } from "next/headers";

export async function login (formData: FormData) {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    const responseText = await response.json();
    if (!response.ok) {
      console.error("Failed to Login:", responseText);
      throw new Error('Failed to login');
    } else {
        return handleLoginResponse(responseText);
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function handleLoginResponse(loginResponse: any) {
  const { token, userData } = loginResponse;

  cookies().set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });

  // return ONLY user info
  return userData;
}
