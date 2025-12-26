export async function POST(req) {
  try {
    const url = new URL(req.url);
    const isMarkAsPaid = url.searchParams.get('mark-as-paid'); 

    let response;
    let apiUrl;

    if (isMarkAsPaid) {
      apiUrl = 'http://localhost:5000/api/expenses/due-expenses/mark-as-paid'; 
    } else {
      apiUrl = 'http://localhost:5000/api/expenses';
    }

    const body = await req.json();

    response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.ok ? 200 : 500,
    });
  } catch (error) {
    console.error("Error forwarding request to backend:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}


export async function GET(req) {
  try {
    const url = new URL(req.url);
    const paidBy = url.searchParams.get('paidBy');
    const userr = url.searchParams.get('user');

    let response;
    let apiUrl;

    if (paidBy) {
      apiUrl = `http://localhost:5000/api/expenses/your-expenses?paidBy=${paidBy}`;
    } else if (userr) {
      apiUrl = `http://localhost:5000/api/expenses/due-expenses?user=${userr}`;
    } else{
      apiUrl = 'http://localhost:5000/api/expenses/get-all-expenses';
    }

    // Make the request to the backend
    response = await fetch(apiUrl);
    const data = await response.json();

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch expenses");
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error fetching expenses from backend:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch expenses" }), { status: 500 });
  }
}
