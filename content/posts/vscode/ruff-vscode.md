---
date: '2025-04-25'
draft: false
title: 'Ruff + VSCode'
summary: 'Configuring Ruff for VSCode'
tags: [ruff, python, vscode]
category: [tutorial]
ShowToc: true
---

Ruff is a Python linter and formatter written in Rust by the Astral team. This guide is to illustrate which extensions it replaces in VSCode, and some changes you'll likely want to make.

> Related: [Ruff & Pylance](../ruff-pylance)

## Consolidating extensions
Pretty much out-of-the-box, Ruff replaces Black, isort, and Pylint.

- Ruff replicates formatting behavior from Black and isort, including import sorting, quote consistency, and line wrapping. You can use it as your [default formatter](#format-on-save-with-ruff).
- Ruff re-implements linting rules from popular tools like Flake8, perflint, and Pydocstyle. This allows you to consolidate nearly **all** Python linting into one tool.

---

## Configuring Ruff
> **Note**: There are [many, many ways](https://docs.astral.sh/ruff/configuration/) for you to provide your settings to Ruff. Here's how I believe is best.

One of the coolest features of Ruff is you can define your linting and formatting settings in your `pyproject.toml`. This way, everyone working on your repository can have the same warnings and such.

Additionally, you can define these same settings in your editor. By default, your editor settings take precedent over your pyproject.toml settings.

I like the idea of taking on the settings of whatever project I'm working on, but then "falling back" to *my* settings when I'm working on my own scripts. We can accomplish this with the following setting

```jsonc
{
    "ruff.configurationPreference": "filesystemFirst",
}
```

### Defining pyproject.toml settings
```toml
[tool.ruff]
line-length = 88
indent-width = 4
target-version = "py39"

[tool.ruff.lint]
select = ["E4", "E7", "E9", "F"]
ignore = []
fixable = ["ALL"]

[tool.ruff.format]
quote-style = "double"
indent-style = "space"
```

### Defining editor settings
The ruff extensions exposes a few common configs through the settings, like so
```jsonc
// settings.json
{
  "ruff.lineLength": 110,
  "ruff.lint.select": ["ALL"],
  "ruff.lint.ignore": ["E501"],
}
```

For more granular (and more pyproject-like) settings, you can
```jsonc
// settings.json
{
  "ruff.configuration": {
      "lint": {
          "unfixable": ["F401"],
          "extend-select": ["TID251"],
      },
      "format": {
          "quote-style": "single"
      }
  }
}
```

---

## Format on save with Ruff

The following `settings.json` entries trigger Ruff's formatting and import sorting every time you save a Python file:

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
If you use and abuse `Ctrl+.` to trigger code actions like me, Ruff's “disable this rule” suggestions can add quite a bit of clutter. You can disable these code actions with the following:

```jsonc
{
    "ruff.codeAction.disableRuleComment": {
        "enable": false
    }
}
```

## Binding auto fix to shortcuts

I personally don't like the "auto fix on save" feature as I save often, and Ruff would remove my unused-but-still-needed imports.

Instead, I set up a keybinding in VSCodeVim to run Ruff fixes manually.

VSCodeVim:
``` jsonc
{
    // settings.json
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

Regular VSCode keybindings:
```jsonc
{
    // keybindings.json
    {
    "key": "ctrl+shift+f",
    "command": "ruff.executeAutofix"
    }
}
```
