const fs = require("fs");
const path = require("path");

const STAMPS_DIR = "src/images/stamps";
const PUBLIC_PATH = "/images/stamps";
const EXTS = [".png", ".gif", ".jpg", ".webp"];

const MANUAL = {
  mine: [
    { image: "zerodod3.png", alt: "zero" },
    { image: "zeromikhail.png", alt: "zeromikhail" },
    { image: "mikhail.png", alt: "mikhail" },
    { image: "onedod3.png", alt: "onedod3" },
    { image: "twodod3.png", alt: "twodod3" },
    { image: "threedod3.png", alt: "threedod3" },
    { image: "fourdod3.png", alt: "fourdod3" },
    { image: "fivedod3.png", alt: "fivedod3" },
    { image: "kyosaya.png", alt: "kyosaya" },
    { image: "manah2.png", alt: "manah2" },
    { image: "tenrose.png", alt: "tenrose" },
    { image: "haruhi2.gif", alt: "haruhi2" },
    { image: "haruhi.gif", alt: "haruhi" },
  ],
  found: [
    { image: "sayaka.png", alt: "sayaka.png", url: "https://www.tumblr.com/cuteguygrian" },
{ image: "homura.png", alt: "homura.png", url: "https://www.tumblr.com/cuteguygrian" },
{ image: "madohomu.png", alt: "madohomu.png", url: "https://www.tumblr.com/cuteguygrian" },
{ image: "madoka.png", alt: "madoka.png", url: "https://www.tumblr.com/cuteguygrian" },
{ image: "evee-babykttn.png", alt: "evee", url: "https://www.deviantart.com/babykttn" },
{ image: "sylveon-babykttn.png", alt: "sylveon", url: "https://www.deviantart.com/babykttn" },
{ image: "kezzi-rose1.gif", alt: "night", url: "https://www.deviantart.com/kezzi-rose" },
{ image: "ramen-kezzi-rose.png", alt: "ramen", url: "https://www.deviantart.com/kezzi-rose" },
{ image: "doctorwho-kezzi-rose.gif", alt: "doctor who", url: "https://www.deviantart.com/kezzi-rose" }
],
};

function enrich(stamp) {
  return {
    ...stamp,
    src: `${PUBLIC_PATH}/${stamp.image}`,
    alt: stamp.alt || stamp.image.replace(/[-_]/g, " ").replace(/\..+$/, ""),
  };
}

function autoStamp(file) {
  return {
    image: file,
    src: `${PUBLIC_PATH}/${file}`,
    alt: file.replace(/[-_]/g, " ").replace(/\..+$/, ""),
    auto: true,
  };
}

module.exports = function () {
  const files = fs
    .readdirSync(STAMPS_DIR)
    .filter((f) => EXTS.includes(path.extname(f)));

  const manualImages = new Set(
    [...MANUAL.mine, ...MANUAL.found].map((s) => s.image),
  );

  const auto = files.filter((f) => !manualImages.has(f)).map(autoStamp);

  return {
    mine: MANUAL.mine.map(enrich),
    found: [...MANUAL.found.map(enrich), ...auto],
  };
};
