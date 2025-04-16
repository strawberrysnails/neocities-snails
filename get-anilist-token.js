require("dotenv").config(); 

async function getAccessToken() {
  const response = await fetch("https://anilist.co/api/v2/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: process.env.ANILIST_CLIENT_ID,
      client_secret: process.env.ANILIST_CLIENT_SECRET,
    }),
  });

  const data = await response.json();
  console.log("Access Token:", data.access_token);
}

getAccessToken();
