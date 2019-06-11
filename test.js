import postcss from 'postcss';
import test from 'ava';

import plugin from './';

function run(t, input, output, opts = {}) {
    return postcss([plugin(opts)])
        .process(input)
        .then(result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('uses --css-variable if all targeted browsers support it', t => {
    return run(
        t,
        'html{scroll-behavior:smooth;}',
        'html{--scroll-behavior:smooth;scroll-behavior:smooth;}',
        { browsers: 'chrome 71' }
    );
});

test('doesn\'t add new --css-variable if one is already defined', t => {
    return run(
        t,
        'html{scroll-behavior:smooth;--scroll-behavior:smooth;}',
        'html{scroll-behavior:smooth;--scroll-behavior:smooth;}',
        { browsers: 'chrome 71' }
    );
});

test('adds font-family declaration', t => {
    return run(
        t,
        'a{scroll-behavior:smooth;}',
        'a{font-family:"scroll-behavior:smooth";scroll-behavior:smooth;}',
        {}
    );
});

test('keeps existing font-family declaration', t => {
    return run(
        t,
        'a{' +
            'scroll-behavior: smooth;' +
            'font-family: "Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: bold;' +
            '}',
        'a{' +
            'scroll-behavior: smooth;' +
            'font-family: ' +
            '"scroll-behavior:smooth", ' +
            '"Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: bold;' +
            '}',
        {}
    );
});

test('keeps the last existing font-family declaration', t => {
    return run(
        t,
        'a{' +
            'font-family: overridden;' +
            'scroll-behavior: auto;' +
            'font-family: "Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: bold;' +
            '}',
        'a{' +
            'font-family: overridden;' +
            'scroll-behavior: auto;' +
            'font-family: ' +
            '"scroll-behavior:auto", ' +
            '"Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: bold;' +
            '}',
        {}
    );
});

test('keeps existing font declaration', t => {
    return run(
        t,
        'a{' +
            'font-family: overridden;' +
            'scroll-behavior: smooth;' +
            'font: strong 1em/1 "Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: normal;' +
            '}',
        'a{' +
            'font-family: overridden;' +
            'scroll-behavior: smooth;' +
            'font: strong 1em/1 "Helvetica Neue", Helvetica, sans-serif;' +
            'font-family: ' +
            '"scroll-behavior:smooth", ' +
            '"Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: normal;' +
            '}',
        {}
    );
});
