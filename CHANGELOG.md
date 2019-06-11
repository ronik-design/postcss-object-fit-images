# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2019-06-11

### Added

- The plugin now supports [browserslist](https://github.com/browserslist/browserslist) to polyfill only what's needed! If your project has a browserslist config and all browsers specified there support CSS Custom Property, the PostCSS transform will use a CSS variable instead of the `font-family` workaround. 💡  
Requires [smoothscroll-anchor-polyfill](https://github.com/jonaskuske/smoothscroll-anchor-polyfill) v1.3.0 or higher.

## [1.0.0] - 2018-12-07

### Added
 - Forked from [postcss-object-fit-images](https://github.com/ronik-design/postcss-object-fit-images)
 - Updated tests to check for `scroll-behavior` property
 - Updated implementation to change `scroll-behavior` instead of `object-fit` and `object-position`
 - Updated README and package.json to match this package
 - Added Node v8, v10 and latest to version tested in CI  

 ### Removed
 - Removed Node v5 and v0.12 from versions tested in CI