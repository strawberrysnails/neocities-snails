function getPlatformBadge(platform) {
  const key = platform.toLowerCase();
  if (key === "pc") return "/images/badges/pc.webp";
  if (key === "ds" || key === "3ds" || key === "nds") return "/images/badges/ds.webp";
  if (key === "emulator") return "/images/badges/emulator.webp";
  return null;
}

function getStatusBadge(status) {
  const key = status.toLowerCase();
  if (key === "currently playing") return "/images/badges/currently.png";
  if (key === "currently watching") return "/images/badges/currently.png";
  if (key === "completed") return "/images/badges/completed.png";
  if (key === "planning") return "/images/badges/planning.png";
  return null;
}

function getRatingBadge(status) {
  const key = status.toLowerCase();
  if (key === "unrated") return "/images/badges/unrated.png";
  if (key === "1star") return "/images/badges/1star.png";
  if (key === "2star") return "/images/badges/2star.png";
  if (key === "3star") return "/images/badges/3star.png";
    if (key === "4star") return "/images/badges/4star.png";
    if (key === "5star") return "/images/badges/5star.png";
  return null;
}


// define the status order
const statusOrder = {
  "currently playing": 0,
  "currently watching": 1,
  "completed": 2,
  "planning": 3,
};


const gamelog = [
    // Currently 
    {
      title: "Nier: Automata",
      thumbnail: "/images/gamelog/nier-automata.png",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("completed"),
      status: "completed",
      type: "played",
      ratingImage: getRatingBadge("5star"),
      rating: "5star",
      notes: "Finally finished all 26 endings. Trying to figure out what game to fill the void this one left in my heart. Completed on 10/09/25.",
    },
    {
      title: "Blue Prince",
      thumbnail: "/images/gamelog/blue-prince.png",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played",
      rating: "unrated",
      ratingImage: getRatingBadge("unrated"),
      notes: "I love puzzle games! This is my first rougelite, idk how I feel about it yet. It's not as puzzle-heavy as I would like but the story is very interesting so far.",
    },
    {
      title: "Divinity: Original Sin",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("planning"),
      status: "planning",
      type: "played",
      thumbnail: "/images/gamelog/divinity.png",
    },
    {
      title: "Sweet Fuse",
      thumbnail: "/images/gamelog/sweet-fuse.png",
      platform: "emulator",
      platformImage: getPlatformBadge("emulator"),
      statusImage: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played",
      rating: "unrated",
      ratingImage: getRatingBadge("unrated"),
      notes: "Cute PSP visual novel that I'm emulating on my phone. Very unique and I'm excited to see where it goes.",
    },
  
    // Completed PC
        {
      title: "Drakengard 3",
      thumbnail: "/images/gamelog/drakengard-3.png",
      platform: "Emulator",
      platformImage: getPlatformBadge("emulator"),
      statusImage: getStatusBadge("completed"),
      status: "completed",
      type: "played",
      ratingImage: getRatingBadge("5star"),
      rating: "5star",
      notes: "My favorite game of all time <3 Completed on 5/25/25."

    },
    {
      title: "Nier: Replicant",
      thumbnail: "/images/gamelog/nier-replicant.png",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("completed"),
      status: "completed",
      type: "played",
      ratingImage: getRatingBadge("5star"),
      rating: "5star",
      notes: "Thank you to my husband for introducing me to a franchise I will be fixated on forever. Completed on 4/19/25."
    },
    {
      title: "Baldur's Gate 3",
      thumbnail: "/images/gamelog/baulders-gate-3.png",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("completed"),
      status: "completed",
      type: "played",
      ratingImage: getRatingBadge("4star"),
      rating: "4star",
      notes: "I obviously loved this like everyone else. Will attempt honor-mode someday. Completed on 7/16/24."
    },
  
    // NDS/3DS Currently Playing
    
      {
      title: "Pokemon Odyssey",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("planning"),
      status: "planning",
      type: "played",
      thumbnail: "/images/gamelog/pokemon-odyssey.png",
      notes: "Story-rich Pokemon FireRed ROM hack that combines Pokemon, Etrian Odyssey, and Made in Abyss."
    },
    {
      title: "The Wizard of Oz: Beyond The Yellow Brick Road",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("planning"),
      status: "planning",
      type: "played",
      thumbnail: "/images/gamelog/wizardofoz.png",
      notes: "Turn-based RPG that's surprisingly good. The art style is what really pulled me in."
    },
    {
      title: "Professor Layton and the Azran Legacy",
      thumbnail: "/images/gamelog/professorlayton-azran.png",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played",
      notes: "Mmm puzzles."
    },

  
    // 3DS Planning
    {
      title: "Pokemon Ultra Moon",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("planning"),
      status: "planning",
      type: "played",
      thumbnail: "/images/gamelog/pokemon-ultramoon.png",
      notes: "Heard it's one of the best Pokemon games I've somehow never played."
    },
    {
      title: "Bravely Default",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("planning"),
      status: "planning",
      type: "played",
      thumbnail: "/images/gamelog/bravely-default.png",
      notes: "Apparently the best DS game ever."
    },
  
    // Boyfriend Gaming
    {
      title: "Bloodborne",
      platformImage: getPlatformBadge("emulator"),
      statusImage: getStatusBadge("completed"),
      platform: "emulator",
      status: "completed",
      type: "watched",
      thumbnail: "/images/gamelog/bloodborne.png",
      notes: "This was the first game I watched him play which started our tradition. "
    },
    {
      title: "Outer Wilds",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("completed"),
      platform: "PC",
      status: "completed",
      type: "watched",
      thumbnail: "/images/gamelog/outer-wilds.png",
      notes: "We used to eat cheese balls (branded as space balls) and play this every night."
    },
    {
      title: "Demon's Souls",
      platformImage: getPlatformBadge("emulator"),
      statusImage: getStatusBadge("completed"),
      platform: "Emulator",
      status: "completed",
      type: "watched",
      thumbnail: "/images/gamelog/demons-souls.png",
      notes: "It was cool to see the first soulsborne game."
    },
    {
      title: "Dark Souls",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("completed"),
      platform: "PC",
      status: "completed",
      type: "watched",
      thumbnail: "/images/gamelog/dark-souls1.png",
      notes: ""
    },
    {
      title: "Dark Souls 2",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("currently watching"),
      platform: "PC",
      status: "currently watching",
      type: "watched",
      thumbnail: "/images/gamelog/dark-souls2.png",
      notes: ""
    },
    {
      title: "Dark Souls 3",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("planning"),
      platform: "PC",
      status: "planning",
      type: "watched",
      thumbnail: "/images/gamelog/dark-souls3.png"
    },
    {
      title: "Sekiro",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("currently watching"),
      platform: "PC",
      status: "currently watching",
      type: "watched",
      thumbnail: "/images/gamelog/sekiro.png"
    },
    {
      title: "Elden Ring",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("planning"),
      platform: "PC",
      status: "planning",
      type: "watched",
      thumbnail: "/images/gamelog/elden-ring.png"
    },
    {
      title: "YS I & II",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("currently watching"),
      platform: "PC",
      status: "currently watching",
      type: "watched",
      thumbnail: "/images/gamelog/ys1and2.png"
    }
  ];
  
// now export sorted by status
module.exports = gamelog.sort((a, b) => {
  return (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
});