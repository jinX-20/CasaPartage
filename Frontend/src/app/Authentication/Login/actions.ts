"use server";

export async function login (formData: FormData) {
  try {
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(data);
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    const responseText = await response.text();
    if (!response.ok) {
      console.error("Failed to Login:", responseText);
      throw new Error('Failed to login');
    } else {
      console.log("User logged in successfully:", responseText);
      return responseText;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
