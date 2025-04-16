require("dotenv").config();


async function fetchMangaList(username, token) {
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

  const variables = { username };

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query, variables })
  });

  const json = await response.json();

  const mangaList = json.data.MediaListCollection.lists.flatMap(list =>
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

  return mangaList;
}

async function fetchFavoriteManga(username) {
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

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query,
      variables: { username }
    })
  });

  const json = await response.json();
  return json.data.User.favourites.manga.nodes.map(m => ({
    id: m.id,
    title: m.title.romaji,
    cover: m.coverImage.medium,
    url: m.siteUrl
  }));
}

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
