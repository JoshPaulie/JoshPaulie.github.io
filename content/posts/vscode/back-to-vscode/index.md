---
date: '2025-04-25'
draft: false
title: 'Back to VSCode'
summary: 'Making VSCode Neovim-esque as I can'
tags: ['neovim', 'vscode']
category: []
ShowToc: true
---
I've had to return to VSCode (from Neovim) for work. Here are some thoughts on how I'm getting the most Neovim-like experience possible.

> **Note**: I won't be going into too much detail, as I expect the reader to also be transitioning from Neovim to VSCode.

## Sidenote: Extensions aren't so bad
I do miss declaratively defining plugins, but having a little marketplace to install everything from LSPs to themes is nice.

What's not so nice? Having to define ALL of your extension settings in a single `settings.json`. Microsoft, please give us modular config files.

-----

## Vim-er VSCode
```jsonc
{
  "editor.cursorSurroundingLines": 10, // Scrolloff
  "editor.cursorBlinking": "solid", // Static cursor
  "editor.lineNumbers": "relative", // Rel line numbers
  "editor.semanticHighlighting.enabled": true, // Treesitter-like highlighting
  "vim.useSystemClipboard": true, // OPTIONAL
  "window.restoreWindows": "none", //   Blank window
  "workbench.startupEditor": "none", // when opening
}
```

### General VSCode clutter
```jsonc
{
  "editor.minimap.enabled": false,
  "editor.stickyScroll.enabled": false,
  "workbench.sideBar.location": "right"
}
```

-----

## VSCode Text Objects: The bread and butter

If you're a Neovim refugee as well, you know how indispensable text objects are.

[VSCode Textobjects](https://marketplace.visualstudio.com/items?itemName=RodrigoScola.vscode-textobjects) is a phenomenal reimplementation of [Treesitter's Textobjects](https://github.com/nvim-treesitter/nvim-treesitter-textobjects). It's written by a solo dev and somehow only has 5 stars, with around 115 downloads.

It supports a TON of languages and is incredibly well thought-out. After copying/merging in the config snippet, all the standard Vim text object motions are available, but for actual programming objects (classes, functions, variable names/values, loops, conditionals). It's as close to perfect as VSCode will allow.

The toughest part is that you must manually configure **all** text object motions in your config file. Not so bad, you'd have to do the same in Neovim. But this is hundreds of lines long, and we only have one config file to work with.

> Again, Microsoft, PLEASE let us modularize our configs.

Another limitation is that you only get the "vanilla" editing operations (visual select, replace, delete, etc). While it covers most needs, there are some constraints:

- Can't comment out the body of a function with `gcif`
- Solution: visually select the inner contents first, *then* comment with `vifgc`

This occurs because both VS Text Objects and VSCodeVim are emulation layers. Unless they were merged, their motions remain unaware of each other.

-----

## VSCodeVim

VSCodeVim is more than just motion emulation. It includes many [essential plugins](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#-emulated-plugins) built-in, some enabled by default. My favorites:

### [vim-easymotion](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#vim-easymotion) (Disabled)

Quickly jump to any visible character:
```jsonc
{
  "vim.easymotion": true,
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["s"],
      "after": ["<leader>", "<leader>", "s"]
    }
  ]
}
```

{{< video src="assets/easymotion.mp4" >}}

### [vim-surround](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#vim-surround) (Enabled)

Surround objects with characters (quotes, brackets, backticks, visual selection, etc). Great for turning `symbol` into a `"string"` (`ysiw"`), or changing a list `[1, 2, 3]` into a set `{1, 2, 3}` (`cs]}`)

{{< video src="assets/surround-set.mp4" >}}

#### Tips

- To surround your visual selection, use `S`.  
> *This differs from `vim-surround` in Neovim, where `S` is not used by default.*

{{< video src="assets/surround-next-two-words.mp4" >}}

- When surrounding with brackets, use:
  - **Opening** brackets (`{`, `[`, `(`) to loosely wrap (leave a space)
  - **Closing** brackets (`}`, `]`, `)`) to tightly wrap

```txt
[ "This is loosely wrapped" ]
["This is tightly wrapped"]
```

### [vim-commentary](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#vim-commentary) (Enabled)

Comment text with `gc`:

{{< video src="assets/gcip.mp4" >}}

### [CamelCaseMotion](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#camelcasemotion) (Disabled)

Edit PascalCase, camelCase, and snake_case symbols:

{{< video src="assets/ci_w.mp4" >}}

### [ReplaceWithRegister](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#replacewithregister) (Disabled)

Overwrite text without losing clipboard content using `gr`  
> *(Based on the [vim-substitute](https://github.com/inkarkat/vim-ReplaceWithRegister) plugin)*

{{< video src="assets/replace-with-register.mp4" >}}

### [vim-textobj-entire](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#vim-textobj-entire) (Enabled)

Quickly perform edits/actions against the entire file.

I love using `yae` (from `vim-textobj-entire`) to copy my whole file to my [system clipboard](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#vscodevim-settings), but don't like how it snaps my cursor to the start of the file. My hack is to mark (and return to) my current location:

```jsonc
{
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["y", "a", "e"],
      "after": ["m", "z", "y", "a", "e", "`", "z"]
    }
  ]
}
```

-----

## VSCodeVim Settings

Here are my recommended VSCodeVim settings, not including bindings.

- Enables all the above Vim plugins
- Sets `space` to leader
- "Highlight on yank"
- Clearer searching

```jsonc
{
  "vim.easymotion": true,
  "vim.hlsearch": true,
  "vim.incsearch": true,
  "vim.leader": "<space>",
  "vim.useSystemClipboard": true,
  "vim.camelCaseMotion.enabled": true,
  "vim.highlightedyank.duration": 75,
  "vim.highlightedyank.enable": true,
  "vim.sneak": true,
  "vim.sneakUseIgnorecaseAndSmartcase": true,
  "vim.replaceWithRegister": true
}
```

-----

## Key Bindings

### Splits Management

```jsonc
{
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["leader", "v"],
      "commands": [":vsplit"]
    },
    {
      "before": ["leader", "s"],
      "commands": [":split"]
    },
    {
      "before": ["leader", "h"],
      "commands": ["workbench.action.focusLeftGroup"]
    },
    {
      "before": ["leader", "k"],
      "commands": ["workbench.action.focusAboveGroup"]
    },
    {
      "before": ["leader", "j"],
      "commands": ["workbench.action.focusBelowGroup"]
    },
    {
      "before": ["leader", "l"],
      "commands": ["workbench.action.focusRightGroup"]
    }
  ]
}
```

### Indentation

The following allows you to visually select lines and spam `<`/`>` to align them.

```jsonc
{
  "vim.visualModeKeyBindings": [
    {
      "before": [">"],
      "commands": ["editor.action.indentLines"]
    },
    {
      "before": ["<"],
      "commands": ["editor.action.outdentLines"]
    }
  ]
}
```

### Go-to next problem

> Requires [Go to Next Problem](https://marketplace.visualstudio.com/items/?itemName=JimmyZJX.go-to-next-problem)

Go to the next warning or error.

*The odd "toggle vim > action > toggle vim > vim_escape" is a workaround for a VSCode behavior.*

```jsonc
{
  "vim.normalModeKeyBindingsNonRecursive": [
    // Goto next problem
    {
      "before": ["leader", "g", "e"],
      "commands": ["toggleVim", "go-to-next-problem.nextInFiles", "toggleVim", "extension.vim_escape"],
      "silent": true,
      "args": { "severity": ["error", "warn"] },
      "when": "editorFocus"
    },
    // Goto previous problem
    {
      "before": ["leader", "g", "E"],
      "commands": ["toggleVim", "go-to-next-problem.prevInFiles", "toggleVim", "extension.vim_escape"],
      "silent": true,
      "args": { "severity": ["error", "warn"] },
      "when": "editorFocus"
    }
  ]
}
```

---

## Read More

These are my thoughts so far. For deeper customization, check the [VSCodeVim README](https://github.com/VSCodeVim/Vim?tab=readme-ov-file#%EF%B8%8F-settings).

I'll be doing additional write-ups for my whole `settings.json` and an in-depth (video?) on VSCode Text Objects.
