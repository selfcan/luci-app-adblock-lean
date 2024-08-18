# luci-app-adblock-lean

This app is my attempt at creating luci-based views for managing [adblock-lean](https://github.com/lynxthecat/adblock-lean).

I've used OpenWrt for a few years, but this is my first experience doing anything more than simply installing and updating it, so definitely use this app at your own risk!

Source for [luci-app-banip](https://github.com/openwrt/luci/tree/openwrt-23.05/applications/luci-app-banip) was used as a reference for this app.  And by used as a reference, I mean I straight up copy/pasted entire files out of that tree and into mine, with only minor changes to package names/paths/etc!

Source for [luci-app-adblock-fast](https://github.com/openwrt/luci/tree/master/applications/luci-app-adblock-fast) was also used as a reference for the RPC-portion of this app.

# Installation

In all cases, you'll want to log out of the web interface and back in to force a cache refresh after installing the new package.

## From package

The latest package can be downloaded from GitHub: [https://github.com/rickparrish/luci-app-adblock-lean/releases/tag/latest](https://github.com/rickparrish/luci-app-adblock-lean/releases/tag/latest).  

Download the .ipk file, then go to System -> Software on your OpenWrt admin console, click Upload Package, Browse for the file you just downloaded, click Upload, and finally click Install.

## From git

Clone the repo, and issue these commands to scp the files to your OpenWrt router (assuming OpenWrt.lan is how you connect to it):

```
scp -r applications/luci-app-adblock-lean/root/* root@OpenWrt.lan:/
scp -r applications/luci-app-adblock-lean/htdocs/* root@OpenWrt.lan:/www/
```

# Screenshot

![image](https://github.com/user-attachments/assets/a3477e02-8cd7-4578-b9be-ac5e6d7c3971)
