---
# date: '2025-04-25'
date: '2025-04-25'
draft: false
title: 'Ruff + VSCode'
summary: 'Learn how to consolidate most of your Python extensions.'
tags: [ruff, python, vscode, formatting]
category: [tutorial]
ShowToc: true
---

Ruff Python linter and formatter written in Rust by the Astral team. Pretty much out-of-the-box, it can replaces Black, isort, and Pylint.

This guide shows how to set up Ruff for a smooth experience in VSCode, from formatting on save to keyboard shortcuts.

> Related: [Ruff & Pylance](../ruff-pylance)

## Replacing Black and isort with Ruff

Ruff replicates formatting behavior from Black and isort, including import sorting, quote consistency, and line wrapping. You can use it as your default formatter.

## Replacing all of your linting solutions with Ruff

Ruff re-implements linting rules from popular tools like Pylint, Flake8, and Pydocstyle. This allows you to consolidate nearly **all** Python linting into one tool.

## Format on save with Ruff

Add this to your VSCode `settings.json` to trigger Ruff’s formatting every time you save a Python file:

```jsonc
{
    "[python]": {
        "editor.codeActionsOnSave": {
            "source.organizeImports.ruff": "always"
        },
        "editor.defaultFormatter": "charliermarsh.ruff",
        "editor.formatOnSave": true
    }
}
```

## Optional: Disable “disable rule” code actions
If you use and abuse `Ctrl+.` to trigger code actions like me, Ruff’s “disable this rule” suggestions can add quite a bit of clutter. You can disable these code actions with the following:

```jsonc
{
    "ruff.codeAction.disableRuleComment": {
        "enable": false
    }
}
```

## VSCodeVim bindings

I personally don't like the "auto fix on save" feature as I save often, and Ruff would remove my unused-but-still-needed imports.

Instead, I set up a keybinding in VSCodeVim to run Ruff fixes manually.

``` jsonc
{
    "vim.normalModeKeyBindings": [
        // "[r]uff [f]ix"
        {
            "before": [ "r", "f" ],
            "commands": [
                "ruff.executeAutofix",
                "workbench.action.files.save"
            ]
        },
    ]
}
```
