---
title: Operating System
description: Talks about what operating system I use in my series on digital living.
date: 2023-01-19T00:00:00
tags:
    - digital living
---
I use Ubuntu Linux, with just Dash to Panel installed as an [extension](https://apps.gnome.org/app/org.gnome.Extensions/) (an app called “extensions” should be pre-installed if you download a recent version of Ubuntu, but that link explains what it is) so that I can make it look exactly how I want. I think if you looked at my computer without thinking about it, you’d assume I use windows. Some other configurations I have -
* [LivePatch](https://ubuntu.com/security/livepatch)
   * The page does a poor job of explaining it in layman's terms honestly, but all it does is keep your computer automatically updated. It’s free for up to five devices on an account.
* File System
   * Nothing too special here, the two things that I recommend you do are
      * Make a “Syncthing” folder, either put folders you use Syncthing for directly in there, or create a link (symlink is the technical term) to wherever the folder directly is. The app will tell you where your Syncthing folders are, but I just found viewing in the file system to be very nice.
      * Make an “Applications” folder and then an “AppImages” and “OtherApps” folders in it. Then link your “Snaps” folder in there under “Applications”, set your “AppImages” folder to be where AppImage Launcher puts appimages, and then any other apps, just put in “OtherApps” folder. This way, you have one folder for most apps. .deb file and Flatpak downloads will still put your downloads in potentially a few different places, but I feel like I don’t run into these as much. If it’s not clear what I’m talking about here, this is just different formats apps can be downloaded. [Here’s a decent write-up](https://phoenixnap.com/kb/flatpak-vs-snap-vs-appimage) that talks about this, but it’s not exhaustive and doesn’t mention .deb files for example.
* Virtual Desktops
   * I have three virtual desktops that I regularly use
      * The first is like a personal focus desktop, that usually just has my primary tabs that I always keep open - YouTube, google calendar, google drive, gmail, and asana. I keep these tabs pinned. If I’m working on something that I want to focus on I’ll usually only have that extra tab and whatever other tabs are relevant to it. 
      * This second is just to relax, I want videos, movies, anime, read, write, etc on this one.
      * Third is more hobby focused work. Stuff that’s usually related to career building or projects that I want to persist with open tabs for days, but don’t want to have to look at unless I’m in the mindset