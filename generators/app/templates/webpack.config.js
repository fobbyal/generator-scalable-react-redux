/* eslint-env node */
const { resolve } = require('path')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
//const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const git = require('git-rev-sync')

const entry = env => {
  if (env.prod)
    return {
      app: './app.js',
      vendor: [
        'react',
        'react-dom',
        'moment',
        'ramda',
        'redux',
        'react-redux',
        'semantic-ui-react',
      ],
    }

  const devServerURL = env.host || 'localhost'
  /* eslint-disable no-console*/
  console.log(`hot reload host is ${devServerURL}`)
  /* eslint-enable no-console*/

  return [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${devServerURL}:3000`,
    'webpack/hot/only-dev-server',
    './app.js',
  ]
}

const plugins = env => {
  const prodPlugs = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ]

  const commonPlugs = [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer],
      },
    }),
    new ProgressBarPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // compile time plugins
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }) /*
       css extract text plugin for chunking  ,
    new ExtractTextPlugin({ filename: 'css/[name].css', disable: false, allChunks: true })
    */,
  ]

  if (env.prod)
    return [
      ...prodPlugs,
      ...commonPlugs,
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"',
        GIT_HASH: JSON.stringify(git.short()),
        apiMode: '"prod"',
      }),
      ...(env.ana ? [new BundleAnalyzerPlugin()] : []),
      // webpack3 does not work with hot reload
      new webpack.optimize.ModuleConcatenationPlugin(),
    ]

  const allDevPlugins = [
    ...commonPlugs,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]

  return env.localApi
    ? [
        ...allDevPlugins,
        new webpack.DefinePlugin({
          apiMode: '"local"',
          GIT_HASH: '"local-run"',
        }),
      ]
    : [
        ...allDevPlugins,
        new webpack.DefinePlugin({
          apiMode: '"mock"',
          GIT_HASH: '"local-run"',
        }),
      ]
}

const output = env => {
  const filename = env.prod ? 'bundle.[name].[chunkhash].js' : 'bundle.js'
  const publicPath = env.prod ? '/ui/' : '/'
  const devtoolModuleFilenameTemplate = env.prod
    ? undefined
    : '/[absolute-resource-path]'

  return {
    filename,
    path: resolve(__dirname, 'dist'),
    pathinfo: !env.prod,
    publicPath,
    devtoolModuleFilenameTemplate,
  }
}

const perf = env =>
  env.prod
    ? {
        maxAssetSize: 500000,
        maxEntrypointSize: 300000,
        hints: 'warning',
      }
    : {
        maxAssetSize: 10000000,
        maxEntrypointSize: 10000000,
        hints: 'warning',
      }

module.exports = env => ({
  entry: entry(env),
  output: output(env),
  context: resolve(__dirname, 'src'),
  devtool: env.prod ? 'source-map' : 'eval',
  bail: env.prod,
  performance: perf(env),
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.js$/, loader: 'babel-loader', include: /immutable-ext/ },
      {
        test: /\.css$/,
        loader:
          'style-loader!css-loader?modules&importLoaders=1!postcss-loader',
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      /*
         loader:[ 
              'style-loader',
              { loader: 'css-loader', query: { modules: true, sourceMaps: true } },
              'postcss-loader'
              ]
      */
      /*
       * todo might wnat to use the following plugin for prorduction but not for the moment
      { test: /\.css$/, 
         loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: [
                  { loader: 'css-loader', query: { modules: true, sourceMaps: true } },
                  //'postcss-loader'
              ]
          })
      },*/
    ],
  },
  plugins: plugins(env),
})
