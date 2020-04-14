module.exports = {
  // Presets são app desenvolvidos por terceiros que podemos utilizar em nosso app
  // Essas dependencias tem de estar instaladas 
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};