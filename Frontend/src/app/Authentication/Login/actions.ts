"use client";

export async function login (formData: FormData) {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ data }),
    });
    const responseText = await response.json();
    if (!response.ok) {
      switch (responseText.message) {
        case "User Not Found":
          throw new Error('User not found');
        case "Invalid Credentials":
          throw new Error('Invalid Credentials');
        default:
          throw new Error('Failed to login');
      }      
    } else {
        return responseText.userData;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}