/*
        Build Script

        todo: https://github.com/substack/brfs
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

// Don't show individual counts for these modules (too many dependencies)
var modules = {
        'core-js': []
}

var getSize = function(size){

        var color = 'gray'
        if (size > 5000) color = 'yellow'
        if (size > 15000) color = 'red'

        return chalk[color](_.padStart(filesize(size, {round: 0}), 5))

}

b.pipeline.on('file',function(file,id,parent){

        var stats = fs.statSync(file)

        var m = _.filter(_.keys(modules),function(k){ return file.indexOf(k) >= 0 })

        if (m.length > 0){
                modules[m[0]].push(stats['size'])
                return
        }

        console.info('\t' + getSize(stats['size']) + '\t' + file)

})

b.bundle().pipe(fs.createWriteStream(target))
    .on('close',function(){

        _.each(modules,function(v,k){
                if (v.length > 0)
                        console.info('\t' + getSize(_.sum(v)) + '\t' + _.upperCase(k) + ' (' + v.length + ' files)')
        })

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
