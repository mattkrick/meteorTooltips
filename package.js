Package.describe({
  name: 'mattkrick:tooltips',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'A tooltips wrapper with material design animation',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/mattkrick/meteorTooltips',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.0.3.1');
  api.use(
    ['stylus',
      'templating'
    ], 'client');
  api.addFiles(['templates.html','events.js', 'tooltips.styl'], 'client');
});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('mattkrick:tooltips');
  api.addFiles('mattkrick_tooltips-tests.js');
});
