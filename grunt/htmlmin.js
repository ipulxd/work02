module.exports = {
	min: {
      files: [{
          expand: true,
          cwd: 'client/src/tpl/',
          src: ['*.html', '**/*.html'],
          dest: 'client/angular/tpl/',
          ext: '.html',
          extDot: 'first'
      }]
  }
}
