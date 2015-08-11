module.exports = {
  angular:{
    src:[
      'client/bower_components/jquery/dist/jquery.min.js',

      'client/bower_components/angular/angular.js',

      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-touch/angular-touch.js',

      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/ngstorage/ngStorage.js',
      'client/bower_components/angular-ui-utils/ui-utils.js',

      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',

      'client/bower_components/oclazyload/dist/ocLazyLoad.js',

      'client/bower_components/angular-translate/angular-translate.js',
      'client/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'client/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'client/bower_components/angular-translate-storage-local/angular-translate-storage-local.js',

      'client/src/js/*.js',
      'client/src/js/directives/*.js',
      'client/src/js/services/*.js',
      'client/src/js/filters/*.js',
      'client/src/js/controllers/bootstrap.js'
    ],
    dest:'client/angular/js/app.src.js'
  }
};
