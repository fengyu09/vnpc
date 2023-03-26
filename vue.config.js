const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    publicPath: '/', // 基本路径
    outputDir: 'dist', // 输出文件目录
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    // webpack配置
    chainWebpack: (config) => {},
    configureWebpack: (config) => {

        // if (process.env.NODE_ENV === 'production') {
        //     // 为生产环境修改配置...
        //     config.mode = 'production'
        //     // 将每个依赖包打包成单独的js文件
        //     let optimization = {
        //         runtimeChunk: 'single',
        //         splitChunks: {
        //             chunks: 'all',
        //             maxInitialRequests: Infinity,
        //             minSize: 20000,
        //             cacheGroups: {
        //                 vendor: {
        //                     test: /[\\/]node_modules[\\/]/,
        //                     name (module) {
        //                         // get the name. E.g. node_modules/packageName/not/this/part.js
        //                         // or node_modules/packageName
        //                         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
        //                         // npm package names are URL-safe, but some servers don't like @ symbols
        //                         return `npm.${packageName.replace('@', '')}`
        //                     }
        //                 }
        //             }
        //         },
        //         minimizer: [new UglifyPlugin({
        //             uglifyOptions: {
        //                 compress: {
        //                     // warnings: false,
        //                     drop_console: true, // console
        //                     drop_debugger: false,
        //                     pure_funcs: ['//console.log'] // 移除console
        //                 }
        //             }
        //         })]
        //     }
        //     Object.assign(config, {
        //         optimization
        //     })
        // } else {
        //     // 为开发环境修改配置...
        //     config.mode = 'development'
        // }
        // Object.assign(config, {
        //     // 开发生产共同配置
        //     resolve: {
        //         alias: {
        //             '@': path.resolve(__dirname, './src'),
        //             '@c': path.resolve(__dirname, './src/components'),
        //             '@p': path.resolve(__dirname, './src/pages')
        //         } // 别名配置
        //     }
        // })
    },
    runtimeCompiler: true,
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    // css相关配置
    css: {
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {
            css: {}, // 这里的选项会传递给 css-loader
            postcss: {} // 这里的选项会传递给 postcss-loader
        }, // css预设器配置项
        modules: false // 启用 CSS modules for all css / pre-processor files.
    },
    parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0', // 允许外部ip访问
        port: 8023, // 端口
        https: false, // 启用https
        overlay: {
            // warnings: true,
            errors: true
        }, // 错误、警告在页面弹出
        proxy: {
           
            //
            '/api':{
                 target: 'http://154.94.8.124:8080/api',//生产1206
                // target: 'http://156.238.14.72:18305/api',//测试2021.9.29
                // target: 'http://54.255.11.229:18313/api',//英文版本测试2022.04.18
                changeOrigin: true, // 允许websockets跨域
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/nodeapi':{
                // target: 'http://154.92.15.136:8088/nodeapi',//生产 1203 ip
              target: ' http://192.168.1.29:8088/nodeapi',// 测试
               changeOrigin: true, // 允许websockets跨域
               ws: true,
               pathRewrite: {
                   '^/nodeapi': ''
               }
           },
            '/getvnLine':{
                target: 'https://www.lgiosadmin.com/getvnLine',//线上的获取app下载地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/getvnLine': ''
                }
            },
            
            '/wss':{
                // target: 'ws://52.220.233.230/wss',
                target: 'ws://54.255.11.229:18305/wss',//测试2021.9.29
                changeOrigin: true,
                ws: true,
                secure: false,
                pathRewrite: {
                    '^/wss': ''
                }
            },
        }, // 代理转发配置，用于调试环境
        historyApiFallback:{
            index:'/index.html'
        },
    },
    // 第三方插件配置
    pluginOptions: {

    }
}