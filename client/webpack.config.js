const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
// SOVLED
module.exports = () => {
    return {
        mode: "development",
        entry: {
            main: "./src/js/index.js",
            install: "./src/js/install.js",
        },
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
        plugins: [
            // HTML loader to create index
            new HtmlWebpackPlugin({
                template: "./index.html",
                title: "JATE - Just Another Text Editor",
            }),
            // adding Service Workers from src-sw.js
            new InjectManifest({
                swSrc: "./src-sw.js",
                swDest: "src-sw.js",
            }),
            // adding manifest
            new WebpackPwaManifest({
                fingerprints: false,
                inject: true,
                name: "Just Another Text Editor",
                short_name: "JATE",
                description:
                    "Text Editor with offline capabilities using IndexedDB and Service Worker",
                background_color: "#225ca3",
                theme_color: "#225ca3",
                start_url: "/",
                publicPath: "/",
                icons: [
                    {
                        src: path.resolve("src/images/logo.png"),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join("assets", "icons"),
                    },
                    {
                        src: path.resolve("favicon.ico"),
                        destination: path.join("assets"),
                        size: 48,
                    },
                ],
            }),
        ],

        module: {
            rules: [
                // add style loader
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                // add babel
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: [
                                "@babel/plugin-proposal-object-rest-spread",
                                "@babel/transform-runtime",
                            ],
                        },
                    },
                },
            ],
        },
    };
};
