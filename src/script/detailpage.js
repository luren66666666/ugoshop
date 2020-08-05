define([], function() {
    return {
        init: function() {
            class First {
                constructor() {
                    this.a = $('.ul1 .navcat a');
                    this.box2 = $('.article2 .box1 .ul1 .box2');
                    this.input1 = $('.article1 .box1 form .input1');
                }
                init() {
                    this.a.hover(() => {
                        this.box2.show();
                    }, () => {
                        this.box2.hide();
                    });
                    this.box2.on('mousemove', function() {
                        $(this).show();
                    });
                    this.box2.on('mouseout', function() {
                        $(this).hide();
                    });
                    this.input1.on('focus', () => {
                        // console.log(123);
                        this.input1.attr('placeholder', '')
                    });
                    this.input1.on('blur', () => {
                        if (this.input1.val() === '') {
                            // console.log();
                            this.input1.attr('placeholder', '请输入商品名称或货号');
                        }
                    });
                }
            }
            new First().init();
        }
    }
})