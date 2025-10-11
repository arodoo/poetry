// babel.config.js
// Babel configuration for Expo React Native mobile app.
// Configures presets and plugins for Metro bundler transpilation.
// Copyright 2025 - All rights reserved.

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          reanimated: false,
        },
      ],
    ],
  };
};
