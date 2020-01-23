
var webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry:'./scr/app_vue/main.js',
  output: {
    path:path.resolve(__dirname, "scr/public/js"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain `.js` files
      // AND `<script>` blocks in `.vue` files
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ],




  },

  plugins: [
    new VueLoaderPlugin()
 
     // ...
   /*
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      }),
  
  new webpack.DefinePlugin({
     'process.env': {
       NODE_ENV: '"production"'
     }
   })
  
   new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })*/


  ]
}
