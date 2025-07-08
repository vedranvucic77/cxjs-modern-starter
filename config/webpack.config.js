const path = require("path"),
  p = (p) => path.join(__dirname, "../", p || ""),
  CxScssManifestPlugin = require("./CxScssManifestPlugin"),
  manifest = require("cx/manifest"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ rootCssLoader, tailwindOptions }) => ({
  name: "app",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        include: [
          p("src"),
          /packages[\\\/]cx/,
          /node_modules[\\\/](cx|cx-.+)[\\\/]/,
        ],
        use: [
          {
            loader: "swc-loader",
            options: {
              jsc: {
                loose: true,
                target: "es2022",
                parser: {
                  syntax: "typescript",
                  decorators: true,
                  tsx: true,
                },
                experimental: {
                  plugins: [
                    [
                      require.resolve(
                        "swc-plugin-transform-cx-jsx/swc_plugin_transform_cx_jsx_bg.wasm"
                      ),
                      { trimWhitespace: true, autoImportHtmlElement: true },
                    ],
                    [
                      require.resolve(
                        "swc-plugin-transform-cx-imports/swc_plugin_transform_cx_imports_bg.wasm"
                      ),
                      { manifest, useSrc: true },
                    ],
                  ],
                },
                transform: {
                  react: {
                    pragma: "VDOM.createElement",
                  },
                },
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [rootCssLoader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [
          rootCssLoader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: ["@tailwindcss/postcss"],
                cacheInclude: [/.*\.(css|scss)$/],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  entry: {
    app: [p("src/index.tsx"), p("src/index.scss"), p("src/tailwind.css")],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new CxScssManifestPlugin({
      outputPath: p("src/manifest.scss"),
    }),
  ],

  optimization: {
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
          minSize: 0,
        },
      },
    },
    chunkIds: "deterministic",
  },

  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [
        __filename,
        p("config/webpack.dev.js"),
        p("config/webpack.prod.js"),
        p("config/tailwind.config.js"),
      ],
    },
  },
});
