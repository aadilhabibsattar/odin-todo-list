const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   entry: "./src/index.js",
   output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
         },
         {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            use: [
               {
                  loader: "file-loader",
                  options: {
                     name: "[name].[hash].[ext]",
                     outputPath: "images/",
                  },
               },
            ],
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/template.html",
      }),
   ],
};
