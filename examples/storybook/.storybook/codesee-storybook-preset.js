module.exports = {
  babel: async (config, options) => {
    if (options.configType === 'DEVELOPMENT') {
      const plugins = (config.plugins = config.plugins || []);
      plugins.push('@codesee/instrument');
    }
    return config;
  },
};
