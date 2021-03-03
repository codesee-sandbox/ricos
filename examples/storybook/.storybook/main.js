const path = require('path');
module.exports = {
  addons: [
    path.resolve('./.storybook/codesee-storybook-preset.js'),
    '@storybook/addon-viewport/register',
  ],
};
