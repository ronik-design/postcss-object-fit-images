# PostCSS Object Fit Images [![Build Status][ci-img]][ci]

[PostCSS] plugin that updates the standard object-fit tag to work with the object-fit-images polyfill for browsers that do not natively support object-fit..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/ronik-design/postcss-object-fit-images.svg
[ci]:      https://travis-ci.org/ronik-design/postcss-object-fit-images

For use with [object-fit-images](https://github.com/bfred-it/object-fit-images)

```css
.foo {
    object-fit: cover;
    object-position: top;
}
```

Compiles to:

```css
.foo {
    font-family: "object-fit: cover; object-position: top";
    object-fit: cover;
    object-position: top;
}
```

## Existing `font` and `font-family`

Existing `font` and `font-family` declarations are kept and [object-fit-images](https://github.com/bfred-it/object-fit-images) will still work:

```css
.foo {
    object-fit: cover;
    object-position: top;
    font-family: "Helvetica Neue";
}

/* Compiles to: */

.foo {
    object-fit: cover;
    object-position: top;
    font-family: "object-fit:cover;object-position:top", "Helvetica Neue";
}
```

```css
.foo {
    object-fit: cover;
    object-position: top;
    font: strong 1em/1.4 "Helvetica Neue";
}

/* Compiles to: */

.foo {
    object-fit: cover;
    object-position: top;
    font: strong 1em/1.4 "Helvetica Neue";
    font-family: "object-fit:cover;object-position:top", "Helvetica Neue";
}
```

## Usage

```js
postcss([ require('postcss-object-fit-images') ])
```

See [PostCSS] docs for examples for your environment.

## Contributors

* [Michael Shick](https://www.github.com/mshick)
* [Federico Brigante](https://www.github.com/bfred-it)


