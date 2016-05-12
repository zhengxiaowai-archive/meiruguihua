$(function () {
    $('.input_email').focusout(function() {
        var inputVal = $(this).val();
        if (!validateEmail(inputVal)) {
            $.weui.topTips('请输入正确的邮箱'); 
       } 
    });
});

$(function () {
    $('.input_password').focusout(function() {
        var inputVal = $(this).val();
        if (inputVal.length < 6) {
            $.weui.topTips('密码格式错误，至少6位'); 
       } 
    });

});

$(function() {
    $('#register').on('click', function(){
        var data = $('form').serialize();
        fetch.post('/api/register', data, function(data) {
            var CurrentUrl = window.location.href;
            var toUrl = getQueryParam(CurrentUrl, 'next');
            if (!toUrl) {
                window.location.href = '/wechat/plan/show';
            } else {
                window.location.href = toUrl;
            }
        },
        function(xhr) {
            if (xhr.status == 401) {
                $.weui.topTips('非法的账号密码'); 
            } else if (xhr.status == 400 ){
                $.weui.topTips('该邮箱已被注册'); 
            }
        });
        
    });
});

$(function() {
    $('#login').on('click', function(){
        var data = $('form').serialize();
        fetch.post('/api/login', data, function(data) {
            var CurrentUrl = window.location.href;
            var toUrl = getQueryParam(CurrentUrl, 'next');
            if (!toUrl) {
                window.location.href = '/wechat/plan/show';
            } else {
                window.location.href = toUrl;
            }
        },
        function(xhr) {
            if (xhr.status == 401) {
                $.weui.topTips('密码错误，请重新输入'); 
            } else if (xhr.status == 400 ){
                $.weui.topTips('该邮箱暂未注册'); 
            }
        });
    });
});


