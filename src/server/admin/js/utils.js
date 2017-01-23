define(['exports', 'jquery', 'iframeTransport'], function (exports) {
    /*
    * @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
    * @Date:   2016-05-31 15:02:36
    * @Last Modified by:   lutzer
    * @Last Modified time: 2016-05-31 15:03:29
    */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {

        encodeQueryParameters: function encodeQueryParameters(data) {
            var ret = [];
            for (var d in data) {
                ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
            }return ret.join("&");
        },

        uploadFile: function uploadFile(file, url, callback) {

            $.ajax({
                method: 'POST',
                url: url,
                iframe: true,
                files: file,
                dataType: 'json',
                error: function error(res) {
                    callback(res.responseJSON.error);
                },
                success: function success(res) {
                    if (_.has(res, 'error')) callback(res.error);else callback();
                }
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJlbmNvZGVRdWVyeVBhcmFtZXRlcnMiLCJkYXRhIiwicmV0IiwiZCIsInB1c2giLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwidXBsb2FkRmlsZSIsImZpbGUiLCJ1cmwiLCJjYWxsYmFjayIsIiQiLCJhamF4IiwibWV0aG9kIiwiaWZyYW1lIiwiZmlsZXMiLCJkYXRhVHlwZSIsImVycm9yIiwicmVzIiwicmVzcG9uc2VKU09OIiwic3VjY2VzcyIsIl8iLCJoYXMiXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7OztBQU9BOzs7OztzQkFLZTs7QUFFWEEsK0JBQXVCLCtCQUFTQyxJQUFULEVBQWU7QUFDdEMsZ0JBQUlDLE1BQU0sRUFBVjtBQUNBLGlCQUFLLElBQUlDLENBQVQsSUFBY0YsSUFBZDtBQUNHQyxvQkFBSUUsSUFBSixDQUFTQyxtQkFBbUJGLENBQW5CLElBQXdCLEdBQXhCLEdBQThCRSxtQkFBbUJKLEtBQUtFLENBQUwsQ0FBbkIsQ0FBdkM7QUFESCxhQUVBLE9BQU9ELElBQUlJLElBQUosQ0FBUyxHQUFULENBQVA7QUFDRixTQVBhOztBQVNkQyxvQkFBWSxvQkFBU0MsSUFBVCxFQUFlQyxHQUFmLEVBQW9CQyxRQUFwQixFQUE4Qjs7QUFFbkNDLGNBQUVDLElBQUYsQ0FBTztBQUNIQyx3QkFBUSxNQURMO0FBRUhKLHFCQUFLQSxHQUZGO0FBR0hLLHdCQUFRLElBSEw7QUFJSEMsdUJBQU9QLElBSko7QUFLSFEsMEJBQVUsTUFMUDtBQU1IQyx1QkFBTyxlQUFDQyxHQUFELEVBQVM7QUFDWlIsNkJBQVNRLElBQUlDLFlBQUosQ0FBaUJGLEtBQTFCO0FBQ0gsaUJBUkU7QUFTSEcseUJBQVMsaUJBQUNGLEdBQUQsRUFBUztBQUNkLHdCQUFJRyxFQUFFQyxHQUFGLENBQU1KLEdBQU4sRUFBVSxPQUFWLENBQUosRUFDSVIsU0FBU1EsSUFBSUQsS0FBYixFQURKLEtBR0lQO0FBQ1A7QUFkRSxhQUFQO0FBZ0JIO0FBM0JVLEsiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKiBAQXV0aG9yOiBMdXR6IFJlaXRlciwgRGVzaWduIFJlc2VhcmNoIExhYiwgVW5pdmVyc2l0w6R0IGRlciBLw7xuc3RlIEJlcmxpblxuKiBARGF0ZTogICAyMDE2LTA1LTMxIDE1OjAyOjM2XG4qIEBMYXN0IE1vZGlmaWVkIGJ5OiAgIGx1dHplclxuKiBATGFzdCBNb2RpZmllZCB0aW1lOiAyMDE2LTA1LTMxIDE1OjAzOjI5XG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnanF1ZXJ5JztcbmltcG9ydCAnaWZyYW1lVHJhbnNwb3J0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuXHRcbiAgICBlbmNvZGVRdWVyeVBhcmFtZXRlcnM6IGZ1bmN0aW9uKGRhdGEpIHtcblx0ICAgdmFyIHJldCA9IFtdO1xuXHQgICBmb3IgKHZhciBkIGluIGRhdGEpXG5cdCAgICAgIHJldC5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChkKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KGRhdGFbZF0pKTtcblx0ICAgcmV0dXJuIHJldC5qb2luKFwiJlwiKTtcblx0fSxcblxuXHR1cGxvYWRGaWxlOiBmdW5jdGlvbihmaWxlLCB1cmwsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBpZnJhbWU6IHRydWUsXG4gICAgICAgICAgICBmaWxlczogZmlsZSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBlcnJvcjogKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlcy5yZXNwb25zZUpTT04uZXJyb3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoXy5oYXMocmVzLCdlcnJvcicpKVxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXMuZXJyb3IpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==