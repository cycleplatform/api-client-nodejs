import * as path from "path";

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              logInfoToStdOut: true,
              logLevel: "info",
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      common: path.resolve(__dirname, "src/common"),
      auth: path.resolve(__dirname, "src/auth"),
      notifications: path.resolve(__dirname, "src/notifications"),
      resources: path.resolve(__dirname, "src/resources"),
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
};
