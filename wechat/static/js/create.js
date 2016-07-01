$(function () {
    $('.add-entry').on('click', function() {
        var entrySize = $('.entry').length;
        if (entrySize == 0) {
            $('.entries').append('<div class="weui_cell entry"><div class="weui_cell_bd entry-lt"><input class="weui_input" type="text" placeholder="填写时间" maxlength="15"></div><div class="weui_cell_bd weui_cell_primary"><textarea class="weui_textarea entry-text" id="textarea" placeholder="填写内容" clos="30"></textarea></div><div class="btn btn-delete">删除</div></div>');
        } else {
            $('.entry:last').after('<div class="weui_cell entry"><div class="weui_cell_bd entry-lt"><input class="weui_input" type="text" placeholder="填写时间" maxlength="15"></div><div class="weui_cell_bd weui_cell_primary"><textarea class="weui_textarea entry-text" id="textarea" placeholder="填写内容" clos="30"></textarea></div><div class="btn btn-delete">删除</div></div>');
        }
        touchSlider();
        deleteEntry();
    });

});


$(function () {
    $('.clear-all').on('click', function() {
        $('.entry').remove();
        $('.entries').append('<div class="weui_cell entry"><div class="weui_cell_bd entry-lt"><input class="weui_input" type="text" placeholder="填写时间" maxlength="15"></div><div class="weui_cell_bd weui_cell_primary"><textarea class="weui_textarea entry-text" id="textarea" placeholder="填写内容" clos="30"></textarea></div><div class="btn btn-delete">删除</div></div>');
        touchSlider();
        deleteEntry();
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

        $(this).attr({"disabled":"disabled"});



        var validDatas = entryContents.map(function (item) {
            if (item.title == '' || item.content == '') {
                return false;
             } else {
                return true;
             }
        });
        if (validDatas.indexOf(false) > -1) {
            $('#dialog1').show().on('click', '.weui_btn_dialog', function () {
                $('#dialog1').off('click').hide();
            })
            $(this).removeAttr("disabled");
        } else {
            fetch.json('/api/plan/create', data,
                    function() {
                        window.location.href = '/wechat/plan/manage';
                        $(this).removeAttr("disabled");
                    },
                    function() {

                        $(this).removeAttr("disabled");
                    });
            $(this).removeAttr("disabled");
        }



    });
});

$(function () {
    touchSlider();
});

$(function() {
    deleteEntry();
});


function deleteEntry() {
    $('.btn-delete').on('click', function(e) {
       var entry = e.target.parentNode; 
        entry.remove();
    });

}

function touchSlider() {
    $('.entry').on('touchstart', function(event) {
        var self = $(this);
        var diff = 0;
        var initX = event.originalEvent.targetTouches[0].pageX;
        var position = self.css('-webkit-transform').split(',')[4]
        var moveX;

        self.on('touchmove', function(event) {
             moveX = event.originalEvent.targetTouches[0].pageX;
             /*
             diff = moveX - initX;
             console.log('======in move=====')
             console.log('diff: ' + diff);
             console.log('position: ' + position);
             console.log('==================')
             if (!position) {
                // 初始位置，不能向右滑动
                if (diff < 0) {
                    if (diff <= -80) {
                        diff = -80; 
                    }
                    self.css({"-webkit-transform":"translateX(" + diff + "px)"});
                }
                self.css({"-webkit-transform":"translateX(" + 0 + "px)"});
             } else {
                // 终点位置，不能向左滑动，向右最多到80px
                if (diff > 0) {
                    if (diff >= 80) {
                        diff = 0; 
                    } else {
                        diff = 80 - diff
                    }
                    self.css({"-webkit-transform":"translateX(-" + diff + "px)"});
                }
                self.css({"-webkit-transform":"translateX(" + 0 + "px)"});
             }
             */
        });

        self.on('touchend', function(event) {
            var endX = moveX;
            diff = endX - initX;
            console.log('======in end=====');
            console.log('diff: ' + diff);
            console.log('position: ' + position);
            console.log('==================');
            if (!position) {
                // 不能向右
                if (diff < 0) {
                    console.log('不能友谊');
                    diff = diff <= -40 ? -80 : 0;
                    self.css({"-webkit-transform":"translateX(" + diff + "px)"})
                }

            } else {
                if (diff > 0) {
                    diff = diff >= 40 ? 0 : 80;
                    self.css({"-webkit-transform":"translateX(-" + diff + "px)"})
                }
            }

        });


    });

}
