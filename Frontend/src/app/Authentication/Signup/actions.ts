"use server";

export async function register(formData: FormData) {
  try {
    const data = {
      name: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });
    const responseText = await response.json();
    if (!response.ok) {
      switch (responseText.message) {
        case "Email already registered, please Login":
          throw new Error('Email already registered, please Login');
        default:
          throw new Error('Failed to register'); 
      }      
    } else {
      return responseText;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
  return null;
}
