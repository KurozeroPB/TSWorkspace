import path from "path";
import webpack from "webpack";

const configCallback = (env: { [key: string]: string }, argv: webpack.Configuration): webpack.Configuration => {
    const mode = argv.mode || "development";
    console.log("running webpack with mode:", mode);

    const config: webpack.Configuration = {
        mode,

        entry: {
            "index": "./lib/index.js",
        },

        output: {
            filename: mode === "production" ? "[name].min.js" : "[name].js",
            path: path.resolve(__dirname, "lib"),
            libraryTarget: "umd",
            library: "TEMPLATE",
            umdNamedDefine: true,
        },

        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },

        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            }],
        },
    };

    if (mode === "development") {
        config.devtool = "inline-source-map";
    }

    return config;
};

export default configCallback;
