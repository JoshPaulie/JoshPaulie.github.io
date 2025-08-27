---
date: '2025-08-27'
draft: false
title: 'Resurrecting the banished garage PC'
summary: 'The adventure of updating a Prime B350-PLUS BIOS.'
tags: ['tutorial', 'troubleshooting']
category: []
ShowToc: true
---

# Intro

I recently inherited my brother's old desktop. It's a modest upgrade from my 2017 budget build, but with a notable behavior: _it frequently crashed under load_. Without performance issues or error messages, it completely powers off as if the power cable was abruptly ripped out.

My brother explained this began after upgrading his graphic card to an RTX. He (logically) believed this to be a power supply issue, considering all of the involved hardware was compatible. So he ordered and installed a new power supply, only for the issue to persist. He eventually couldn't live with the constant crashes, and ordered himself a new rig. The old system was then relegated to the garage.

Maybe a year later, I abducted the setup to see if I could resolve the issue.

My first solution was flash it with a new Windows install and cosmically will the issues to resolve themselves. It worked for a deceiving amount of time but finally did crash while gaming. My next solution was to chalk that crash up as a fluke and ignore it. That wasn't much help either.

After doing the basics (like ensuring all drivers were up to date, reseating the cables), my actual next step was checking out the Event Viewer, which had the following helpful entries:

```
Performance power management features on processor 1 in group 0 are disabled due to a firmware problem. Check with the computer manufacturer for updated firmware.
```

This indicates 2 issues to me: a motherboard issue, or a power issue. We had already replaced the power supply, so it must be a motherboard issue.

# Updating the motherboard firmware

Frankly, I'm not sure how one goes about troubleshooting a motherboard issue, so I went the easiest route first: update the BIOS firmware. Used [`winfetch`](https://github.com/lptstr/winfetch) to grab the motherboard model and found it was an Asus **PRIME B350-PLUS**. Quick google search led me to the BIOS [firmware download link](https://www.asus.com/supportonly/prime%20b350-plus/helpdesk_BIOS/).

Under the "Driver and tools" section, we're informed this must be manually updated:

> We don't currently provide a software utility or drivers for this model.

Beneath the BIOS section was a single entry for my board: version **6232**, released in 2024.

I booted into the BIOS to see what version we were currently rocking: version **803**, released in 2017.

Considering the RTX card was released in 2019, I figured it was safe to assume my fix was somewhere in the 5,429 patches released since.

After hitting the download button for the sole entry, I was provided a zip archive with 2 files:

- BIOSRenamer.exe
- PRIME-B350-PLUS-ASUS-6232.CAP

With no other instructions provided, I sensibly ran the mystery .exe and hoped for the best.

It *seems* the executable determined the exact model of motherboard I was using, and renamed that `.CAP` file to some sort of logical identifier. In my case, `PRIME-B350-PLUS-ASUS-6232.CAP` was renamed to `PRB350PS.CAP`

Now what? Read the manual I guess. 🤮

Section 2.1.2 of the board's manual states I need to save this `.CAP` file to a USB, but specifically one formated with FAT32/FAT16. Windows didn't offer either in the builtin formatting tool, likely because format was made for much smaller USBs, and was only offering exFAT.

Downloaded ol' reliable, [Rufus](https://rufus.ie/en/), and got the thumb drive formatted properly. Moved the `.CAP` file onto the stick, and booted back into the BIOS.

From the BIOS went to **Advanced Mode** > **Tool** > **ASUS EZ Flash 3 Utility** > **"Via storage device"**. My USB and file was already selected from the list of drives, I simply hit \<Enter> and confirmed the change.

## Results

After booting into my machine, I downloaded all of the GPU stress tests I could find. Ran quite a few tests, including benchmarks, and didn't have any crashes. Been using and abusing the system with my racing games for a few weeks now, it now runs like a champ.

Was pretty happy to give the garage PC a second life.
