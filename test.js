import postcss from 'postcss';
import test from 'ava';

import plugin from './';

function run(t, input, output, opts = {}) {

    return postcss([plugin(opts)]).process(input, { from: undefined })
        .then((result) => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}

test('adds font-family declaration', (t) => {
    return run(
        t,
        'a{object-fit:cover;}',
        'a{font-family:"object-fit:cover";object-fit:cover;}',
        { }
    );
});

test('adds object-position declaration', (t) => {
    return run(
        t,
        'a{object-fit: cover;object-position: top;}',
        'a{font-family: "object-fit:cover;object-position:top";' +
        'object-fit: cover;' +
        'object-position: top;}',
        { }
    );
});

test('keeps existing font-family declaration', (t) => {
    return run(
        t,
        'a{' +
            'object-fit: cover;' +
            'object-position: top;' +
            'font-family: "Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: bold;' +
        '}',
        'a{' +
            'object-fit: cover;' +
            'object-position: top;' +
            'font-family: ' +
                '"object-fit:cover;object-position:top", ' +
                '"Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: bold;' +
        '}',
        { }
    );
});

test('keeps the last existing font-family declaration', (t) => {
    return run(
        t,
        'a{' +
            'font-family: overridden;' +
            'object-fit: cover;' +
            'object-position: top;' +
            'font-family: "Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: bold;' +
        '}',
        'a{' +
            'font-family: overridden;' +
            'object-fit: cover;' +
            'object-position: top;' +
            'font-family: ' +
                '"object-fit:cover;object-position:top", ' +
                '"Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: bold;' +
        '}',
        { }
    );
});

test('keeps existing font declaration', (t) => {
    return run(
        t,
        'a{' +
            'font-family: overridden;' +
            'object-fit: cover;' +
            'object-position: top;' +
            'font: strong 1em/1 "Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: normal;' +
        '}',
        'a{' +
            'font-family: overridden;' +
            'object-fit: cover;' +
            'object-position: top;' +
            'font: strong 1em/1 "Helvetica Neue", Helvetica, sans-serif;' +
            'font-family: ' +
                '"object-fit:cover;object-position:top", ' +
                '"Helvetica Neue", Helvetica, sans-serif;' +
            'font-weight: normal;' +
        '}',
        { }
    );
});
