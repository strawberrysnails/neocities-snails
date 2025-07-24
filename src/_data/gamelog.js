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


// define the status order
const statusOrder = {
  "currently playing": 0,
  "currently watching": 1,
  "completed": 2,
  "planning": 3,
};


const gamelog = [
    // Currently Playing PC
    {
      title: "Nier: Automata",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "Split Fiction",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "Divinity: Original Sin",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "The Talos Principle",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("planning"),
      status: "planning",
      type: "played"
    },
  
    // Completed PC
        {
      title: "Drakengard 3",
      platform: "Emulator",
      platformImage: getPlatformBadge("emulator"),
      statusImage: getStatusBadge("completed"),
      status: "completed",
      type: "played"
    },
    {
      title: "Nier: Replicant",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("completed"),
      status: "completed",
      type: "played"
    },
    {
      title: "Baldur's Gate 3",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("completed"),
      status: "completed",
      type: "played"
    },
  
    // Planning PC
    {
      title: "Divinity: Original Sin II",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("planning"),
      status: "planning",
      type: "played"
    },
    // NDS/3DS Currently Playing
        {
      title: "Pokemon Odyssey",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "The Wizard of Oz: Beyond The Yellow Brick Road",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "Art Academy",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "Pokemon X [replay]",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "Professor Layton and the Azran Legacy",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("currently playing"),
      status: "currently playing",
      type: "played"
    },

  
    // 3DS Planning
    {
      title: "Pokemon Ultra Moon",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("planning"),
      status: "planning",
      type: "played"
    },
    {
      title: "Bravely Default",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("planning"),
      status: "planning",
      type: "played"
    },
    {
      title: "Phoenix Wright: Ace Attorney Trilogy",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      statusImage: getStatusBadge("planning"),
      status: "planning",
      type: "played"
    },
  
    // Boyfriend Gaming
    {
      title: "Bloodborne",
      platformImage: getPlatformBadge("emulator"),
      statusImage: getStatusBadge("completed"),
      platform: "emulator",
      status: "completed",
      type: "watched"
    },
    {
      title: "Outer Wilds",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("completed"),
      platform: "PC",
      status: "completed",
      type: "watched"
    },
    {
      title: "Demon Souls",
      platformImage: getPlatformBadge("emulator"),
      statusImage: getStatusBadge("completed"),
      platform: "Emulator",
      status: "completed",
      type: "watched"
    },
    {
      title: "Dark Souls 1",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("completed"),
      platform: "PC",
      status: "completed",
      type: "watched"
    },
    {
      title: "Dark Souls 2",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("currently watching"),
      platform: "PC",
      status: "currently watching",
      type: "watched"
    },
    {
      title: "Dark Souls 3",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("planning"),
      platform: "PC",
      status: "planning",
      type: "watched"
    },
    {
      title: "Sekiro",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("planning"),
      platform: "PC",
      status: "planning",
      type: "watched"
    },
    {
      title: "Elden Ring",
      platformImage: getPlatformBadge("PC"),
      statusImage: getStatusBadge("planning"),
      platform: "PC",
      status: "planning",
      type: "watched"
    }
  ];
  
// now export sorted by status
module.exports = gamelog.sort((a, b) => {
  return (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99);
});