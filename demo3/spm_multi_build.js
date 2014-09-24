/**
 * 批量编译spm包
 */
var shell = require('shelljs')
var path = require('path')
var pkg = require('./package.json')

var spm_modules = pkg.spm.spm_modules
var dir_dist = spm_modules + '/../dist'

var src_versions = getVersionList(spm_modules, function(name) {
	return !/^(seajs)/i.test(name) && shell.test('-d', name)
})
var dist_versions = getVersionList(dir_dist)

//console.log(src_versions)

build()

function build( ) {
	var name_version
	
	if( src_versions.length ) {
		shell.echo(src_versions.length + '. ')
		
		name_version = src_versions.shift()
		
		if (dist_versions.indexOf(name_version) === -1) {
			shell.echo('building: '+ name_version)
			
			shell.cd(spm_modules + '/' + name_version)
			
			shell.exec('spm build --ignore jquery -O '+ dir_dist, function(code, output) {
				
				shell.echo(output)
				build()
			})
		} else {
			shell.echo(name_version + ' is builded\n')
			build()
		}
	} else {
		shell.echo('\nOK')
	}
}

function getVersionList(dir, cb) {
	var versions = []
	var dirs = getDirList(dir, cb)

	dirs.forEach(function(module_name) {
		var vlist = getDirList(dir + '/' + module_name)
		
		vlist.forEach(function(version) {
			versions.push(module_name + '/' + version)
		})
	})
	
	return versions
}

function getDirList(dir, cb) {
	shell.cd(dir)
	cb = cb || function(name) {return shell.test('-d', name)}
	return shell.ls(dir).filter(cb)
}
