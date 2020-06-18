module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js'],
        alias: {
          '@asset': './src/assets',
          '@component': './src/components',
          '@constant': './src/constants',
          '@feature': './src/features',
          '@navigation': './src/navigations',
          '@style': './src/styles',
          '@service': './src/services',
          '@util': './src/utils',
        },
      },
    ],
  ],
};
