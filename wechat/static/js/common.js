function getQueryParam(url, key) {
    var queryStartPos = url.indexOf('?');
    if (queryStartPos === -1) {
        return;
    }
    var params = url.substring(queryStartPos + 1).split('&');
    for (var i = 0; i < params.length; i++) {
        var pairs = params[i].split('=');
        if (decodeURIComponent(pairs.shift()) == key) {
            return decodeURIComponent(pairs.join('='));
        }
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



var fetch = {
    post: function(url, data, success, error) {
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: success,
            error: error
        });
    },
    json: function(url, data, success, error) {
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: success,
            error: error
        });
    },
    
}
