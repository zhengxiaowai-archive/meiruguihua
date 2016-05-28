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
    });
});

$(function () {
    $('.details-submit').on('click', function() {
        var plan = {}
        var details = [];
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
        
        plan.note = $('.detail-note').val();
        plan.details = details;

        fetch.json('/api/plan/modify', plan,
            function() {
                window.location.href = '/wechat/plan/manage';
                $(this).removeAttr("disabled");
            },
            function() {
            
                $(this).removeAttr("disabled");
            });

    });
});

$(function () {
    console.log('click111')
    $('.weui_cell_ft').click(function() {
        console.log('click');
        $('.new-details').append("<div class='new-entry'><img src='/static/images/arrows-letf-up.svg'/><input class='new-time' type='text' placeholder='填写时间'/><input class='new-content' type='text' placeholder='填写内容'/></div>")
    });
});
