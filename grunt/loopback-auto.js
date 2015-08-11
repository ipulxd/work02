module.exports = {
  'loopback_auto': {
    'db_autoupdate': {
      options: {
        dataSource: 'db',
        app: './server/server',
        config: './server/model-config',
        method: 'autoupdate'
      }
    },
    'db_automigrate': {
      options: {
        dataSource: 'db',
        app: './server/server',
        config: './server/model-config',
        method: 'automigrate'
      }
    }
  }
};
