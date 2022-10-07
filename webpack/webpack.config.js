const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

module.exports = ({ ENV }) => {
    require('dotenv').config({
        path: path.join(__dirname, '..', `.env.${ENV}`),
    })
    const envConfig = require(`./webpack.${ENV === 'dev' ? 'dev' : 'prod'}.js`)
    return merge(commonConfig(), envConfig)
}
