require("dotenv").config();
const eleventyFetch = require("@11ty/eleventy-fetch");

const username = "snails";

const animeListQuery = `
  query ($username: String) {
    MediaListCollection(userName: $username, type: ANIME) {
      lists {
        name
        entries {
          status
          progress
          score
          media {
            id
            title {
              romaji
            }
            episodes
            coverImage {
              medium
            }
            siteUrl
          }
        }
      }
    }
  }
`;

const favoriteAnimeQuery = `
  query ($username: String) {
    User(name: $username) {
      favourites {
        anime {
          nodes {
            id
            title {
              romaji
            }
            coverImage {
              medium
            }
            siteUrl
          }
        }
      }
    }
  }
`;

const genreStatsQuery = `
query ($username: String) {
    User(name: $username) {
    statistics {
      anime {
        genres {
          genre
          count
          meanScore
          minutesWatched
        }
      }
    }
  }
}
`

async function fetchAniListData(query, variables) {
  const url = "https://graphql.anilist.co";
  const response = await eleventyFetch(`${url}?queryHash=${Buffer.from(query + JSON.stringify(variables)).toString("base64")}`, {
    duration: "0s", 
    type: "json",
    method: "POST",
    fetchOptions: {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query, variables })
    }
  });
  return response;
}

module.exports = async function () {
  try {
  const [genreStatsRaw, animeRaw, favoritesRaw] = await Promise.all([
  fetchAniListData(genreStatsQuery, { username }),
  fetchAniListData(animeListQuery, { username }),
  fetchAniListData(favoriteAnimeQuery, { username })
]);


    const anime = animeRaw.data.MediaListCollection.lists.flatMap(list =>
      list.entries.map(entry => ({
        id: entry.media.id,
        title: entry.media.title.romaji,
        status: entry.status.toLowerCase(),
        progress: entry.progress,
        episodes: entry.media.episodes,
        cover: entry.media.coverImage.medium,
        url: entry.media.siteUrl,
        score: entry.score
      }))
    );

    const favorites = favoritesRaw.data.User.favourites.anime.nodes.map(a => ({
      id: a.id,
      title: a.title.romaji,
      cover: a.coverImage.medium,
      url: a.siteUrl
    }));

    const genres = genreStatsRaw.data.User.statistics.anime.genres.map(g => ({
      genre: g.genre,
      count: g.count,
      meanScore: g.meanScore,
      minutesWatched: g.minutesWatched
    }));


    return { anime, favorites, genres };
  } catch (e) {
    console.error("Error fetching AniList data with eleventy-fetch:", e);
    return { anime: [], favorites: [], genres: [] };
  }
};