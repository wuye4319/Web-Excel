const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');

/**
 * 初始化本地开发配置
 */
const filepath = './env.local.json'
const envlocalDefault = {
  port: 8008,
  proxy: {
    '/apis': {
      // 目标 API 地址
      target: 'http://localhost:8067',
      changeOrigin: false,
      pathRewrite: { '^/apis': '' },
    },
  },
  host: 'localhost'
}
try {
  fs.statSync(filepath);
} catch (e) {
  console.log('初始化写入本地环境配置文件');
  fs.writeFileSync(filepath, JSON.stringify(envlocalDefault, null, 4));
}
const envLocal = require('./env.local.json');

// const util = require('./demos/build/util');
// const env = require('./demos/build/config').env;

module.exports = {
  publicPath: '/',
  pages: {
    app: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      keywords: 'index page',
      chunks: ['chunk-vendors', 'chunk-common', 'app']
    },
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#107FFF'
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: (config) => {
    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
    };
    config.plugins.push( // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'static'),
          to: '.',
          ignore: ['.*']
        }
      ]),);
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.join(__dirname, 'src'));
    config.module.rule('ts').use('ts-loader').tap(options => Object.assign(options, {
      getCustomTransformers: () => ({
        before: [ tsImportPluginFactory({
          libraryName: 'h3-antd-vue',
          libraryDirectory: 'es',
          style: true
        })]
      }),
    }));
    // .set('types/sheet', path.join(__dirname, 'src/sheet/typings/index.d.ts'));
    // .set('types/common', path.join(__dirname, 'src/common/typing/index.d.ts'));
  },
  devServer: {
    host: envLocal.host,
    port: envLocal.port,
    open: true,
    https: false,
    hotOnly: false,
    disableHostCheck: false,
    proxy: envLocal.proxy,
  }
};
