require("dotenv").config();

async function fetchAnimeList(username) {
  const query = `
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

  const animeList = json.data.MediaListCollection.lists.flatMap(list =>
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

  return animeList;
}

async function fetchFavoriteAnime(username) {
  const query = `
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
  return json.data.User.favourites.anime.nodes.map(a => ({
    id: a.id,
    title: a.title.romaji,
    cover: a.coverImage.medium,
    url: a.siteUrl
  }));
}

module.exports = async () => {
  try {
    const username = "snails";

    const [anime, favorites] = await Promise.all([
      fetchAnimeList(username),
      fetchFavoriteAnime(username)
    ]);

    return { anime, favorites };
  } catch (e) {
    console.error("Error fetching anime data:", e);
    return { anime: [], favorites: [] };
  }
};
