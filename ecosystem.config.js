module.exports = {
  apps: [
    {
      script: 'bundle/index.js',
      watch: 'bundle',
      instances: 'max',
      exec_mode: 'cluster',
      error_file: '/app/logs/error.log',
      out_file: '/app/logs/access.log',
      exp_backoff_restart_delay: 100,
      time: true,
    },
  ],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': '',
  //   },
  // },
};
