# Downloads page

This is a temporary solution for a self contained, dynamically populated download page that works on Internet Explorer 11+ and two latest versions of "modern" browsers.

## Specification

**Self contained:**

This page will likely to be included into a legacy WordPress setup and it should not require relative path loading or linking and it should be contained in a single html file.

**Dinamically populated:**

This page should have the least need for maintenance on software releases, therefore it will fetch all its content online.

**Build:**

Minimal build should be required. The steps should be restricted to transpile for backward compatibility mode, concatenate and compress files.

## Developing and building

The development environment runs from source code on a "modern" browser.

There is an `index.html` on the root of this project and one inside the `src` folder. Use the one on the root for development and the one inside the `src` is the "distribution" version. The main difference is the way the javascript source is loaded: On dev it's loaded as a `type="module"` and on "distribution" it loads as `type="text/javascript"`.

To start a web server serving the development version of the project run:

```
npm start
```

To start a web server for the distribution version run:

```
npm run build
npm run serve-dist
```

## Caveats

Because this is intended to run on IE11, its source had to be transpiled to `ES3` and a polyfill for webcomponents and `fetch` had to be in place.

It does support `Promise` but the polyfill for `async`/`await` caused the IE11 to get a stack overflow so **do not use `async`/`await`**. Most other things such as `import`, `class`, `const`/`let` and arrow functions are supported.
