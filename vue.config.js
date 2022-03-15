/* eslint-disable prettier/prettier */
const path = require("path");
module.exports = {
    //配置方式二：和webpack属性完全一致，最后会进行合并
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                view: "@/view",
                router: "@/router",
                components: "@/components",
                assets: "@/assets"
            }
        }
    },
    devServer: {
        proxy: {
            '^/api': {
                target: "http://152.136.185.210:5000",
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        }
    },
    publicPath: "./", // 注意 这里使用 /  如果不行的话  就 ./
    //1.配置方式一：cli提供的属性
    outputDir: "dist", // 包名
    assetsDir: "static"
};