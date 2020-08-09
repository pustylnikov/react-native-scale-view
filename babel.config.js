module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@anvilapp/react-native-scale-view': './src',
        },
        cwd: 'babelrc',
      },
    ],
  ],
}
