---
title: Working on Nvim Config
description: Describing what my Nvim does.
date: 2022-10-22
image: content/work/NvimConfig/image.png
alt: "test"
---

<div class="image-container">
  {% image image, alt %}
</div>

Read on [GitHub](https://github.com/ZaneBartlett1/nvim)

## Notes

* I wanted something that felt comfortable, easy to set up on a new machine, generally good for any day to day text editing, light, and very importantly stable. If everything goes well, this entire set up should feel like an extremely basic IDE (really only for python), only take fifteen or so minutes, and all be fairly readable if you know basic lua.
   * Tab complete for python ([CoC](https://github.com/neoclide/coc.nvim))
   * Linting for python ([CoC](https://github.com/neoclide/coc.nvim))
   * Formatting for python ([Black](https://github.com/psf/black))
   * Buffer tabs ([Barbar](https://github.com/romgrk/barbar.nvim))
   * Git decorators ([Gitsigns](https://github.com/lewis6991/gitsigns.nvim))
   * Nice vscode inspired dark theme ([VScode](https://github.com/Mofiqul/vscode.nvim))
   * Syntax highlighting (native)
   * Cleaned up netrw (native)
   * Check out [```lua/keys.lua```](https://github.com/ZaneBartlett1/nvim/blob/main/lua/keys.lua) for any preset keymappings. Mostly setting better buffer and window navigation. 
   * Very Lua inspired. All of my personal configuration is in Lua, and besides Coc and Black for fairly obvious reasons, all plugins are written almost completely in Lua.
 * If you're looking for something more, I recommend checking out -
    * A more complete, but still "basic" [IDE](https://github.com/LunarVim/nvim-basic-ide)
    * Closest to a full [IDE](https://github.com/LunarVim/LunarVim)
* Check Issues for what I'd like to improve and known bugs. My preference for reporting issues would be [Issues](https://github.com/ZaneBartlett1/nvim/issues). For questions, ideas, etc I would prefer [Discussions](https://github.com/ZaneBartlett1/nvim/discussions).


## Setting up

1. Install [neovim](https://github.com/neovim/neovim/releases/tag/stable) if you haven't already. I recommend the appimage, makes updating really easy.
    * You may need to run ```sudo add-apt-repository universe
sudo apt install libfuse2```
2. Clone repo into ```~/.config```
3. Get a Patch Font from NerdFonts set up, this is for the barbar plugin as it uses icons in its tabs.
    * You can watch the video below for more detailed instructions, but a quick walkthrough here -
      * A patch font is basically a wide variety of glyphs all set to a certain font. If you're not picky download "Hack Nerd Font" [here](https://www.nerdfonts.com/font-downloads). It's a popular and what I used. NOTE: There is a way to install a smaller file [here](https://github.com/ryanoasis/nerd-fonts#patched-fonts), but I could NOT get this to work following the instructions. If you'd like the file to be smaller and more specific, try that.
      * Unzip the file and move it to a spot your system can see it. For Ubuntu, you can make a directory called "fonts" under ```~/.local/share```, so ```mkdir ~/.local/share/fonts```, and put the unzipped folder there.
      * Set your terminal to use the custom font. For the GNOME terminal I found it under preferences/profiles/text. Select "custom font" and choose whatever patch font you downloaded. You may need to restart your terminal to find it if you had it open while you moved the unzipped folder.
    * [This video was what I used](https://www.youtube.com/watch?v=fR4ThXzhQYI)
4. Get Black set up
    * Should just be ```pip install black```
    * [Full guide](https://black.readthedocs.io/en/stable/getting_started.html)
5. With nvim open run  ```:PackerSync```
6. Get coc-pyright set up
    * For python - With neovim open, run ```:CocInstall coc-pyright```
    * [Full guide](https://github.com/fannheyward/coc-pyright)
7. Assuming you're using [nvim appimage,](https://github.com/neovim/neovim/releases) and it's in ```~/.local/share/applications/```, here's a couple nice bash aliases. With this you can run nvim with "v". Then with "V", you can run nvim, open your file explorer, and terminal all at once. Add the below to your .bashrc. If you're unfamiliar with .bashrc read more [here](https://www.digitalocean.com/community/tutorials/bashrc-file-in-linux), but it's just the bash configuration file, like how the init.lua file is the nvim configuration file to nvim.
```
alias v='~/.local/share/applications/nvim.appimage'
alias V='~/.local/share/applications/nvim.appimage -c ":Lexplore|wincmd l|10split|terminal"'
```


## Sources used (very non-exhaustive)
* https://mattermost.com/blog/how-to-install-and-set-up-neovim-for-code-editing/
* https://gist.github.com/danidiaz/37a69305e2ed3319bfff9631175c5d0f
* http://www.akhatib.com/making-netrw-clean-and-minimally-disruptive-then-stop-using-it/
* https://github.com/rockerBOO/awesome-neovim#terminal-integration
* https://www.youtube.com/watch?v=435-amtVYJ8
* https://github.com/LunarVim/nvim-basic-ide/blob/master/lua/user/keymaps.lua
