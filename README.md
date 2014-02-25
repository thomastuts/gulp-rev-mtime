gulp-rev-mtime
==============

> Appends a file's modified UNIX timestamp to a file URL to cache assets

## Install

```
npm install --save-dev gulp-rev-mtime
```


## Examples

### Default

This example will take the `example.html` file and add rev tags to all files that are found in this file, with default options.

```js
var gulp = require('gulp');
var rev = require('gulp-rev-mtime');

gulp.task('rev', function () {
	gulp.src('template.html')
		.pipe(rev())
		.pipe(gulp.dest('.'));
});
```

#### Input:

```html
<link rel="stylesheet" href="main.min.css"/>

<script src="abc.js"></script>
<script src="def.js"></script>
```

#### Output:

```html
<link rel="stylesheet" href="main.min.css?v=1393322652000">

<script src="abc.js?v=1393321191000"></script>
<script src="def.js?v=1393321187000"></script>
```

### Custom options

This example will take the `example.html` file and add rev tags to all files that are found in this file with the custom options provided.

```js
var gulp = require('gulp');
var rev = require('gulp-rev-mtime');

gulp.task('rev', function () {
	gulp.src('template.html')
		.pipe(rev({
		  'cwd': 'public/assets',
		  'suffix': 'rev',
		  'fileTypes': ['css']
		}))
		.pipe(gulp.dest('.'));
});
```

#### Input:

```html
<link rel="stylesheet" href="main.min.css"/>

<script src="abc.js"></script>
<script src="def.js"></script>
```

#### Output:

```html
<link rel="stylesheet" href="main.min.css?rev=1393322652000">

<script src="abc.js"></script>
<script src="def.js"></script>
```

___

## API

### rev(options)

#### options.cwd

Type: `String`  
Default: `''`

Acts as a working directory for your assets, if your assets are not located in the root folder of the opened file.


#### options.suffix

Type: `String`  
Default: `'v'`

The name of the query parameter for versioning. Example: `<script src="def.js?v=1393321187000"></script>`


#### options.fileTypes

Type: `Array`  
Default: `['js', 'css']`

You can choose which files to add version tags to. Use this option if you only want to add version tags to specific file types.



## License

MIT © [Thomas Tuts](github.com/thomastuts)
