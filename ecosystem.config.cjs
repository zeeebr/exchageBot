module.exports = {
  apps: [
    {
      name: 'exchange_bot',
      script: './dist/app.js',
      instances: 1,
      watch: false,
      exec_mode: 'cluster',
      autorestart: false
    }
  ]
}
