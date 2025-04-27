---
date: '2025-04-25'
draft: false
title: 'Ruff & Pylance for VSCode'
summary: 'Configure Ruff and Pylance to work together in VSCode without redundant linting warnings.'
tags: [ruff, pylance, python, vscode]
category: [tutorial]
ShowToc: true
---

This short guide shows how to configure [Ruff](https://docs.astral.sh/ruff/) and [Pylance](https://marketplace.visualstudio.com/items?itemName=ms-python.vscode-pylance) to work cleanly together in VSCode.

If you've recently added Ruff to your Python workflow, you may have noticed duplicate diagnostics in your editor. That's because Pylance, by default, performs its own linting alongside Ruff.

To avoid duplicated linting and retain all the great language features of Pylance (like type inference, autocomplete, symbol renaming, and more), disable its linting with the following:

```jsonc
{
    "python.analysis.ignore": [
        "*"
    ]
}
```

## What about MyPy?
Ruff does not perform type checking (related Astral tool is in the works), so you should keep MyPy installed if you use static typing. There are no conflicts between MyPy and Ruff.
