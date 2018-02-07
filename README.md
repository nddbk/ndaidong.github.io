## web-builder

Develop static website with the modern tools and generate it.


[![Build Status](https://travis-ci.org/ndaidong/web-builder.svg?branch=master)](https://travis-ci.org/ndaidong/web-builder)
[![Dependency Status](https://gemnasium.com/badges/github.com/ndaidong/web-builder.svg)](https://gemnasium.com/github.com/ndaidong/web-builder)
[![NSP Status](https://nodesecurity.io/orgs/techpush/projects/23899293-7262-4bc2-81a3-1e5de98f1a69/badge)](https://nodesecurity.io/orgs/techpush/projects/23899293-7262-4bc2-81a3-1e5de98f1a69)


# Usage


#### Installation

```
git clone https://github.com/ndaidong/web-builder.git
cd web-builder
npm i

```

#### Setup more resources

Specify CSS and JavaScript file through `package.json -> vendor`, then:

```
npm run setup
```

This action will download all CSS/JS files specified in the package.json's vendor section into project folder.

Note that, if you prefer using npm packages, just use `npm install` as normal. Don't care about this.


#### Dev mode


Modify the contents under `/src` to develop your own site, then:


```
npm start
````

Access `http://localhost:7856` to view result.


- All ".pug" files under `/src/pages` will be compiled to the equivalent HTML pages.
- Static contents such as images and fonts are stored under `/src/static`.


#### Build

```
npm run build
```

New website will be processed and placed in `/dist`.


#### Template data

Template data that was stored at `/src/site.conf.json`, will be automatically passed to Pug engine.


#### ~~Hot Reload~~

No reason to care about that! Everything should fresh and come natively. In dev mode, you always get the newest contents from `/src`.


#### Babel

The configs set at `package.json -> babel`;


# Tech stacks

- [RollupJS](https://rollupjs.org/):
  - [Babel](http://babeljs.io/)
  - [ES2015](http://es6-features.org/)
- [PostCSS](http://postcss.org/):
  - [CSSNext](http://cssnext.io/)
- [Pug](https://pugjs.org)


# License

The MIT License (MIT)
