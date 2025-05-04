---
date: '2025-05-04'
draft: false
title: 'VSNotify'
summary: 'My first VSCode extension: VSNotify'
tags: ["vscode", "typescript"]
category: []
ShowToc: true
---

Over the past week, I wrote my first VSCode extension: [VSNotify](https://marketplace.visualstudio.com/items?itemName=joshpaulie.vsnotify). It came out of "necessity", as I wanted keybindings to display text in the status bar, similar to how `echo` works in Neovim. Here's what I wanted to replicate:

```lua
vim.keymap.set('n', 'h', '<cmd>echo "Use a better motion! (b, ge, F)"<CR>')
```

It's a niche use case, but I was surprised that:

1. There's no way to invoke `vscode.window.showInformationMessage` or `vscode.window.setStatusBarMessage` directly from keybindings.
2. Nothing like this already existed.

So, here we are.

Ultimately, I was able to emulate the same behavior as the Neovim example:

```jsonc
{
  "vim.normalModeKeyBindings": [
    {
      "before": ["h"],
      "commands": [
        {
          "command": "vsnotify.status",
          "args": { "message": "Use a better motion! (b, ge, F)", "color": "red" }
        }
      ],
      "silent": true
    }
  ]
}
```

Here are my thoughts on writing my first extension.

## The Developer Experience

Microsoft and the community have done an excellent job with the extension lifecycle. This is just a high-level overview, but their [Getting Started guide](https://code.visualstudio.com/api/get-started/your-first-extension) is fantastic.

## Starting Off

It all begins with [Yeoman](https://yeoman.io), a scaffolding tool for the JS/TS ecosystem. Paired with the [generator-code](https://www.npmjs.com/package/generator-code) package, you can generate a base extension with `yo code`. After answering a few questions in the wizard, it scaffolds out your starting point.

For this project, I used **unbundled TypeScript** and **npm**.

## Writing the Extension

Actually writing the extension was pretty straightforward. VSNotify is essentially just passing user arguments into a status bar message or popup.

### Creating a Command

Each command is a function, and I created a basic interface to type the user arguments, providing autocompletion later.

Commands are defined in `package.json`, along with any relevant settings. Users can bind these commands to keyboard shortcuts, with either `keybindings.json` or VSCodeVim bindings, to create custom notifications.

> The [notify command](https://github.com/JoshPaulie/VSNotify/blob/7b2dfb8e866bb8f37e1df6557d00832516d11781/src/commands.ts#L86) is the simplest of the three and demonstrates this clearly.

## Packaging and Publishing

Packaging and publishing are handled by [vsce](https://github.com/microsoft/vscode-vsce), another CLI tool. After creating a Visual Studio Marketplace publisher and authing with `vsce`, you can just run:

```bash
vsce package && vsce publish
```

And that's it. About five minutes later, anyone in the world can install your extension.

## Additional Functionality

I also added a task runner to VSNotify. You can bind a task as usual, but with VSNotify you get a custom notification on success or failure.

```jsonc
// With VSNotify
{
  "key": "ctrl+h",
  "command": "vsnotify.runTask",
  "args": {
    "taskName": "build",
    "useStatus": true // true = status bar, false = popup
  }
}

// Traditional way
{
  "key": "ctrl+h",
  "command": "workbench.action.tasks.runTask",
  "args": "build"
}
```

---

That's all for this one. Here's a demo of it in action. I'm curious if anyone else comes up with other use cases!

![Demo](../assets/vsnotify-screenshot.png)
