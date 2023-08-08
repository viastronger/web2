const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    proxy: {
      '/organization-admin': {
        target: process.env.VUE_APP_BASE_URL,
      }
    }
  }
})
