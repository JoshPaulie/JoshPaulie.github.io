# Python CLI apps
## Definitions
Per *The Rules*, I must define terms used.

**CLI** means Command Line Interface. After installed (and added to PATH), one can invoke a CLI app like the following

```bash
<app name> <arguments>
ping "www.google.com"
git --help
```

This is a little different from how we'll invoke our app. Since our app won't be properly installed via `pip`, we'll need to preface our app with `python`

```bash
python <app_name> <arguments>
```

## App skeleton 🩻 
Let's talk project structure. Your entire app will exist in its own folder.

> If you were packaging this app, your app source would exist inside of a root folder, along with its `readme.md` and `setup.py`.   

```
📁 NameRepeaterApp/
 ⌞ 📁 name_repeater/
    ⌞ 🐍 __init__.py
    ⌞ 🐍 __main__.py
 ⌞ 🐍 setup.py
 ⌞ 📝 readme.md
```

## What's  `__main__.py`?
Before answering that, let's add `print("Main ran!")` to `__main__.py`.

Now, within your project's root directory, run `python name_repeater`  from your CLI.

If properly setup, you should see our little print() message. Pretty cool, huh?

That print function ran because when app is ran from the cli, Python is looking for `__main__.py` as it's entry point.

### Now how do we pass arguments?

Delete the previously added `print("Main ran!")` and replace it with the following

```python
import sys

user_args = sys.argv
print(user_args)
```

Now if we were to run  `python name_repeater`  *with no arguments passed* you will print out `["name_repeater"]`.

That's because regardless of arguments passed (if any) , the 0th index of the returned list will be the app name (or app path, os dependent).

### How we handle passed arguments

Let's refactor the `__main__.py` one last time.

```python
import sys

user_args = sys.argv
repeat_amount = user_args[1]
name = user_args[2]
print(f"{name}\n" * repeat_amount)
```

Now  `python name_repeater 5 "Bexli"` should print "Bexli," 5 times 😎

## Conclusion
Making a CLI in Python is easy! Just be sure to include a `__main__.py` as an entry point, and using the `sys.argv` property to interrupt user passed arguments 😁