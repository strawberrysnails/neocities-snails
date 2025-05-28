require("dotenv").config();
const eleventyFetch = require("@11ty/eleventy-fetch");

const username = "snails";

const mangaListQuery = `
  query ($username: String) {
    MediaListCollection(userName: $username, type: MANGA) {
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
            chapters
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

const favoriteMangaQuery = `
  query ($username: String) {
    User(name: $username) {
      favourites {
        manga {
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
        manga {
          genres {
            genre
            count
            meanScore
            chaptersRead
          }
        }
      }
    }
  }
`;

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
    const [genreStatsRaw, mangaRaw, favoritesRaw] = await Promise.all([
      fetchAniListData(genreStatsQuery, { username }),
      fetchAniListData(mangaListQuery, { username }),
      fetchAniListData(favoriteMangaQuery, { username })
    ]);

    const manga = mangaRaw.data.MediaListCollection.lists.flatMap(list =>
      list.entries.map(entry => ({
        id: entry.media.id,
        title: entry.media.title.romaji,
        status: entry.status.toLowerCase(),
        progress: entry.progress,
        chapters: entry.media.chapters,
        cover: entry.media.coverImage.medium,
        url: entry.media.siteUrl,
        score: entry.score
      }))
    );

    const favorites = favoritesRaw.data.User.favourites.manga.nodes.map(m => ({
      id: m.id,
      title: m.title.romaji,
      cover: m.coverImage.medium,
      url: m.siteUrl
    }));

    const genres = genreStatsRaw.data.User.statistics.manga.genres.map(g => ({
      genre: g.genre,
      count: g.count,
      meanScore: g.meanScore,
      chaptersRead: g.chaptersRead
    }));

    return { manga, favorites, genres };
  } catch (e) {
    console.error("Error fetching AniList manga data with eleventy-fetch:", e);
    return { manga: [], favorites: [], genres: [] };
  }
};
