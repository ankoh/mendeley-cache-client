exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './**/*.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:8080',

  seleniumAddress:'http://selenium__standalone-firefox:4444/wd/hub',

  framework: 'jasmine',

  plugins: [{
   chromeA11YDevTools: true,
   path: '../node_modules/protractor/plugins/accessibility/index.js'
  }],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
