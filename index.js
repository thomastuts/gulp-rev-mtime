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
      suffix: 'v',
      fileTypes: ['js', 'css']
    };

    options = _.merge(defaultOptions, options);

    var elementAttributes = {
      js: {
        name: 'script',
        srcAttribute: 'src'
      },
      css: {
        name: 'link',
        srcAttribute: 'href'
      }
    };

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

      for (var i = 0; i < options.fileTypes.length; i++) {
        var fileType = options.fileTypes[i];
        var attributes = elementAttributes[fileType];

        var $assets = $(attributes.name);

        for (var j = 0; j < $assets.length; j++) {
          var $asset = $assets.eq(j);
          var src = $asset.attr(attributes.srcAttribute);

          var stats = fs.statSync(path.join(options.cwd, src));
          $asset.attr(attributes.srcAttribute,  $asset.attr(attributes.srcAttribute) + '?' + options.suffix + '=' + +stats.mtime);
        }
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
