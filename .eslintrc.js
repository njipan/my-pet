module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          '@asset': './src/assets/*',
          '@component': './src/components/*',
          '@constant': './src/constants/*',
          '@feature': './src/features/*',
          '@navigation': './src/navigations/*',
          '@style': './src/styles/*',
          '@service': './src/services/*',
          '@shared': './src/shared/*',
          '@util': './src/utils/*',
        },
      },
    },
  },
};
