---
title: How I manage applications
description: This is a post on how I've set up my 3-2-1 backup system.
date: 2023-01-19T00:00:03
tags:
    - digital living
---

Managing Applications
* [As mentioned in the OS blog post](https://zanebartlett.com/blog/operatingSystem/), I also create the “Applications” folder in my file system
* AppImage Launcher - This handles App Images so that they work how you’d expect. Basically the first time you launch an appimage, it’ll move it from your downloads to a specified folder and creates a .desktop file if that’s not done automatically. A .desktop file doesn’t mean it’s visible on your desktop, it just means the app is searchable so you can launch the app from other places than directly clicking the appimage file.
  * Side note from the future: I've started to move away from AppImages because while they are the most connivent, it's also the smallest project. I would recommend using a Snap, Flatpak, or Electron apps where possible. Electron apps are the best for developers as they are supported across all distros and even other OSes.