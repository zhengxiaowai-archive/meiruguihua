$(function () {
    $('.input_email').focusout(function() {
        var inputVal = $(this).val();
        if (!validateEmail(inputVal)) {
            $('.account-warning').text('! 请输入正确的邮箱'); 
            setTimeout(function () {
                $('.account-warning').html('&nbsp;'); 
            }, 2000);
       } 
    });
});

$(function () {
    $('.input_password').focusout(function() {
        var inputVal = $(this).val();
        if (inputVal.length < 6) {
            $('.password-warning').text('! 密码格式错误，至少6位'); 
            setTimeout(function () {
                $('.password-warning').html('&nbsp;'); 
            }, 2000);
       } 
    });

});

$(function() {
    $('#register').on('click', function(){
        var email = $('.input_email').val()
        var password = $('.input_password').val()
        if (!validateEmail(email)) {
            $('.account-warning').text('! 请输入正确的邮箱'); 
            setTimeout(function () {
                $('.account-warning').html('&nbsp;'); 
            }, 2000);
            return;
        }
        if (password.length < 6) {
            $('.password-warning').text('! 密码格式错误，至少6位'); 
            setTimeout(function () {
                $('.password-warning').html('&nbsp;'); 
            }, 2000);
            return;
        
        }
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
                $('.password-warning').text('! 非法的账号密码'); 
                setTimeout(function () {
                    $('.password-warning').html('&nbsp;'); 
                }, 2000);

                $('.account-warning').text('! 非法的账号密码'); 
                setTimeout(function () {
                    $('.account-warning').html('&nbsp;'); 
                }, 2000);
            } else if (xhr.status == 400 ){
                $('.account-warning').text('! 该邮箱已被注册'); 
                setTimeout(function () {
                    $('.account-warning').html('&nbsp;'); 
                }, 2000);
            }
        });
        
    });
});

$(function() {
    $('#login').on('click', function(){
        var email = $('.input_email').val()
        var password = $('.input_password').val()
        if (!validateEmail(email)) {
            $('.account-warning').text('! 请输入正确的邮箱'); 
            setTimeout(function () {
                $('.account-warning').html('&nbsp;'); 
            }, 2000);
            return;
        }
        if (password.length < 6) {
            $('.password-warning').text('! 密码格式错误，至少6位'); 
            setTimeout(function () {
                $('.password-warning').html('&nbsp;'); 
            }, 2000);
            return;
        
        }

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
                $('.password-warning').text('! 密码错误，请重新输入'); 
                setTimeout(function () {
                    $('.password-warning').html('&nbsp;'); 
                }, 2000);
            } else if (xhr.status == 400 ){
                $('.account-warning').text('! 该邮箱暂未注册'); 
                setTimeout(function () {
                    $('.account-warning').html('&nbsp;'); 
                }, 2000);
            }
        });
    });
});


