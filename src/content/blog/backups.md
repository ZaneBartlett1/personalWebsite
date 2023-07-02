---
title: How I handle backups
description: This is a post on how I've set up my 3-2-1 backup system.
date: 2023-01-19T00:00:12
tags:
    - digital living
---

# Intro

I implement a full [3-2-1 backup](https://www.veeam.com/blog/321-backup-rule.html) system that's fully encrypted, only spending the cost of hard drives and cloud storage. It's as close to FOSS as you can get without having to host your own server.

## Notes

* The two big cons of this system is that what you have backed up is not practically cloud accessible, as in, unless you are literally just needing to restore something, you will not be using this to just access your data. Decryption is not quick enough to be practical for day to day access, basically. Then, using Syncthing, you duplicate the data across devices, which is strongly not preferable unless you have a dedicated storage device.

* The pros of this system is that it’s all through a GUI and compared to anything else it’s incredibly easy to set up, it’s basically free besides the hard drives and cloud storage, all FOSS besides the cloud storage provider (unless you’re using NextCloud, then it’s ALL FOSS!), besides the restores the entire thing is automated, and if you’re using something like [LUKs](https://itsfoss.com/luks/) (if you have two passwords to sign in on a full power cycle, you’re likely using LUKs) then your data should be encrypted at basically every point in this system.

* I use [Syncthing](https://syncthing.net/) to get any data from devices to my desktop. They have desktop and mobile apps that are extremely configurable

* For people new to 3-2-1 backups, a big issue that comes up for a lot of people is RAID, and why things like that aren't "true" backups. Just as a mention, something that really helped me to understand the difference was isolation. When you have a RAID system, you do have a *copy*, but it can't be labeled as a backup, why? The reason for this is there's no isolation. If data gets ruined on one of the copies, it gets ruined on the other copies. You can't change that without implementing something that isn't RAID. RAID is good for having multiple copies that makes it faster to let lots of people use, but if the data put in is bad on one copy, it's bad on all copies. For good backup solutions, this should not be true. Some RAID architecture *do* have backups in them, a certain amount of drives that can fail without losing data, but this uses more drives than if you were to *just* implement a backup solution.

</br>

# Backup 1

I use my personal desktop as the first place there’s a full backup for anything I care about. This way my first layer of backups I just worry about having enough storage on my computer.

</br>

# Backup 2

## Different medium

I use [Deja Dup](https://apps.gnome.org/app/org.gnome.DejaDup/) (also referred to as simply “backups” on system applications usually) to automatically back up to an external hard drive nightly

This was the easiest way to set up backups. Also, this app does actually come by default, but I had never heard of it, you might already have it on your system! Lastly, while I did kind of have to fight with this application, it is still the best I could find (FOSS anyway, if you want to pay for something/are okay with proprietary, there might be better options) and once I got through those problems, I haven’t had to worry about it.

</br>

# Backup 3

## it’s offsite, and is a different medium

Then I have a cloud storage system. I use Pcloud, but really most will work as long as they can be pointed at a folder in your file system to stay in sync *and* can do a rewind. The rewind is important to keeping it a true backup. If you don't have a rewind feature, then if you were to experience data loss, that would be copied over to your cloud storage. Pcloud has an up to 30 day rewind function, down to the hour.

</br>

# Restore every 6 six months

## Backups are only as valid as their ability to be restored

Then, every six months I’ll restore from my cloud backup to a fourth external hard drive. I installed [VeraCrypt](https://www.veracrypt.fr/code/VeraCrypt/) on this one, and restore directly into a vault when I do my restores. This is only necessary if you're wanting to keep everything encrypted at every step. This provides me with a 4th backup that's air gapped, but that’s honestly just overkill. The reason to do it on a different hard drive is just so you don’t have to unplug or fiddle with your one that’s always plugged in. If you’re not doing restores, you’re not really checking that you know you have backups. Then, when I’m done with the restore, I unplug the hard drive. This provides me with a single, air gapped, back up. I keep two full copies here. So, short of someone waiting a year to encrypt all my files for ransomware, I can lose at most, 6 months of data. Still a lot, but not the important stuff. Technically this is referred to as 3-2-1-1-0, 3 copies, 2 mediums, 1 offsite, 1 air gapped, 0 errors. Although the 0 errors is a bit of a stretch since the verify process is weak and in-frequent.

</br>

# Conclusion

While I think this is a bit much to have to do to set up, the overall experience once it is set up is very easy. The only time I spend after I've set this up is if I need to buy more hard drive storage or cloud storage, and then whatever time it takes to verify a restore.   A product idea would be something that's basically just a raspberry pi with syncthing, Deja Dup, and the ability to read your OS and automatically backup to other devices, you could automate basically all of this. You'd have what is basically a hard drive you plug in, a window would pop up, ask you what folders you want to back up (which is handled by Deja Dup), and if you want to connect any off site backups, which would be handled by syncthing.