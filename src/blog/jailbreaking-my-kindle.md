---
title: Jailbreaking my Kindle
date: 2025-04-14
excerpt: Modding my Kindle because fuck Amazon. Amazon recently disabled the ability to download any books purchased through the Kindle storefront.
layout: blog
tags: 
- blog
- modding
- e-readers
- kindle
---

Amazon recently disabled the ability to download any books purchased through the Kindle storefront. This means they can delete, remove, or change books on your device at any time. Essentially, when you buy a digital book from Amazon, you're just paying for a long-term rental, not true ownership.

Before I jailbroke my Kindle, I was already downloading books for free and sideloading them via Calibre. But I wanted **full ownership** over both my device and my ebooks and I didn’t want to stay tied to an Amazon account just to use something I own.

### Why?

- The Kindle UI is bad and doesn’t support EPUB files.
- You can’t download ebooks you “bought” from Amazon.
- Custom lockscreen.
- No ads. I paid extra for a Kindle without ads, but many users still have them on their lockscreen, which I find frustrating.
- Manga downloader via plugin. I had trouble uploading manga manually, so this makes it much easier.

Basically, the goal is to disconnect from Amazon services entirely.

### Some Notes

This isn’t a how-to guide. It’s more of a “how I did it, and why.” I'm just documenting my process and reasoning. Hopefully it helps someone in a similar position.

Modding your Kindle is generally safe. There’s little risk of bricking your device, and you can always undo it if you’re not happy (though I can’t imagine why you'd want to go back).

### Jailbreaking

I followed the instructions on the <a href="https://kindlemodding.org/" target="_blank">Kindle Modding Wiki</a>. My device is the 11th generation Kindle, so I used the guide for Winterbreak. After that, I installed a hotfix to stop the device from updating automatically, then installed KUAL and MRPI to run homebrew software.

### Installing KOReader

<a href="https://koreader.rocks/" target="_blank">KOReader</a> is a document viewer for e-readers and other e-ink devices. It lets you open and read pretty much any file type.

To install it, I followed <a href="https://kindlemodding.org/jailbreaking/post-jailbreak/koreader.html" target="_blank">this guide on the Kindle Modding Wiki</a>. It was straightforward.

### Aftermath

YAY my Kindle works! KOReader has a very different interface, but with some tweaks and a quick read through the <a href="https://koreader.rocks/user_guide/" target="_blank">User Guide</a>, I figured it out. Custom lockscreen time! 

<a href="https://files.catbox.moe/0zbz8h.jpg" target="_blank"><img src="https://files.catbox.moe/0zbz8h.jpg" style="min-width:200px; max-width:400px;"></a>

I used this <a href="https://eink-image-converter.contechity.com/" target="_blank">e-ink image converter</a>. 

While my Kindle was plugged into my PC, I created a new folder called “Books” directly on the device. Then I added a few of my favorite books, fanfiction, and manga by dragging the files over from my computer.

One KOReader feature I really like is **Collections**, which you can read about <a href="https://koreader.rocks/user_guide/#L2-collections" target="_blank">here</a>. It's a much more efficient way to organize your digital library, especially since Rakuyomi doesn’t allow you to choose where downloaded manga is saved (more on that below).

Right now, I’ve set up three collections: *Books*, *Manga*, and *Fanfiction*. I’ll likely expand that over time as I add more content, but for now, this setup works for me.

Eventually, I want to set up automatic synchronization between my collections and folders. This will be really useful later on for keeping manga organized after downloading through Rakuyomi.

### Installing and Configuring Rakuyomi

This was pretty hard for me and I ended up asking my tech-savvy boyfriend for help, which made things a lot easier.

Here’s what he did:

While my Kindle was plugged into my PC, he copied the **`rakuyomi.koplugin`** folder into KOReader’s **`plugins`** folder.

The confusing part was configuration. Rakuyomi needs “sources” to work. Basically, a list of manga repositories it can search through. You have to manually create this source list and add it to the app.

To do that, you have to create a file called **`settings.json`** inside KOReader’s **`rakuyomi`** folder (inside its home directory). Here's what mine looks like:

```
{
  "$schema": "https://github.com/hanatsumi/rakuyomi/releases/download/main/settings.schema.json",
  "source_lists": [
    "https://raw.githubusercontent.com/Skittyblock/aidoku-community-sources/gh-pages/index.min.json"
  ],
  "languages": ["en"]
}
```

Thanks to some helpful Reddit threads for this: 
<a href="https://www.reddit.com/r/koreader/comments/1i88mti/rakuyomi_reliable_sources/" target="_blank">source 1</a> · 
<a href="https://www.reddit.com/r/koreader/comments/1i0bixo/how_to_access_rakuyomi_from_inside_the_koreader/" target="_blank">source 2</a>

Once that was done, here’s how I got Rakuyomi working inside KOReader:

1. Open KOReader, and tap the top bar to bring up the home menu.
2. Tap the magnifying glass and wipe to page 2 of the menu and labeled Rakuyomi. (Right after OPDS catalog)
3. Go to Manage Sources, then tap the + icon in the top left.
4. You should now be able to browse and search for manga directly within KOReader.

<a href="https://files.catbox.moe/9ht0m5.jpeg" target="_blank"><img src="https://files.catbox.moe/9ht0m5.jpeg" style="min-width:200px; max-width:400px;"></a>

### Conclusion

I’ve only scratched the surface of Kindle modding, and I’m really excited to keep exploring what’s possible. Emulators, native games, and lots of plugins. My boyfriend even installed Tetris for me (don’t ask me how — I have no idea).

There are still a few plugins I’m interested in but haven’t tried yet. I’ll figure those out eventually and share more once I get the chance to play around with them.

Thanks for reading!

### Links

- <a href="https://kindlemodding.org/" target="_blank">Kindle Modding Wiki</a>
- <a href="https://koreader.rocks/" target="_blank">KOReader</a>
- <a href="https://koreader.rocks/user_guide/" target="_blank">KOReader User Guide</a>
- <a href="https://github.com/hanatsumi/rakuyomi" target="_blank">Rakuyomi - Manga reader plugin for KOReader</a>
- <a href="https://youtu.be/Qtk7ERwlIAk?si=Y6tIcGAw8zjwMhym" target="_blank">“It’s Time to Jailbreak Your Kindle” – Dammit Jeff (YouTube)</a>
- <a href="https://github.com/huynle/koreader-plugins" target="_blank">KOReader Plugins</a>
