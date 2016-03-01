/*
        Build Script
*/

var UglifyJS = require("uglify-js")
var chalk = require('chalk')
var filesize = require("filesize")
var fs = require("fs")

var _ = require('lodash')

var browserify = require('browserify')

var target = "dist/predicthq.js"

var b = browserify({standalone: 'PredictHQ', debug:false, expose: 'deps'})
b.add('./index.js')

b.transform('babelify')

console.info(chalk.green('\tBuild process started..\n'))

b.pipeline.on('file',function(file,id,parent){

        var stats = fs.statSync(file)

        var size = _.padStart(filesize(stats['size'], {round: 0}), 5)

        var color = 'gray'
        if (stats['size'] > 5000) color = 'yellow'
        if (stats['size'] > 15000) color = 'red'

        console.info('\t' + chalk[color](size) + '\t' + file)

})

b.bundle().pipe(fs.createWriteStream(target))
    .on('close',function(){

        var stats = fs.statSync(target)

        console.info(chalk.bold('\n\t Non Minified Size: ' + filesize(stats['size'])))

        var result = UglifyJS.minify(target, {
                compress: {
                        dead_code: true,  // discard unreachable code
                        drop_debugger: true,  // discard “debugger” statements
                        global_defs: {      // global definitions
                                "DEBUG": false // matters for some libraries
                        }
                }
        })

        var min_target = target.replace('.js', '.min.js')

        fs.writeFileSync(min_target,result.code)

        var stats = fs.statSync(min_target)

        console.info(chalk.bold('\n\t Minified Size: ' + filesize(stats['size'])))

    })
