const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval-source-map',
    plugins: [
        new BrowserSyncPlugin(
            {
                https: true,
                host: 'localhost',
                port: 3000,
                proxy: 'https://localhost:3100/'
            },
            {
                reload: false
            }
        )
    ],

    devServer: {
        publicPath: '/',
        contentBase: path.resolve('dist'),
        https: true,
        compress: true,
        overlay: {
            warnings: false,
            errors: true
        },
        port: 3100,
        historyApiFallback: true,
        setup: function (app) {
            var RedditApi = require('reddit-oauth');
            var reddit = new RedditApi({
                app_id: '-ps6btC6zxQWBw',
                app_secret: 'dBDopdckrUViUqD10dBhLDknE1Y',
                redirect_uri: 'https://www.google.com'
            });

            app.get('/api/auth', function (req, res) { 
                // Authenticate with username/password 
                reddit.passAuth(
                    req.headers.user,
                    req.headers.pass,
                    function (success) {
                        if (success) {
                            // Print the access token we just retrieved 
                            console.log(reddit.access_token);
                            res.json({ token: reddit.access_token });
                        }
                    }
                );
            });

            app.get('/api/getNewPosts', function (req, res) {
                reddit.get(
                    '/r/writingprompts/new?limit=5',
                    {},
                    function (error, response, body, next) {
                        console.log(error);
                        // next is not null, therefore there are more pages 
                        if (next) {
                            next(); // Invoke next to retrieve the next page 
                        }
                        res.send(body);
                    }
                );
            });
        }
    }
});
