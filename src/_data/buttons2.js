const fs = require("fs");
const path = require("path");

const BUTTONS_DIR = "src/images/buttons";
const PUBLIC_PATH = "/images/buttons";
const EXTS = [".png", ".gif", ".jpg", ".webp"];

const MANUAL = {
  mine: [
    { image: "eos.png", alt: "EndevourOS Now!" },
  ],
  found: [
    { image: "ao3.jpg", alt: "ao3", url: "https://archiveofourown.org/" },
{ image: "8.png", alt: "8", url: "https://88x31.nl/" },
{ image: "wayback_machine.png", alt: "wayback machine", url: "https://web.archive.org/" },
{ image: "ditch-socialmedia.gif", alt: "ditch social media", url: "https://dokode.moe" },
{ image: "tpz.png", alt: "tpz", url: "https://tpazolite.bandcamp.com/" },
{ image: "homebrewchannel.gif", alt: "homebrew", url: "https://www.tumblr.com/bythelightswitch" },
],
};

function enrich(button) {
  return {
    ...button,
    src: `${PUBLIC_PATH}/${button.image}`,
    alt: button.alt || button.image.replace(/[-_]/g, " ").replace(/\..+$/, ""),
  };
}

function autoButton(file) {
  return {
    image: file,
    src: `${PUBLIC_PATH}/${file}`,
    alt: file.replace(/[-_]/g, " ").replace(/\..+$/, ""),
    auto: true,
  };
}

module.exports = function () {
  const files = fs
    .readdirSync(BUTTONS_DIR)
    .filter((f) => EXTS.includes(path.extname(f).toLowerCase()));

  const manualImages = new Set(
    [...MANUAL.mine, ...MANUAL.found].map((s) => s.image),
  );

  const auto = files.filter((f) => !manualImages.has(f)).map(autoButton);

  return {
    mine: MANUAL.mine.map(enrich),
    found: [...MANUAL.found.map(enrich), ...auto],
  };
};
