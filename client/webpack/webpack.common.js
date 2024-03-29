
const path = require('path')
// import path from "path";

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin')
// const srcPath = path.join(__dirname, '..', 'media')

const cssLoaders =(exstra)=>{
 
 
  const loaders =  [ 
     {
      loader:MiniCssExtractPlugin.loader ,
     }, 
        'css-loader'
      ]

      if(exstra){
        loaders.push(exstra)
      }

      return loaders
}


// const rules = []

// const includePaths = [
//   srcPath
// ]

module.exports = {
  // context:path.resolve(__dirname, '/src'),
  entry:[
    'react-hot-loader/patch',  // nenca anum vor routerner@ karenan mi qani cuxov karucven
     path.resolve(__dirname, '..', './src/index.tsx')],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    // alias: {
    //   'react-dom': '@hot-loader/react-dom'
    // }
  },

  module: {
    rules: [
      {
        
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", {"runtime": "automatic"}],
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
    
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test:/\xml$/,
        use:['xml-loader']
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        // include: includePaths,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
    new CopyPlugin( {patterns:[
      {
        from: path.resolve(__dirname, '..', 'media'),  
        to: path.resolve(__dirname, '..', './build'),
      },
      {
        from: path.resolve(__dirname,'..' , 'src/favicon.ico'),  //copy a anum verevi icon
        to: path.resolve(__dirname,'..' , './build'),
      },
    ]}),
    new CleanWebpackPlugin(),  //Լռելյայնորեն, այս փլագինը կհեռացնի բոլոր ֆայլերը վեբ փաթեթի output.pathգրացուցակում, ինչպես նաև վեբ փաթեթի բոլոր չօգտագործված ակտիվները յուրաքանչյուր հաջող վերակառուցումից հետո:
    new MiniCssExtractPlugin({
      filename:"[name].[contenthash].css"
    }),
    new ForkTsCheckerWebpackPlugin({ async:false}),
    new ESLintPlugin({
      extensions: [ "js","jsx", "ts", "tsx"],
    }),
    
  ],
  stats: 'errors-only',
} 