/**
 * Cookie Helper
 * @type {Object}
 */
var cookieHelper = {
    /**
     * Add cookie
     * @param {string} name
     * @param {string} value
     * @param {number} days  number of valid days
     */
    set: function(name, value, days) {
        var expires;

        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toGMTString();
        } else {
            expires = '';
        }

        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + expires + '; path=/';
    },

    /**
     * Get cookie value
     * @param  {string}
     *  Cookie Name
     * @return {string}      Cookie Value
     */
    get: function(name) {
        var nameEQ = encodeURIComponent(name) + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }

        return null;
    },

    /**
     * Remove cookie
     * @param  {string} name
     * @return {void}      return none
     */
    remove: function(name) {
        this.set(name, '', -1);
    }
};

var urlHelper = {
    /**
     * Get value of query url
     * @param  {string} url
     * @param  {string} key param name
     * @return {string}     param value
     */
    getQueryValue: function(url, key) {
        return decodeURIComponent(url.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
    }
};

module.exports = {
    url: urlHelper,
    cookie: cookieHelper
};
