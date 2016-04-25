# PostCSS Object Fit Images [![Build Status][ci-img]][ci]

[PostCSS] plugin that updates the standard object-fit tag to work with the object-fit-images polyfill for browsers that do not natively support object-fit..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mshick/postcss-object-fit-images.svg
[ci]:      https://travis-ci.org/mshick/postcss-object-fit-images

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-object-fit-images') ])
```

See [PostCSS] docs for examples for your environment.
