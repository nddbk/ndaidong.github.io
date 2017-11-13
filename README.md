## About me

Create webpage in "About.me" style.

Built with my own static site generator.


# Usage

```
git clone https://github.com/ndaidong/ndaidong.github.io.git YOURNAME
cd YOURNAME
git checkout dev
npm i

```

#### Setup more resources

If you prefer using npm packages, just use `npm install` as normal. Don't care about this.

Specify CSS and JavaScript file through `package.json -> vendor`, then:

```
npm run setup
```


#### Dev mode


Modify the contents under `/src` to develop your own site, then:


```
npm start
````

Access `http://localhost:8080` to view result.


#### Build

```
npm run build
```

New website will be processed and placed in `/dist`.


# Tech stacks

- [RollupJS](https://rollupjs.org/):
  - [Babel](http://babeljs.io/)
  - [ES2015](http://es6-features.org/)
- [PostCSS](http://postcss.org/):
  - [CSSNext](http://cssnext.io/)
- [Pug](https://pugjs.org)


# License

The MIT License (MIT)
