var path = require('path');
var through = require('through2');
var cheerio = require('cheerio');
var gutil = require('gulp-util');
var fs = require('fs');
var _ = require('lodash');

module.exports = function (options) {
  return through.obj(function (file, enc, cb) {

    var defaultOptions = {
      cwd: '',
      suffix: 'v'
    };

    options = _.merge(defaultOptions, options);

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-rev-mtime', 'Streaming is not supported'));
      return cb();
    }

    try {
      var $ = cheerio.load(file.contents.toString());
      var $scripts = $('script');

      for (var i = 0; i < $scripts.length; i++) {
        var $script = $scripts.eq(i);
        var src = $script.attr('src');

        var stats = fs.statSync(path.join(options.cwd, src));
        $script.attr('src',  $script.attr('src') + '?' + options.suffix + '=' + +stats.mtime);
      }

      file.contents = new Buffer($.html());
    }
    catch (err) {
      this.emit('error', new gutil.PluginError('gulp-rev-mtime', err));
    }

    this.push(file);
    return cb();
  })
};
