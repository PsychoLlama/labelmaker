Labelmaker
==========
Organize your data by tags

> Labelmaker is made for [gunDB](https://github.com/amark/gun/)

## What it is
If you've found yourself wanting a tagging system for gun, this is what you've been looking for. Labelmaker allows you to organize and retrieve your data by any of it's associated tags/groups.

> **Note:** you cannot tag primitives. For that, use `.key`.

## How to use it
**Node.js**

```bash
npm install labelmaker
```
to install it, then you can require it from your app:
```javascript
var labler = require('labelmaker')
```

Labelmaker works with both gun version `0.2` and `0.3`. Since it doesn't assume your version, you need to tell it explicitly by giving it the constructor you're using:

```javascript
var Gun = require('gun')
labler(Gun)
// You now have tag support!
```

**Browser**

For the browser, it's much simpler, since your version of gun is exported as a global. Just include it as a script tag, and labelmaker takes care of the rest.

```html
<script src="tag.min.js"></script>
<!-- all done! -->
```
### API
Two methods are exposed for your gun instances:

 - `.tag`
 - `.tagged`

#### gun.tag(name[, name...])
You can pass `.tag` multiple names to index a node under. When called, it will try to read out your current context, index it under each tag, and then place each tag under a master list of every tag ever used.

```javascript
gun.put({
  name: 'Bob',
  profession: 'developer'
}).tag(
  'members',
  'javascript developers',
  'gunDB developers',
  'examples'
)
```

#### gun.tagged(name[, callback])
Iterate over the list of nodes under that tag name.
```javascript
gun.tagged('members', function (member, ID) {
  view.show.user(member, ID)
})
```

### Roadmap
Here are some goals for labelmaker:

 - option to disable implicit mapping
 - ability to remove a node from a tag
 
Contributions are welcome!
