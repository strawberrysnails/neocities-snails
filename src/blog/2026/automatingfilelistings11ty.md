---
title: Automating your graphics page (and more) in Eleventy
date: 2026-02-09
excerpt: Automate any file listings (graphics, buttons, ect) in Eleventy easy style. Just add to a folder! 
layout: blog
tags: 
- blog
- tutorial
- eleventy
---
## Introduction

I've learned a lot about Eleventy the past year or so while playing and tinkering with it; I've been utilizing the "```_data```" Folder a lot to hold data such as my ever-growing button wall, my photogrid, and more. I recently discovered the ability to have Eleventy "auto detect" files in a specific folder and list them as you please, it's quite amazing. 

This type of data is best for large amounts of images that DO NOT have a link attached to them. So your own F2U graphics or buttons and stamps that you can't find the source of. For example, I have this set-up for my stamps because ***most*** of them are NOT links. 

Please note this tutorial is for people who are already have some familiarity with 11ty. You don't need that much Javascript knowledge because you can just copy mine. 

Please [email me](mailto:hello@snails.town) if any of this information is confusing or not explained well enough, I'm happy to edit the post with more clarity or explain concepts further as needed. This is my first tutorial so I hope things are clear and easy to understand.

## The _data Folder

If you don't already have a "```_data```" Folder, it should be in the source or input folder of your 11ty project. The name of mine is "```src```".
```_data```" files are Javascript (or JSON) modules that return data objects or arrays. When you name a file in your ```_data```" folder it detects it as a variable in your templates. For example, a file named "```_data/graphics.js```" will be accessible as the variable name "```graphics```" when writing to your templates or HTML files.

## Detecting Files in a Folder

Since we will be using the vague term "graphics" (You can edit this to be anything) we need a graphics folder, preferable under a folder called "images". 
Here is my recomended structure:
```
src/_data/
  graphics.js      ← main data file
src/images/
  graphics/        ← folder containing images
```

We will use Node's ```fs``` and ```path``` to read files in a folder. We want graphics.js to output something like this:

```json
{
image: mygraphic.png,
src: `/images/graphics/mygraphic.png`,
alt: `mygraphic`
url: ``
}
```

This will be readable data that we can output using templates to generate the typical HTML blocks that you're all familar with: ```<a href=""><img src="" alt=""></a>```

Now, the automating of this will not input any URLs, this is something we need to do manually depending on which graphics need linkbacks. Again, this method is best for a mix of mostly regular images and some links. ***We will mainly be focusing on mass-listing ```<img>``` tags and adding the URL data AS NEEDED, afterwards.***

## My code for src/_data/graphics.js

This code block detects images in the src/images/graphics folder and outputs what I've mentioned above. We have the ability to add images manually with custom metadata such as "url" and if they are not listed the rest will be filled automatically. Manual overrides appear first so you can customize the order. 

```js
const fs = require("fs");
const path = require("path");

// Path to the folder containing your graphics
const GRAPHICS_DIR = "src/images/graphics";

// Public URL path for images (used in templates)
const PUBLIC_PATH = "/images/graphics";

// Allowed file extensions to include
const EXTS = [".png", ".jpg", ".gif"];

// Manual entries: graphics you want to add with optional alt text or URLs
// These will appear first in the data array
const MANUAL = [
  { image: "custom.png", alt: "alt_text_here", url: "https://example.com" }
];

module.exports = function () {
  // Read all files in the graphics folder
  const files = fs.readdirSync(GRAPHICS_DIR)
    // Filter only allowed extensions
    .filter(f => EXTS.includes(path.extname(f).toLowerCase()));

  // Create objects for automatically detected files
  // Skip any files already listed in MANUAL to avoid duplicates
  const auto = files
    .filter(f => !MANUAL.some(m => m.image === f))
    .map(file => ({
      image: file,                                 // Filename
      src: `${PUBLIC_PATH}/${file}`,               // Full public path for templates
      alt: file.replace(/[-_]/g, " ").replace(/\..+$/, ""), // Generate readable alt text
    }));

  // Return combined array: manual entries first, auto-detected entries after
  return [...MANUAL, ...auto];
};

```
Please refer to the comments in the code for explainations, you can copy this snippet exactly and replace "graphics" with what you're working with.

## Your HTML file

Now we need to output all this data on our "```graphics.html```" page. You may be used to long strings of ```<img>``` tags, links, and more. With this, we only need to write one block and 11ty will generate the rest! 

```njk
{% raw %}
{% for graphic in graphics %}
  {% if graphic.url %}
    <a href="{{ graphic.url }}">
      <img src="{{ graphic.src }}" alt="{{ graphic.alt }}">
    </a>
  {% else %}
    <img src="{{ graphic.src }}" alt="{{ graphic.alt }}">
  {% endif %}
{% endfor %}
{% endraw %}
```

Here, we are using the variable "graphics" mentioned earlier and that pulls the ```graphics.js``` data. Now, each image that's added to your graphics folder will output as an ```<img>``` tag on your page automatically. 

## Converting your old HTML to readable data

Do you already have a long list of ```<a>``` and ```<img>``` tags that need to be converted? No problem! I wrote a simple script to convert them to JS objects. 
We need to add them to out ```graphics.js``` file here:

```js
const MANUAL = [
  { image: "custom.png", alt: "alt_text_here", url: "https://example.com" }
];
```

This script uses Bash which is native to Linux and MacOS. If you are on Windows you need to run this script in Git Bash. This will not work in PowerShell or CMD on Windows. 

Please note: This script only works for img tags wrapped in ```<a>```. The rest are automatic so no need to add them unless you want to edit the alt text or add a URL later on. 

### Prepare your HTML
1. Create a blank HTML file (e.g., my-buttons.html).

2. Copy all your ```<a>```-wrapped ```<img>``` elements into this file. For example:

```html
<a href="https://example.com/"><img src="images/button1.png" alt="Button One"></a>
<a href="https://example.com/"><img src="images/button2.png" alt="Button Two"></a>
```

### Save the Conversion Script

Save the following Bash script as `convert-html.sh`:

```bash
#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Usage: $0 <html-file> [output-file]"
  exit 1
fi

INPUT="$1"
OUTPUT="${2:-buttons-list.txt}"  # default output file

# Extract <a> with <img> or standalone <img> into JS object format
sed -E 's/.*href="([^"]*)".*src="[^"]*\/([^"/]+)".*alt="([^"]*)".*/{ image: "\2", alt: "\3", url: "\1" },/;
s/.*<img src="[^"]*\/([^"/]+)".*alt="([^"]*)".*/{ image: "\1", alt: "\2", url: "" },/' "$INPUT" > "$OUTPUT"

echo "Converted data written to $OUTPUT"

```

If you're on Linux, make it executable:
```bash
chmod +x convert-html.sh
```

### Run the Script
```bash
./convert-html.sh my-buttons.html
```
By default, the output will be written to buttons-list.txt.

### Copy the Data into graphics.js
Open `buttons-list.txt` (or your custom output file), then copy and paste the objects into your MANUAL array:

```js
const MANUAL = [
    // PASTE HERE
  { image: "button1.png", alt: "Button One", url: "https://example.com/" },
  { image: "button2.png", alt: "Button Two", url: "https://example.com/" }
];
```

Once the script finishes running, you’ll have a clean list of JS objects ready to drop into your `MANUAL` array. From there, Eleventy takes over and merges them with your automatically detected images.

## Conclusion

The `_data` folder completely changed how I build my graphics-heavy pages. Instead of maintaining long, fragile lists of `<img>` tags, I can just drop files into a folder! I think that's amazing and a huge time-saver.

Please [email me](mailto:hello@snails.town) with any questions or comments. <3