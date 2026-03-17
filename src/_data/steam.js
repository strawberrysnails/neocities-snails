require("dotenv").config();
const fetch = require("@11ty/eleventy-fetch");


const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_ID;

module.exports = async function () {
  const url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}`;

  const json = await fetch(url, {

    duration: "1d",
    type: "json",
  });

  if (!json.response || !json.response.games || json.response.games.length === 0) {
    return null;
  }
  

  const game = json.response.games[0];
  return {
    name: game.name,
    hours: (game.playtime_forever / 60).toFixed(1),
  };
};
