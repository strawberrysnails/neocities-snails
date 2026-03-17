---
layout: list.njk
title: Archives 
permalink: /library/archives/spywarefirefox
showToc: true
header:  '&#124; <a href="/library/archives">Return to the Archives</a> &#124; <a href="/library">Return to Library</a>'
---

Note: make a layout for archives/plain markdown articles

## Mozilla Firefox

Mozilla Firefox is one of the most popular and longest existing browsers. Its developers have earned it a reputation for being a "privacy and security-based browser, respecting the user" — but is it justified, or just marketing? In fact, over the years they have made several anti-privacy (and generally anti-user) decisions, but this article will focus exclusively on spying. Version tested: 52.5.0, with the default settings. Program used for testing requests: Mitmproxy.

**Spyware Level: High**

After following the [mitigation guide](https://spyware.neocities.org/guides/firefox.html), this software is **Not Spyware**.

It sends a lot of different data very often (some of which could uniquely identify you). All the "services" that it provides, such as its default search engines and Pocket, are anti-privacy. The rating isn't higher because at least you can turn off or modify most of it, though it often requires diving deep into about:config.

### Phoning home

Whenever you start Firefox, it makes this request:

![Request](images/3.png)

In fact, it makes it every time you go to a website, and even a few times in a row for a single website. So Firefox "phones home" all the time, without your knowledge. **Can be disabled ONLY in about:config**. But, since you've already started Firefox, it will make this request at least once.

### Automatic connections to some websites you've visited, including their trackers

Websites you visit most often are added to the New Tab panel. When you then open a new tab, Firefox will sometimes make requests to the sites in there, including some of their trackers. I haven't determined how it works yet. Sometimes it doesn't make the requests at all; other times you end up with hundreds of images, scripts, trackers, etc. loaded simply because you opened a new tab (without visiting any website explicitly). **Was NOT able to find a way to disable this**, even in about:config.

### Firefox tracks users with Google Analytics

Firefox has been integrated with the spyware platform called "Google Analytics"[\[1\]](#s1). Firefox has been confirmed to now send analytics to Google. According to a Firefox developer the spyware in Firefox is "extremely useful to us and we have already weighed the cost/benefit of using tracking." and that Firefox will not remove Google Analytics support entirely. Firefox's position on privacy is made very clear with this quote:

_"Wanted to address your position though: We don't give the "data directly to Google". See the discussion here: https://bugzilla.mozilla.org/show\_bug.cgi?id=858839. The short version is: tl;dr: We now have an option to opt-out of Google doing anything with the data that Google Analytics collections on Mozilla websites. GA tracking is anonymous and at the aggregate level and we use it to improve the experience of our websites. We are collecting aggregate and non-identifiable data in numbers to ensure our development/UX changes are met well. We can respect privacy and still have analytics; in fact Mozilla's aim is for an experience that values user privacy and usability (I'd say Apple also wants UX that fits that mold, as an example). We need some data, anonymized and aggregated, to do this."_

The best takeaway to this is that Mozilla wants to pretend that including spyware in their program is somehow not a breach of privacy, and that Firefox could possibly be respecting user privacy while simultaneously collecting data on users and sending it to Google. It's strongly suggested reading the GitHub thread and the further anti-privacy statements the Mozilla employee makes while defending the spyware features in Firefox. It's very dangerous to assert that there is icious" and it makes a request to update it every day (even if you don't have any addons installed).

![Blocklist](images/7.png)

The request includes a **uniquely identifying** browser installation ID. **Can be disabled ONLY in about:config.**

### Firefox phones home about almost every single interaction you have with its UI

Firefox will send information about almost every basic operation that you do back to Mozilla. This is tagged with a unique client ID and an ID for your current session, and any relevant information related to this action. **By default, the following uses of the UI are reported to Mozilla[\[5\]](#s5):**

*   Performing a search
*   Clicking a top site item
*   Deleting an item from history
*   Blocking a site
*   Bookmarking a link
*   Removing a bookmark from a link
*   Opening a link in a new window
*   Opening a link in a new private window
*   Opening the new tab preferences pane
*   Closing the new tab preferences pane
*   Acknowledging a section disclaimer
*   Adding or editing a new TopSite
*   Requesting a custom screenshot preview
*   Session end
*   Impression stats
*   Click/block/save\_to\_pocket ping
*   Addon initialization failure
*   Domain affinity calculation

Essentially, while this feature doesn't broadcast your search history to Mozilla, it proves an incredibly detailed walkthrough of exactly how you use Firefox's user interface. This can be disabled and is an opt-out spyware feature. You can disable it through the GUI as described here: [Share data with Mozilla to help improve Firefox](https://support.mozilla.org/en-US/kb/share-data-mozilla-help-improve-firefox) [\[web.archive.org\]](http://web.archive.org/web/20181002204159/https://support.mozilla.org/en-US/kb/share-data-mozilla-help-improve-firefox) [\[archive.fo\]](http://archive.fo/gkVeb) [\[ghostarchive.org\]](https://ghostarchive.org/archive/lzNDJ?kreymer=false)

### Whitelisting trackers

Mozilla has a feature called "Enhanced Tracking Protection". This feature's claimed goal is to protect the user from being tracked. This would be nice if Mozilla didn't whitelist a massive list of domains[\[9\]](#s9).

### Mitigating Firefox Spyware

This review is also accompanied by a page about how to configure Firefox to be more privacy respecting, and links to other projects that have been created to solve this problem. You can read about that [here.](https://spyware.neocities.org/guides/firefox.html) These are some of the flags in about:config mentioned earlier in the article, and the values that they should be set too:

Spyware Feature

about:config flag

about:config value

Source

Phoning home

network.captive-portal-service.enabled

False

[Turn off captive portal](https://support.mozilla.org/en-US/questions/1157121) [\[archive.li\]](https://archive.li/57xdG) [\[web.archive.org\]](https://web.archive.org/web/20180721175100/https://support.mozilla.org/en-US/questions/1157121)

Self-Repair

browser.selfsupport.url

""

[How can I stop firefox from constantly connecting to self-repair.mozillia.org](https://support.mozilla.org/en-US/questions/1067502) [\[archive.is\]](https://archive.li/a17cN) [\[ghostarchive.org\]](https://ghostarchive.org/archive/LJbGO)

Pocket

pocket.enabled

False

[Disable Pocket in Firefox](https://help.getpocket.com/article/1025-disabling-pocket-in-firefox#firefox) [\[archive.is\]](https://archive.li/mWBcp) [\[ghostarchive.org\]](https://ghostarchive.org/archive/uFyTF)

* * *

#### Further Reading

1.  [firefox "about:config" settings](https://jojo-website.neocities.org/privacy.html) [\[web.archive.org\]](http://web.archive.org/web/20180821224202/https://jojo-website.neocities.org/privacy.html) [\[archive.is\]](http://archive.is/eyzdE) [Firefox's Enhanced Tracking Protection whitelists Google, Instagram... and Winamp?](https://invidious.snopyta.org/watch?v=UqkeZIPLY5M)

* * *

#### Sources

1.  [Google Analytics is used to track users](https://github.com/mozilla/addons-frontend/issues/2785) [\[web.archive.org\]](https://web.archive.org/web/20180511002156/https://github.com/mozilla/addons-frontend/issues/2785) [\[archive.li\]](https://archive.li/hF6KB) [\[ghostarchive.org\]](https://ghostarchive.org/archive/4X56U?kreymer=false) [\[via.hypothes.is\]](https://via.hypothes.is/https://github.com/mozilla/addons-frontend/issues/2785)
2.  [FAQ for FHR](https://blog.mozilla.org/metrics/fhr-faq) [\[web.archive.org\]](https://web.archive.org/web/20180513014211/https://blog.mozilla.org/metrics/fhr-faq/) [\[ghostarchive.org\]](https://ghostarchive.org/search?term=https://blog.mozilla.org/metrics/fhr-faq/) [\[archive.li\]](https://archive.li/No9Xo)
3.  [Pocket Privacy Policy](https://getpocket.com/privacy?t=privacypolicy) [\[web.archive.org\]](http://web.archive.org/web/20180410043925/https://getpocket.com/privacy?t=privacypolicy) [\[archive.is\]](https://archive.is/dCa2m) [\[ghostarchive.org\]](https://ghostarchive.org/archive/69mcK?kreymer=false)
4.  [Snippets Service Data Collection](https://abouthome-snippets-service.readthedocs.io/en/latest/data_collection.html) [\[web.archive.org\]](https://web.archive.org/web/20180410043926/https://abouthome-snippets-service.readthedocs.io/en/latest/data_collection.html) [\[archive.li\]](https://archive.li/JDXjv) [\[ghostarchive.org\]](https://ghostarchive.org/archive/1Ad5D?kreymer=false)
5.  [Metrics we collect](https://github.com/mozilla/activity-stream/blob/master/docs/v2-system-addon/data_events.md) [\[web.archive.org\]](https://web.archive.org/web/20180530091900/https://github.com/mozilla/activity-stream/blob/master/docs/v2-system-addon/data_events.md) [\[archive.li\]](https://archive.li/aK9Bx) [\[ghostarchive.org\]](https://ghostarchive.org/archive/ty2Xt?kreymer=false)
6.  [Turn off captive portal](https://support.mozilla.org/en-US/questions/1157121) [\[archive.is\]](https://archive.li/57xdG) [\[ghostarchive.org\]](https://ghostarchive.org/archive/vErK3?kreymer=false)
7.  [How can I stop firefox from constantly connecting to self-repair.mozillia.org](https://support.mozilla.org/en-US/questions/1067502) [\[archive.is\]](https://archive.li/a17cN) [\[ghostarchive.org\]](https://ghostarchive.org/archive/bHz3f?kreymer=false)
8.  [Disable Pocket in Firefox](https://help.getpocket.com/article/1025-disabling-pocket-in-firefox#firefox) [\[archive.is\]](https://archive.li/mWBcp) [\[ghostarchive.org\]](https://ghostarchive.org/archive/uFyTF)
9.  [List of whitelisted trackers](https://disconnect.me/trackerprotection/unblocked) [\[web.archive.org\]](https://web.archive.org/web/20200411051257/https://disconnect.me/trackerprotection/unblocked) [\[ghostarchive.org\]](https://ghostarchive.org/archive/PLqhJ?kreymer=false)

* * *

**This article was last edited on 08/17/2021**  
**This article was created on 11/23/2017**

If you want to edit this article, or contribute your own article(s), visit us at the git repo on [Codeberg](https://codeberg.org/shadow/SpywareWatchdog).

All contributions must be licensed under the CC0 license to be accepted.

[![CC0 License](images/8.png)](https://spyware.neocities.org/LICENSE.txt)



## Mozilla Firefox Spyware Mitigation Guide


Note: This guide is deprecated. Sometime in the future it will be updated again.

You may want to see [this](https://codeberg.org/shadow/SpywareWatchdog/issues/58) for more information.

After configuring Mozilla Firefox with arkenfox's user.js, according to this guide it's rating changes like so:

**Spyware Rating: High → Not Spyware**

The arkenfox's user.js is a template which aims to provide as much privacy and enhanced security as possible, and to reduce tracking and fingerprinting as much as possible — while minimizing any loss of functionality and breakage (but it will happen).[\[2\]](#two)

  

Before beginning this guide it is important that you try and cross-reference it with other guides, to see which prospective on this topic is the best way to do it for you. At the bottom of the page are links to [other guides](#Other_Guides) and projects like this one. You should strongly consider this as **you may find other guides more useful than this one.**

  

For extra privacy & security, disconnect your computer from the internet while following this guide, so that Firefox is unable to phone home by accident.

  

Mozilla Firefox has a huge amount of spyware features, but they can all be disabled by using predefined profile settings. To do this you need to create new Firefox profile:

*   Run `firefox -no-remote -ProfileManager`
*   Create a new profile
*   Exit.

Then open your Firefox user profiles directory. It should be located at:

OS

Path

Windows 7

`%APPDATA%\Mozilla\Firefox\Profiles\XXXXXXXX.your_profile_name`

Linux

`~/.mozilla/firefox/XXXXXXXX.your_profile_name`

OS X

`~/Library/Application Support/Firefox/Profiles/XXXXXXXX.your_profile_name`

Android

`/data/data/org.mozilla.firefox/files/mozilla/XXXXXXXX.your_profile_name`

Sailfish OS + Alien Dalvik

`/opt/alien/data/data/org.mozilla.firefox/files/mozilla/XXXXXXXX.your_profile_name`

Windows (portable)

`[firefox directory]\Data\profile\`

  

Delete everything from the new profile and get arkenfox's user.js:

`cd /path/to/your/profile && rm -r * && wget https://raw.githubusercontent.com/arkenfox/user.js/master/user.js`

You may want to edit the file to your needs, if so:

`$EDITOR user.js`

If you want to disable OCSP as well, you should also add this to your user.js. These settings are separated because while OCSP is a privacy breach, it is also a security feature. It works by contacting other servers to verify the authenticity of the address you are connecting to.

You should think about it before making a decision. You can read more about OCSP here: [https://scotthelme.co.uk/revocation-is-broken/](https://scotthelme.co.uk/revocation-is-broken/) [\[web.archive.org\]](http://web.archive.org/web/20180831224302/https://scotthelme.co.uk/revocation-is-broken/).

`user_pref("security.ssl.enable_ocsp_stapling", false);   user_pref("security.OCSP.enabled", 0);   user_pref("security.OCSP.require", false);   `

With this installation method, if you change any of the settings in user.js through about:config or Firefox preferences dialogs, they will be reset to the user.js defined values after you restart Firefox. This makes sure they're always back to secure defaults when starting the browser. At the end you need to delete several default plugins in Firefox directory at `/path/to/firefox/browser/features` (ie `/usr/lib/firefox/browser/features/`) that can violate privacy:

*   firefox@getpocket.com.xpi — Pocket
*   followonsearch@mozilla.com.xpi — Follow On Search
*   activity-stream@mozilla.org.xpi — Activity Stream
*   screenshots@mozilla.org.xpi — Screenshots
*   onboarding@mozilla.org.xpi — Onboarding
*   formautofill@mozilla.org.xpi — Autofill
*   webcompat@mozilla.org.xpi — Web Compatibility Reporter

It is highly recommended to also check other user.js template settings from ongoing _"arkenfox-user.js project"_[\[1\]](#one) for further hardening Firefox privacy, security and anti-fingerprinting.

  

Run `firefox -no-remote -ProfileManager` again and start the profile you created. Delete any others if needed. Check to make sure, after the first start, that another profile which does _not_ use arkenfox was not created by Firefox.

* * *

Other Guides
------------

These are other guides and projects to help protect your privacy using Firefox. It's important to look at other perspectives instead of reading JUST this guide. So you should be comparing all of the guides that you can find to hear everyone's ideas about how this should be done, before you finish setting Firefox up. Librewolf is less of a guide and more of a project and series of tools and settings you can download to help you make Firefox private.

1.  [Privacy Related "about:config" Tweaks to Firefox](https://www.privacytools.io/#about_config) [\[web.archive.org\]](http://web.archive.org/web/20181031171622/https://www.privacytools.io/) [\[archive.is\]](http://archive.fo/SEFXb)
2.  [Firefox Privacy – The Complete How-To Guide](https://restoreprivacy.com/firefox-privacy/) [\[web.archive.org\]](https://web.archive.org/web/20181015023738/https://restoreprivacy.com/firefox-privacy/) [\[archive.is\]](http://archive.is/20180414165038/https://restoreprivacy.com/firefox-privacy/)
3.  [Librewolf, Firefox with privacy enhancements](https://gitlab.com/librewolf-community/browser/linux/)


Sources
-------

1.  [https://commons.wikimedia.org/wiki/File:Firefox\_logo,\_2019.svg](https://commons.wikimedia.org/wiki/File:Firefox_logo,_2019.svg) (Firefox Logo)
2.  [arkenfox/user.js](https://github.com/arkenfox/user.js/blob/master/user.js) [\[web.archive.org\]](http://web.archive.org/web/20181015031306/https://github.com/arkenfox/user.jss/blob/master/user.js) [\[archive.is\]](http://archive.is/GXIBO)
3.  [https://github.com/arkenfox/user.jss/blob/master/README.md](https://github.com/arkenfox/user.js/blob/master/README.md)


