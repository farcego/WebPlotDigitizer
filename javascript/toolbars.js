/*
	WebPlotDigitizer - http://arohatgi.info/WebPlotDigitizer

	Copyright 2010-2013 Ankit Rohatgi <ankitrohatgi@hotmail.com>

	This file is part of WebPlotDigitizer.

    WebPlotDigitizer is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    WebPlotDigitizer is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with WebPlotDigitizer.  If not, see <http://www.gnu.org/licenses/>.


*/

var toolbar = (function () {

    // list of all known toolbars!
    var toolbarList = ['paintToolbar','colorPickerToolbar']; 

    function show(sbid) { // Shows a specific sidebar
        clear();
        var sb = document.getElementById(sbid);
        sb.style.visibility = "visible";
    }

    function clear() { // Clears all open sidebars

          for (ii = 0; ii < toolbarList.length; ii ++) {
              var sbv = document.getElementById(toolbarList[ii]);
              sbv.style.visibility="hidden";
          }
        
    }

    return {
        show: show,
        clear: clear
    };
})();

