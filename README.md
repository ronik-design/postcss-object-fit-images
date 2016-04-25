# PostCSS Object Fit Images [![Build Status][ci-img]][ci]

[PostCSS] plugin that updates the standard object-fit tag to work with the object-fit-images polyfill for browsers that do not natively support object-fit..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/mshick/postcss-object-fit-images.svg
[ci]:      https://travis-ci.org/mshick/postcss-object-fit-images

For use with [object-fit-images](https://github.com/bfred-it/object-fit-images)

```css
.foo {
    object-fit: cover;
    object-position: top;
}
```

```css
.foo {
    font-family: "object-fit: cover; object-position: top";
    object-fit: cover;
    object-position: top;
}
```

## Usage

```js
postcss([ require('postcss-object-fit-images') ])
```

See [PostCSS] docs for examples for your environment.
