---
title: Adding aspell as a system wide spell checker
description: Describing how I made aspell utility useful for quick spell checking 
date: 2023-08-17
image: content/work/aSpell/image.png
alt: "A picture of a terminal with suggestions"
---

<div class="image-container">
  {% image image, alt %}
</div>

<br>

<video width=100% controls>
  <source src="src/content/work/aSpell/Screencast from 08-17-2023 08:52:46 PM.webm" type="video/webm">
  Your browser does not support the video tag.
</video>


Spell-check Utility with aspell and Clipboard Integration

This Bash script provides an easy-to-use interface for spell-checking words. It detects if you're using X11 or Wayland, and adjusts clipboard commands accordingly.

**Dependencies:**

 - [aspell](https://manpages.ubuntu.com/manpages/xenial/man1/aspell.1.html): For spell-checking functionality.
   - To check if you have this installed `aspell -v` if it returns a version, you have it, if it throws an error, you need to install it
   - Install using `sudo apt install aspell`
 - Figure out if you need the copy and paste utility.
   - First [figure out if you have Wayland or X11](https://unix.stackexchange.com/questions/202891/how-to-know-whether-wayland-or-x11-is-being-used#325972), run 
        ```
        loginctl show-session $(awk '/tty/ {print $1}' <(loginctl)) -p Type | awk -F= '{print $2}'
        ```
     - [For x11 use xclip](https://github.com/astrand/xclip)
       - `sudo apt install xclip`
     - [for Wayland use wl-clipboard](https://github.com/bugaevc/wl-clipboard)
       - `sudo apt install wl-clipboard`

**Features:**

- Clipboard Integration: Can directly read from and write to the clipboard.
- Auto-close: Closes the terminal automatically after completion.
- Auto-copy: Automatically copies the first suggestion to the clipboard.
- User-friendly Interface: Offers corrections in a numbered list.

**Usage:**

`./spellcheck.sh [--auto-close] [--clip-board] [--auto-copy]`

**Options:**

- --auto-close: Closes the terminal after performing the checks.
- --clip-board: Reads the word to be checked from the clipboard.
- --auto-copy: Directly copies the most probable suggestion to the clipboard.

**My set up:**

I have a [shortcut key](https://help.ubuntu.com/stable/ubuntu-help/keyboard-shortcuts-set.html) ctrl+shift+; for `gnome-terminal -- bash -c "[FILEPATH]/spellcheck.sh --auto-close --clip-board"`, which opens the terminal with suggestions and let's my select which to put in my clipboard. 
Then ctrl+k for `[FILEPATH]/spellcheck.sh --auto-close --clip-board --auto-copy`, which will automatically take the most likely word and add it to my clipboard.

**Code:**

{% raw %}
```bash
#!/bin/bash

# Detect display server and assign clipboard commands
if [[ $XDG_SESSION_TYPE == "wayland" ]]; then
    CLIPBOARD_COPY_CMD="wl-copy"
    CLIPBOARD_PASTE_CMD="wl-paste"
else
    CLIPBOARD_COPY_CMD="xclip -selection clipboard"
    CLIPBOARD_PASTE_CMD="xclip -selection clipboard -o"
fi

# Check for the flags
AUTO_CLOSE=false
CLIP_BOARD=false
AUTO_COPY=false
for arg in "$@"; do
    case $arg in
        --auto-close)
            AUTO_CLOSE=true
            ;;
        --clip-board)
            CLIP_BOARD=true
            ;;
        --auto-copy)
            AUTO_COPY=true
            ;;
    esac
done

# Read input from the user
if [ "$CLIP_BOARD" == "true" ]; then
    word=$($CLIPBOARD_PASTE_CMD)
else
    read -p "Enter the word to spellcheck: " word
fi

# Check the word using aspell
corrections=$(echo "$word" | aspell -a | sed '1d' | sed 's/^.*: //')

# If no corrections, echo the word is correct
if [ -z "$corrections" ]; then
    echo "The word is spelled correctly."
    [ "$AUTO_CLOSE" == "true" ] || read -p "Press enter to close the terminal..."
    exit 0
fi

# Split corrections into an array
IFS=", " read -r -a suggestions <<< "$corrections"

# If auto-copy is enabled
if [ "$AUTO_COPY" == "true" ]; then
    selected_word=${suggestions[0]}
    echo -n "$selected_word" | $CLIPBOARD_COPY_CMD
    exit 0
fi

# Otherwise, list the suggestions
echo "Did you mean:"

# Display suggestions as a reversed numbered list
length=${#suggestions[@]}
for ((index=0; index<length; index++)); do
    echo "$((length - index)). ${suggestions[$((length - index - 1))]}"
done

echo -n "Enter the number of the correct word, or 'j' for 1: "

# Read first character
read -n 1 -s char

# If the character is 'j', set selection to 'j'
if [ "$char" == "j" ]; then
    selection="j"
    echo # move to a new line after the input
else
    # Initialize the selection with the first character
    selection="$char"
    
    # Read the rest of the characters until "Enter"
    while true; do
        # Echo the character to keep input on the same line
        if [ "$char" == $'\177' ]; then  # backspace was pressed
            # Remove the last character from selection
            selection=${selection:0:${#selection}-1}
            # Move cursor one position back and clear line after cursor
            echo -ne "\b \b"
        else
            echo -n "$char"
        fi
        
        # Read next character
        read -n 1 -s char

        # If "Enter" is pressed, break the loop
        if [[ -z "$char" ]]; then
            break
        elif [ "$char" != $'\177' ]; then  # append char to selection only if it's not a backspace
            selection+="$char"
        fi
    done
    echo # move to a new line after finishing input
fi

# Check if 'j' is selected for the most likely option
if [ "$selection" == "j" ]; then
    selected_word=${suggestions[0]}
else
    selected_word=${suggestions[$((selection - 1))]}
fi

# Copy the selected word to the clipboard
echo -n "$selected_word" | $CLIPBOARD_COPY_CMD
[ "$AUTO_CLOSE" == "true" ] || read -p "'$selected_word' has been copied to clipboard. Press enter to close..."
```
{% endraw %}