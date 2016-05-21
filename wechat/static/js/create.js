$(function () {
    $('.add-entry').on('click', function() {
        $('.entry:last').after('<div class="weui_cell entry"><div class="weui_cell_bd entry-lt"><input class="weui_input" type="text" placeholder="填写时间" maxlength="15"></div><div class="weui_cell_bd weui_cell_primary"><textarea class="weui_textarea entry-text" id="textarea" placeholder="填写内容" clos="30"></textarea></div></div>');
    });

});


$(function () {
    $('.clear-all').on('click', function() {
        $('.entry').remove();
        $('.entries').append('<div class="weui_cell entry"><div class="weui_cell_bd entry-lt"><input class="weui_input" type="text" placeholder="填写时间" maxlength="15"></div><div class="weui_cell_bd weui_cell_primary"><textarea class="weui_textarea entry-text" id="textarea" placeholder="填写内容" clos="30"></textarea></div></div>');
    });

});

$(function () {
    var data = {};
    var entryContents = [];
    $('.submit-btn').on('click', function() {
        $('.entry').each(function() {
            var title = $(this).find('input').val();
            var content = $(this).find('textarea').val();
            entryContents.push({title: title, content: content})
        });
        var note = $('.note').val();

        data.entries = entryContents;
        data.note = note;
        console.log(data);

        $(this).attr({"disabled":"disabled"});
        fetch.json('/api/plan/create', data,
            function() {
                window.location.href = '/wechat/plan/manage';
                $(this).removeAttr("disabled");
            },
            function() {
            
                $(this).removeAttr("disabled");
            });
    });
});
