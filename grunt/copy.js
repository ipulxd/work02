module.exports = {
    angular: {
        files: [
            {expand: true, src: "**", cwd: 'client/bower_components/bootstrap/fonts',         dest: "client/angular/fonts"},
            {expand: true, src: "**", cwd: 'client/bower_components/font-awesome/fonts',      dest: "client/angular/fonts"},
            {expand: true, src: "**", cwd: 'client/bower_components/simple-line-icons/fonts', dest: "client/angular/fonts"},
            {expand: true, src: "**", cwd: 'client/src/fonts',   dest: "client/angular/fonts"},
            {expand: true, src: "**", cwd: 'client/src/api',     dest: "client/angular/api"},
            {expand: true, src: "**", cwd: 'client/src/l10n',    dest: "client/angular/l10n"},
            {expand: true, src: "**", cwd: 'client/src/img',     dest: "client/angular/img"},
            {expand: true, src: "**", cwd: 'client/src/js',      dest: "client/angular/js"},
            {expand: true, src: "**", cwd: 'client/src/tpl',     dest: "client/angular/tpl"},
            {src: 'client/src/index.min.html', dest : 'client/angular/index.html'}
        ]
    }
};
