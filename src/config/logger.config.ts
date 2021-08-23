const prodConfig = { appenders: ['console'], level: 'all' };
const devConfig = { appenders: ['console'], level: 'trace' };

export default {
  appenders: {
    console: { type: 'console' }
  },
  categories: {
    default: process.env.NODE_ENV === 'production' ? prodConfig : devConfig
  }
};
