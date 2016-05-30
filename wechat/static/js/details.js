$(function () {
    var total = $('.detail_entry').length;
    if ($('.precent').length != []) {
        var precent = new Decimal($('.precent').text());
    }
    var everyPrecent = new Decimal(100).div(total).toDecimalPlaces(0);
    $('.detail_entry :checkbox').click(function() {
        var self = $(this);
        if (self.is(':checked')) {
            precent = precent.plus(everyPrecent);
            $('.precent').text(precent);
        } else {
            precent = precent.minus(everyPrecent);
            $('.precent').text(precent);
        }

        if ($('input:checked').length == $('.detail_entry').length) {
            $('.precent').text('100');

        }
    });

});

$(function () {
    $('.details-submit').on('click', function() {
        var plan = {}
        var details = [];
        var others = [];

        //获取是否完成
        $('.detail_entry').each(function () {
            var self = $(this);
            var detail = {};
            detail.id = self.find('input').val();
            
            if (self.find("input[type='checkbox']").is(':checked')) {
                detail.isChecked  = true;
            } else {
                detail.isChecked  = false;
            }
            
            details.push(detail);
        });
        
        //获取做了其他事情
        $('.new-entry').each(function() {
            var self = $(this);
            var detail = {};
            detail.title = self.find('.new-time').val();
            detail.content = self.find('.new-content').val();
            others.push(detail);
        });

        plan.note = $('.detail-note').val();
        plan.details = details;
        plan.others = others;

        // 校验数据others 里的数据
        var validOthers = others.map(function (item) {
            if (item.title == '' || item.content == '') {
                return false;
             } else {
                return true;
             }
        });
        console.log(validOthers) 
        if (validOthers.indexOf(false) > -1) {
            $('#dialog2').show().on('click', '.weui_btn_dialog', function () {
                $('#dialog2').off('click').hide();
            })
        } else {
            fetch.json('/api/plan/modify', plan,
                    function() {
                        window.location.href = '/wechat/plan/manage';
                        $(this).removeAttr("disabled");
                    },
                    function() {
                        $(this).removeAttr("disabled");
                    });
        }
    });
});

$(function () {
    $('.weui_cell_ft').click(function() {
        console.log('click');
        $('.new-details').append("<div class='new-entry'><img src='/static/images/jiantou.svg'/><input class='new-time' type='text' placeholder='填写时间'/><input class='new-content' type='text' placeholder='填写内容'/></div>")
    });
});
