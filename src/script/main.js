require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'lazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min',
        'pagination': './jquery.pagination',
        'cookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie'
    }
});
require(['jquery'], function($) {
    require(['lazyload', 'pagination', 'cookie'], function() {
        let mod = $('#currentpage').attr('currentmod');
        if (mod) {
            require([mod], function(data) {
                data.init();
            })
        }
    })
})