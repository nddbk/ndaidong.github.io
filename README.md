## about-me

Static site generator to build webpage in "About.me" style.


[![Build Status](https://travis-ci.org/ndaidong/ndaidong.github.io.svg?branch=dev)](https://travis-ci.org/ndaidong/ndaidong.github.io)


# Usage


#### Installation

```
git clone https://github.com/ndaidong/ndaidong.github.io.git about-me
cd about-me
npm install

```


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

No reason to care about that! Everything should fresh and come natively. In dev mode, you always get the newest content display.


#### Babel

The configs set at `package.json -> babel`;


# Tech stacks

- [RollupJS](https://rollupjs.org/)
- [PostCSS](http://postcss.org/)
- [Pug](https://pugjs.org)


# License

The MIT License (MIT)
