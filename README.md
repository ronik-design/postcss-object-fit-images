<p align="center">
  <a href="https://www.npmjs.com/package/smoothscroll-anchor-polyfill"><img align="center" src="https://img.shields.io/npm/v/postcss-smoothscroll-anchor-polyfill.svg" alt="NPM version"></a>
  <a href="https://travis-ci.org/jonaskuske/postcss-smoothscroll-anchor-polyfill"><img align="center" src="https://travis-ci.org/jonaskuske/postcss-smoothscroll-anchor-polyfill.svg?branch=master" alt="Build status"></a>
  <a href="./LICENSE"><img align="center" src="https://img.shields.io/npm/l/postcss-smoothscroll-anchor-polyfill.svg" alt="License"></a>
</p>  

&nbsp;  
&nbsp;  

<h1 align="center">postcss-smoothscroll-anchor-polyfill</h1>
<p align="center">⚙ <a href="https://github.com/postcss/postcss">PostCSS</a> plugin that updates the standard <code>scroll-behavior</code> property to work with <a href="https://github.com/jonaskuske/smoothscroll-anchor-polyfill">smoothscroll-anchor-polyfill</a></p>

&nbsp;  
&nbsp;  

```css
html {
    scroll-behavior: smooth;
}
```

Compiles to:

```css
html {
    font-family: "scroll-behavior:smooth";
    scroll-behavior: smooth;
}
```

## Existing `font` and `font-family`

Existing `font` and `font-family` declarations are kept and [smoothscroll-anchor-polyfill](https://github.com/jonaskuske/smoothscroll-anchor-polyfill) will still work:

> ⚠ Even though the original font declarations are kept, using `html { }` only for `scroll-behavior` and declaring your font styles on `body { }` is prefered.

```css
html {
    scroll-behavior: smooth;
    font-family: "Helvetica Neue";
}

/* Compiles to: */

html {
    scroll-behavior: smooth;
    font-family: "scroll-behavior:smooth", "Helvetica Neue";
}
```

```css
html {
    scroll-behavior: smooth;
    font: strong 1em/1.4 "Helvetica Neue";
}

/* Compiles to: */

html {
    scroll-behavior: smooth;
    font: strong 1em/1.4 "Helvetica Neue";
    font-family: "scroll-behavior:smooth", "Helvetica Neue";
}
```

## Install
```
npm install postcss-smoothscroll-anchor-polyfill --save-dev
```

## Usage

```js
postcss([ require('postcss-smoothscroll-anchor-polyfill') ])
```

See [PostCSS](https://github.com/postcss/postcss) docs for examples for your environment.

## Contributors

* [Michael Shick](https://www.github.com/mshick)
* [Federico Brigante](https://www.github.com/bfred-it)
* [Jonas Kuske](https://github.com/jonaskuske)

&nbsp;  
