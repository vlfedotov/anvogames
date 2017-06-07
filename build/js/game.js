
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'hump', true, true);
Module['FS_createPath']('/hump', 'spec', true, true);
Module['FS_createPath']('/hump', 'docs', true, true);
Module['FS_createPath']('/hump/docs', '_static', true, true);
Module['FS_createPath']('/', 'sounds', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      },
    };

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_game.data');

    };
    Module['addRunDependency']('datafile_game.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 7942, "filename": "/main.lua"}, {"audio": 0, "start": 7942, "crunched": 0, "end": 8150, "filename": "/utils.lua"}, {"audio": 0, "start": 8150, "crunched": 0, "end": 15410, "filename": "/asteroids.lua"}, {"audio": 0, "start": 15410, "crunched": 0, "end": 17154, "filename": "/bullets.lua"}, {"audio": 0, "start": 17154, "crunched": 0, "end": 23771, "filename": "/ship.lua"}, {"audio": 0, "start": 23771, "crunched": 0, "end": 40155, "filename": "/.bonuses.lua.swp"}, {"audio": 0, "start": 40155, "crunched": 0, "end": 41498, "filename": "/stars.lua"}, {"audio": 0, "start": 41498, "crunched": 0, "end": 44880, "filename": "/collisions.lua"}, {"audio": 0, "start": 44880, "crunched": 0, "end": 49399, "filename": "/bonuses.lua"}, {"audio": 0, "start": 49399, "crunched": 0, "end": 49528, "filename": "/conf.lua"}, {"audio": 0, "start": 49528, "crunched": 0, "end": 49570, "filename": "/hump/.git"}, {"audio": 0, "start": 49570, "crunched": 0, "end": 53103, "filename": "/hump/gamestate.lua"}, {"audio": 0, "start": 53103, "crunched": 0, "end": 55765, "filename": "/hump/signal.lua"}, {"audio": 0, "start": 55765, "crunched": 0, "end": 61284, "filename": "/hump/vector.lua"}, {"audio": 0, "start": 61284, "crunched": 0, "end": 64350, "filename": "/hump/class.lua"}, {"audio": 0, "start": 64350, "crunched": 0, "end": 66569, "filename": "/hump/README.md"}, {"audio": 0, "start": 66569, "crunched": 0, "end": 73102, "filename": "/hump/timer.lua"}, {"audio": 0, "start": 73102, "crunched": 0, "end": 79169, "filename": "/hump/camera.lua"}, {"audio": 0, "start": 79169, "crunched": 0, "end": 82927, "filename": "/hump/vector-light.lua"}, {"audio": 0, "start": 82927, "crunched": 0, "end": 84556, "filename": "/hump/spec/timer_spec.lua"}, {"audio": 0, "start": 84556, "crunched": 0, "end": 97376, "filename": "/hump/docs/timer.rst"}, {"audio": 0, "start": 97376, "crunched": 0, "end": 98681, "filename": "/hump/docs/license.rst"}, {"audio": 0, "start": 98681, "crunched": 0, "end": 109487, "filename": "/hump/docs/vector.rst"}, {"audio": 0, "start": 109487, "crunched": 0, "end": 118610, "filename": "/hump/docs/gamestate.rst"}, {"audio": 0, "start": 118610, "crunched": 0, "end": 133086, "filename": "/hump/docs/camera.rst"}, {"audio": 0, "start": 133086, "crunched": 0, "end": 140487, "filename": "/hump/docs/Makefile"}, {"audio": 0, "start": 140487, "crunched": 0, "end": 141789, "filename": "/hump/docs/index.rst"}, {"audio": 0, "start": 141789, "crunched": 0, "end": 146245, "filename": "/hump/docs/signal.rst"}, {"audio": 0, "start": 146245, "crunched": 0, "end": 155581, "filename": "/hump/docs/conf.py"}, {"audio": 0, "start": 155581, "crunched": 0, "end": 164668, "filename": "/hump/docs/class.rst"}, {"audio": 0, "start": 164668, "crunched": 0, "end": 175014, "filename": "/hump/docs/vector-light.rst"}, {"audio": 0, "start": 175014, "crunched": 0, "end": 188120, "filename": "/hump/docs/_static/vector-mirrorOn.png"}, {"audio": 0, "start": 188120, "crunched": 0, "end": 201888, "filename": "/hump/docs/_static/vector-perpendicular.png"}, {"audio": 0, "start": 201888, "crunched": 0, "end": 257364, "filename": "/hump/docs/_static/inv-interpolators.png"}, {"audio": 0, "start": 257364, "crunched": 0, "end": 360200, "filename": "/hump/docs/_static/in-out-interpolators.png"}, {"audio": 0, "start": 360200, "crunched": 0, "end": 367174, "filename": "/hump/docs/_static/graph-tweens.js"}, {"audio": 0, "start": 367174, "crunched": 0, "end": 379856, "filename": "/hump/docs/_static/vector-rotated.png"}, {"audio": 0, "start": 379856, "crunched": 0, "end": 393281, "filename": "/hump/docs/_static/vector-cross.png"}, {"audio": 0, "start": 393281, "crunched": 0, "end": 423188, "filename": "/hump/docs/_static/vector-projectOn.png"}, {"audio": 0, "start": 423188, "crunched": 0, "end": 519952, "filename": "/hump/docs/_static/interpolators.png"}, {"audio": 1, "start": 519952, "crunched": 0, "end": 563550, "filename": "/sounds/sfx_wpn_laser6.wav"}, {"audio": 1, "start": 563550, "crunched": 0, "end": 598340, "filename": "/sounds/sfx_sounds_powerup8.wav"}], "remote_package_size": 598340, "package_uuid": "6e9e1028-bc18-4341-bd12-fb32fa8f1e22"});

})();
