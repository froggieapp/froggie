const doiuse = require('doiuse')

module.exports = {
  map: false,
  plugins: [
    require('postcss-nested'),
    require('postcss-bem-linter')({
      preset: 'suit',
      presetOptions: {
        namespace: 'fgr'
      },
      "implicitComponents": [
        "src/react/components/**/*.css",
        "src/react/styles/pages/**/*.css"
        ],
      "implicitUtilities": "src/react/styles/utilities/**/*.css"
    }),
    doiuse({
      browsers: ['last 1 electron version'],
      ignore: ['rem', 'multicolumn'],
    }),
    require('autoprefixer'),
    require('postcss-reporter')()
  ]
}