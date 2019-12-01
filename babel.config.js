const fs = require('fs');
const path = require('path');

module.exports = api => {
  let targets;

  const isJest = api.caller(caller => caller && caller.name === 'babel-jest');
  api.cache.using(() => `${isJest}:${process.env.NODE_ENV}`);

  if (isJest) {
    targets = {node: 'current'};
  } else if (process.env.DEBUG === 'true') {
    targets = {browsers: 'last 1 Chrome version'};
  } else {
    targets = JSON.parse(
      fs
        .readFileSync(path.resolve(__dirname, 'config/browsers.json'))
        .toString(),
    );
  }

  const plugins = [
    '@babel/syntax-dynamic-import',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
  ];
  if (isJest) {
    plugins.push('babel-plugin-dynamic-import-node');
  } else {
    plugins.push([
      'babel-plugin-module-resolver',
      {
        alias: {
          'html-inspector': 'html-inspector/html-inspector.js',
        },
      },
    ]);
  }

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets,
          modules: isJest ? 'auto' : false,
          useBuiltIns: 'entry',
          corejs: 3,
        },
      ],
    ],
    plugins,
    compact: false,
    overrides: isJest
      ? [
          {
            test: './node_modules/html-inspector/html-inspector.js',
            plugins: [
              [
                'transform-globals',
                {import: {'html-inspector/window': {window: 'default'}}},
              ],
            ],
          },
        ]
      : [],
  };
};
