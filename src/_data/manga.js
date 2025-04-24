require("dotenv").config();
const eleventyFetch = require("@11ty/eleventy-fetch");

const fetchMangaList = async (username, token) => {
  const query = `
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
            }
          }
        }
      }
    }
  `;

  const body = JSON.stringify({
    query,
    variables: { username }
  });

  const data = await eleventyFetch("https://graphql.anilist.co", {
    duration: "1d",
    type: "json",
    fetchOptions: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body
    }
  });

  return data.data.MediaListCollection.lists.flatMap(list =>
    list.entries.map(entry => ({
      id: entry.media.id,
      title: entry.media.title.romaji,
      status: entry.status.toLowerCase(),
      progress: entry.progress,
      chapters: entry.media.chapters,
      cover: entry.media.coverImage.medium,
      score: entry.score
    }))
  );
};

const fetchFavoriteManga = async (username) => {
  const query = `
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

  const body = JSON.stringify({
    query,
    variables: { username }
  });

  const data = await eleventyFetch("https://graphql.anilist.co", {
    duration: "1w",
    type: "json",
    fetchOptions: {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    }
  });

  return data.data.User.favourites.manga.nodes.map(m => ({
    id: m.id,
    title: m.title.romaji,
    cover: m.coverImage.medium,
    url: m.siteUrl
  }));
};

module.exports = async () => {
  try {
    const username = "snails";
    const token = process.env.ANILIST_TOKEN;

    const [manga, favorites] = await Promise.all([
      fetchMangaList(username, token),
      fetchFavoriteManga(username)
    ]);

    return { manga, favorites };
  } catch (e) {
    console.error("Error fetching manga data:", e);
    return { manga: [], favorites: [] };
  }
};
