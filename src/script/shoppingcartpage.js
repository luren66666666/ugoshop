define([], function() {
    return {
        init: function() {
            class First {
                constructor() {
                    this.input1 = $('.article1 .box1 form .input1');
                }
                init() {
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