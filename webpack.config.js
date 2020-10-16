const path = require("path");
// const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  // 모듈을 발견할때마다 다음과 같은 룰을 적용한다
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        // 특이하게 읽는 순서가 아래에서 위로 읽음
        // 순수한 css가 불러와지면, 우린 딱 그 텍스트를 추출해서 어딘가로 보낸다. 다음 3가지 loader를 설치했다.
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            //   이 부분은 브라우저의 css의 호환성과 관련되게 css를 수정해준다
            //  예를 들어 css를 익스플로러에 호환되게 만들때, 브라우저에 맞게 자동으로 prefix를 정해준다
            // postcss-loader에 autofixer를 설치해서 추가함.
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      //   브라우저에 99.5 퍼센트가 제대로 작동되게 css를 조정한다.
                      browsers: "cover 99.5%",
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "styles.css",
    }),
  ],
};

module.exports = config;
