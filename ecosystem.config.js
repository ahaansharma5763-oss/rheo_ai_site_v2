module.exports = {
  apps: [
    {
      name: 'rheo-finance',
      script: 'node_modules/.bin/next',
      args: 'dev --port 3001',
      cwd: '/Users/ahaan/rheo-next',
      interpreter: 'none',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
}
