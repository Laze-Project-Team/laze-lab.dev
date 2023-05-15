const path = require('path');
module.exports = {
  typescript: {
    reactDocgen: 'react-docgen',
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-toolbars',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
      '/': path.resolve(__dirname, '../'),
    };

    // use emotion fragment
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        cacheDirectory: true,
        presets: [
          [
            'next/babel',
            {
              'preset-react': {
                runtime: 'automatic',
                importSource: '@emotion/react',
              },
            },
          ],
        ],
        plugins: ['@emotion/babel-plugin'],
      },
    });
    return config;
  },
  docs: {
    autodocs: true,
  },
};
