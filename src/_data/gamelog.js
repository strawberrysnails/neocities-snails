function getPlatformBadge(platform) {
  const key = platform.toLowerCase();
  if (key === "pc") return "/images/badges/pc.webp";
  if (key === "ds" || key === "3ds" || key === "nds") return "/images/badges/ds.webp";
  if (key === "emulator") return "/images/badges/emulator.webp";
  return null;
}


module.exports = [
    // Currently Playing PC
    {
      title: "Drakengard 3",
      platform: "Emulator",
      platformImage: getPlatformBadge("emulator"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "Split Fiction",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "Divinity: Original Sin",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "The Talos Principle",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      status: "currently playing",
      type: "played"
    },
  
    // Completed PC
    {
      title: "Nier: Replicant",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      status: "completed",
      type: "played"
    },
    {
      title: "Baldur's Gate 3",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      status: "completed",
      type: "played"
    },
  
    // Planning PC
    {
      title: "Divinity: Original Sin II",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      status: "planning",
      type: "played"
    },
    {
      title: "Nier: Automata",
      platform: "PC",
      platformImage: getPlatformBadge("PC"),
      status: "planning",
      type: "played"
    },
  
    // NDS/3DS Currently Playing
    {
      title: "The Wizard of Oz: Beyond The Yellow Brick Road",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "Art Academy",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "Pokemon X [replay]",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      status: "currently playing",
      type: "played"
    },
    {
      title: "Professor Layton and the Azran Legacy",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      status: "currently playing",
      type: "played"
    },
  
    // 3DS Completed
    {
      title: "Pokemon X",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      status: "completed",
      type: "played"
    },
    {
      title: "Pokemon Diamond/Pearl + Platinum",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      status: "completed",
      type: "played"
    },
    {
      title: "Animal Crossing: New Leaf",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      status: "completed",
      type: "played"
    },
  
    // 3DS Planning
    {
      title: "Pokemon Ultra Moon",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      status: "planning",
      type: "played"
    },
    {
      title: "Bravely Default",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      status: "planning",
      type: "played"
    },
    {
      title: "Phoenix Wright: Ace Attorney Trilogy",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      status: "planning",
      type: "played"
    },
    {
      title: "Hello Kitty: Big City Dreams",
      platform: "DS",
      platformImage: getPlatformBadge("DS"),
      status: "planning",
      type: "played"
    },
  
    // Boyfriend Gaming
    {
      title: "Bloodborne",
      platformImage: getPlatformBadge("emulator"),
      platform: "emulator",
      status: "completed",
      type: "watched"
    },
    {
      title: "Outer Wilds",
      platformImage: getPlatformBadge("PC"),
      platform: "PC",
      status: "completed",
      type: "watched"
    },
    {
      title: "Demon Souls",
      platformImage: getPlatformBadge("emulator"),
      platform: "Emulator",
      status: "currently watching",
      type: "watched"
    },
    {
      title: "Dark Souls 1",
      platformImage: getPlatformBadge("PC"),
      platform: "PC",
      status: "planning",
      type: "watched"
    },
    {
      title: "Dark Souls 2",
      platformImage: getPlatformBadge("PC"),
      platform: "PC",
      status: "planning",
      type: "watched"
    },
    {
      title: "Dark Souls 3",
      platformImage: getPlatformBadge("PC"),
      platform: "PC",
      status: "planning",
      type: "watched"
    }
  ];
  