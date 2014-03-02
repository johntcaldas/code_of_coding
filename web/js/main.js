

$(document).ready(function() {

    // Prove the model works. Pick up here.
    var sys = new SystemSummary();
    sys.on('change', function() {
        console.log(sys.toJSON());
    });

    sys.fetch();

});
