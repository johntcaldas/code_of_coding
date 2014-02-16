
var CodeOfCodingRouter = Backbone.Router.extend ({
    routes: {
        '' : 'home',
        'systeminfo': 'systeminfo'
    },
    home: function () {
        alert('you are viewing home page');
    },
    systeminfo: function () {
        alert('you are viewing system info');
    }
});
