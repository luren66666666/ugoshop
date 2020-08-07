define([], function() {
    return {
        init: function() {
            class Verify {
                constructor() {
                    this.inputtel = $('.article2 .boxwai form .box1 .box11 input');
                    this.inputpassword = $('.article2 .boxwai form .box2 .box11 input');
                    this.inputbutton = $('.article2 .boxwai form .box4 input');
                    this.checkbox = $('.article2 .boxwai form .box3 input');
                    this.box1bottomtel = $('.article2 .boxwai form .box1 .box1bottom');
                    this.box1bottompassword = $('.article2 .boxwai form .box2 .box1bottom');
                    this.dui = $('.article2 .boxwai form .box1 .box11 .dui');
                }
                init() {
                    this.inputtel.on('blur', () => {
                        // console.log(123);
                        if (!this.inputtel.val()) {
                            this.box1bottomtel.show();
                            // console.log(456);
                        } else {
                            this.dui.show();
                        }
                    });
                    this.inputtel.on('focus', () => {
                        this.box1bottomtel.hide();
                    });
                    this.inputpassword.on('focus', () => {
                        this.box1bottompassword.hide();
                    });
                    //点击登录时，如果手机号或密码为空，则提示
                    this.inputbutton.on('click', () => {
                        if (!this.inputtel.val()) {
                            this.box1bottomtel.show();
                        };
                        if (!this.inputpassword.val()) {
                            this.box1bottompassword.show();
                        };
                        //如果手机号和密码都已填写，则传给后端，判断是否正确
                        if (this.inputtel.val() && this.inputpassword.val()) {
                            $.ajax({
                                url: 'http://localhost/ugoshop/php/verify.php',
                                data: {
                                    tel: this.inputtel.val(),
                                    password: this.inputpassword.val(),
                                },
                                dataType: 'json'
                            }).done((data) => {
                                // console.log(data); //为1则正确,为2则不正确
                                if (data === 2) {
                                    alert('用户名或密码错误');
                                } else if (data === 1) {
                                    // console.log(123);
                                    $.cookie('phone', this.inputtel.val(), { expires: 7, path: '/' });
                                    // alert(123);
                                    window.location.href = 'http://localhost/ugoshop/src/homepage.html';
                                }
                            });
                        }
                    })
                }
            }
            new Verify().init();
        }
    }
})