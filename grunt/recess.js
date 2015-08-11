module.exports = {
	less: {
        files: {
          'client/src/css/app.css': [
            'client/src/css/less/app.less'
          ]
        },
        options: {
          compile: true
        }
    },
    angular: {
        files: {
            'client/angular/css/app.min.css': [
                'client/bower_components/bootstrap/dist/css/bootstrap.css',
                'client/bower_components/animate.css/animate.css',
                'client/bower_components/font-awesome/css/font-awesome.css',
                'client/bower_components/simple-line-icons/css/simple-line-icons.css',
                'client/src/css/*.css'
            ]
        },
        options: {
            compress: true
        }
    }
}
