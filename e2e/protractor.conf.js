exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './**/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://0.0.0.0:8080',

  seleniumAddress:'http://0.0.0.0:4444/wd/hub',

  framework: 'jasmine',


  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};
