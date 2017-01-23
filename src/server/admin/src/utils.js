/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-31 15:02:36
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-31 15:03:29
*/

'use strict';

import 'jquery';
import 'iframeTransport';

export default {
	
    encodeQueryParameters: function(data) {
	   var ret = [];
	   for (var d in data)
	      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
	   return ret.join("&");
	},

	uploadFile: function(file, url, callback) {

        $.ajax({
            method: 'POST',
            url: url,
            iframe: true,
            files: file,
            dataType: 'json',
            error: (res) => {
                callback(res.responseJSON.error);
            },
            success: (res) => {
                if (_.has(res,'error'))
                    callback(res.error);
                else
                    callback();
            }
        });
    }
}