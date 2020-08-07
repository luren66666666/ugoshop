define([], function() {
    return {
        init: function() {
            class Register {
                constructor() {
                    this.inputtle = $('.article2 form .input1'); //手机号码
                    this.inputcode = $('.article2 form .input2'); //验证码
                    this.inputpass = $('.article2 form .input3'); //设置密码
                    this.inputpassagain = $('.article2 form .input4'); //确认密码
                    this.inputnote = $('.article2 form .input5'); //短信验证码

                    this.label = $('.article2 form .box0 label'); //提示信息
                    this.yanzm = $('.article2 form .box222 .yanzm'); //随机验证码
                    this.yanzmclicka = $('.article2 form .box222 a'); //点击更换
                    this.button = $('.article2 form .box555 button'); //点击获取短信验证码
                    this.note = $('.article2 form .box555 .note'); //短信验证码
                    this.inputbutton = $('.article2 form .input6'); //提交按钮
                    this.checkbox = $('.article2 form .box666 .xieyi input'); //用户服务承诺
                    this.checklabol = $('.article2 form .box666 label');
                    this.dui = $('.article2 form .box0 .dui');
                    this.tleflag = true;
                    this.codeflag = true;
                    this.passflag = true;
                    this.passagainflag = true;
                    this.noteflag = true;
                    this.checkflag = false; //是否同意用户协议
                }
                init() {
                    function ran() {
                        return Math.ceil(Math.random() * 9)
                    };
                    this.yanzm.html('' + ran() + ran() + ran() + ran() + ran() + ran());
                    this.yanzmclicka.on('click', () => {
                        this.yanzm.html('' + ran() + ran() + ran() + ran() + ran() + ran());
                    });
                    this.button.on('click', () => {
                        this.note.show();
                        this.note.html('' + ran() + ran() + ran() + ran() + ran() + ran());
                    });

                    this.inputtle.on('focus', () => { //手机号
                        this.label.eq(0).show();
                        this.label.eq(0).css({ //灰色
                            backgroundColor: '#f6f6f6',
                            color: '#555',
                            border: '1px solid #e9e9e9'
                        });
                        this.label.eq(0).html('请输入常用手机号，避免忘记');
                        this.dui.eq(0).hide();
                    })
                    this.inputtle.on('blur', () => {
                        if (!this.inputtle.val()) {
                            this.label.eq(0).show();
                            this.label.eq(0).css({ //红色
                                backgroundColor: '#fff3f3',
                                color: '#eb0007',
                                border: '1px solid #ffadb0'
                            });
                            this.label.eq(0).html('请输入手机号');
                            this.tleflag = false;
                        } else {
                            var reg = /^1[3456789]\d{9}$/;
                            if (reg.test(this.inputtle.val())) {
                                // this.label.eq(0).hide(); //手机号验证成功
                                $.ajax({
                                    url: 'http://localhost/ugoshop/php/enterVe.php',
                                    data: {
                                        tel: this.inputtle.val()
                                    },
                                    dataType: 'json'
                                }).done((data) => {
                                    // console.log(data);// 为2时，手机号已存在
                                    if (data === 2) {
                                        this.label.eq(0).show();
                                        this.label.eq(0).css({ //红色
                                            backgroundColor: '#fff3f3',
                                            color: '#eb0007',
                                            border: '1px solid #ffadb0'
                                        });
                                        this.label.eq(0).html('该手机号已被注册，请直接登录吧');
                                        this.tleflag = false;
                                    } else {
                                        // console.log(456);
                                        this.tleflag = true;
                                        this.dui.eq(0).show();
                                        this.label.eq(0).hide();
                                    }
                                });
                            } else {
                                this.label.eq(0).show();
                                this.label.eq(0).css({ //红色
                                    backgroundColor: '#fff3f3',
                                    color: '#eb0007',
                                    border: '1px solid #ffadb0'
                                });
                                this.label.eq(0).html('手机号格式有误，请核对后输入');
                                this.tleflag = false;
                            }
                        };
                    });

                    this.inputcode.on('focus', () => { //验证码
                        this.label.eq(1).hide();
                        this.dui.eq(1).hide();
                        // this.label.eq(1).show();
                        // this.label.eq(1).css({ //灰色
                        //     backgroundColor: '#f6f6f6',
                        //     color: '#555',
                        //     border: '1px solid #e9e9e9'
                        // });
                        // this.label.eq(1).html('请输入常用手机号，避免忘记');
                    })
                    this.inputcode.on('blur', () => {
                        if (!this.inputcode.val()) {
                            this.label.eq(1).show();
                            this.label.eq(1).css({ //红色
                                backgroundColor: '#fff3f3',
                                color: '#eb0007',
                                border: '1px solid #ffadb0'
                            });
                            this.label.eq(1).html('请输入验证码');
                            this.codeflag = false;
                        } else {
                            // console.log(this.inputcode.val());
                            // console.log(this.yanzm.html());
                            if (this.inputcode.val() === this.yanzm.html()) {
                                // console.log(12);//验证码验证成功
                                this.codeflag = true;
                                this.dui.eq(1).show();
                                this.label.eq(1).hide();
                            } else {
                                this.label.eq(1).show();
                                this.label.eq(1).css({ //红色
                                    backgroundColor: '#fff3f3',
                                    color: '#eb0007',
                                    border: '1px solid #ffadb0'
                                });
                                this.label.eq(1).html('验证码不正确，请重新输入');
                                this.inputcode.val('');
                                this.yanzm.html('' + ran() + ran() + ran() + ran() + ran() + ran());
                                this.codeflag = false;
                            }
                        };
                    });

                    this.inputpass.on('focus', () => { //密码
                        this.label.eq(2).show();
                        this.label.eq(2).css({ //灰色
                            backgroundColor: '#f6f6f6',
                            color: '#555',
                            border: '1px solid #e9e9e9'
                        });
                        this.label.eq(2).html('6-20位，字母、数字或符号的组合');
                        this.dui.eq(2).hide();
                    })
                    this.inputpass.on('blur', () => {
                        if (!this.inputpass.val()) {
                            this.label.eq(2).show();
                            this.label.eq(2).css({ //红色
                                backgroundColor: '#fff3f3',
                                color: '#eb0007',
                                border: '1px solid #ffadb0'
                            });
                            this.label.eq(2).html('请输入密码');
                            this.passflag = false;
                        } else {
                            if (this.inputpass.val().length < 6 || this.inputpass.val().length > 20) {
                                this.label.eq(2).show();
                                this.label.eq(2).css({ //红色
                                    backgroundColor: '#fff3f3',
                                    color: '#eb0007',
                                    border: '1px solid #ffadb0'
                                });
                                this.label.eq(2).html('密码长度有误，请重新输入');
                                this.passflag = false;
                            } else {
                                var str = /[\u4e00-\u9fa5]/;
                                if (str.test(this.inputpass.val())) { //存在汉字，则代表密码格式有误
                                    this.label.eq(2).show();
                                    this.label.eq(2).css({ //红色
                                        backgroundColor: '#fff3f3',
                                        color: '#eb0007',
                                        border: '1px solid #ffadb0'
                                    });
                                    this.label.eq(2).html('密码格式有误，请重新输入');
                                    this.passflag = false;
                                } else { //密码正则验证成功
                                    this.dui.eq(2).show();
                                    this.label.eq(2).hide();
                                    this.passflag = true;
                                }
                            }
                        };
                    });

                    this.inputpassagain.on('focus', () => { //再次输入密码
                        this.label.eq(3).show();
                        this.label.eq(3).css({ //灰色
                            backgroundColor: '#f6f6f6',
                            color: '#555',
                            border: '1px solid #e9e9e9'
                        });
                        this.label.eq(3).html('请再次输入密码');
                        this.dui.eq(3).hide();
                    })
                    this.inputpassagain.on('blur', () => {
                        if (!this.inputpassagain.val()) {
                            this.label.eq(3).show();
                            this.label.eq(3).css({ //红色
                                backgroundColor: '#fff3f3',
                                color: '#eb0007',
                                border: '1px solid #ffadb0'
                            });
                            this.label.eq(3).html('请再次输入密码');
                            this.passagainflag = false;
                        } else {
                            if (this.inputpassagain.val() === this.inputpass.val()) {
                                // console.log(123); //再次输入密码验证成功
                                this.passagainflag = true;
                                this.dui.eq(3).show();
                                this.label.eq(3).hide();
                            } else {
                                this.label.eq(3).show();
                                this.label.eq(3).css({ //红色
                                    backgroundColor: '#fff3f3',
                                    color: '#eb0007',
                                    border: '1px solid #ffadb0'
                                });
                                this.label.eq(3).html('两次密码输入不相同，请重新输入');
                                this.passagainflag = false;
                            }
                        };
                    });

                    this.inputnote.on('focus', () => { //短信验证码
                        this.label.eq(4).hide();
                        this.dui.eq(4).hide();
                        // this.label.eq(4).show();
                        // this.label.eq(4).css({ //灰色
                        //     backgroundColor: '#f6f6f6',
                        //     color: '#555',
                        //     border: '1px solid #e9e9e9'
                        // });
                        // this.label.eq(4).html('请输入常用手机号，避免忘记');
                    })
                    this.inputnote.on('blur', () => {
                        if (!this.inputnote.val()) {
                            this.label.eq(4).show();
                            this.label.eq(4).css({ //红色
                                backgroundColor: '#fff3f3',
                                color: '#eb0007',
                                border: '1px solid #ffadb0'
                            });
                            this.label.eq(4).html('请输入短信验证码');
                            this.noteflag = false;
                        } else {
                            if (this.inputnote.val() === this.note.html()) {
                                // console.log(456); //短信验证码验证成功
                                this.noteflag = true;
                                this.dui.eq(4).show();
                                this.label.eq(4).hide();
                            } else {
                                this.label.eq(4).show();
                                this.label.eq(4).css({ //红色
                                    backgroundColor: '#fff3f3',
                                    color: '#eb0007',
                                    border: '1px solid #ffadb0'
                                });
                                this.label.eq(4).html('短信验证码有误，请重新输入');
                                this.noteflag = false;
                            }
                        };
                    });
                    this.checkbox.on('focus', () => {
                        this.checklabol.hide();
                    })


                    this.inputbutton.on('click', () => { //点击提交按钮，提交信息
                        // console.log(123);
                        // console.log(this.checkbox.prop('checked'));
                        if (!this.checkbox.prop('checked')) { //不同意用户协议
                            // console.log(12);
                            this.checklabol.show();
                            this.checkflag = false;
                        } else {
                            this.checklabol.hide();
                            // console.log(123);
                            this.checkflag = true;
                        }

                        if (!this.inputtle.val()) {
                            this.label.eq(0).show();
                            this.label.eq(0).css({ //红色
                                backgroundColor: '#fff3f3',
                                color: '#eb0007',
                                border: '1px solid #ffadb0'
                            });
                            this.label.eq(0).html('请输入手机号');
                            this.tleflag = false;
                        };
                        if (!this.inputcode.val()) {
                            this.label.eq(1).show();
                            this.label.eq(1).css({ //红色
                                backgroundColor: '#fff3f3',
                                color: '#eb0007',
                                border: '1px solid #ffadb0'
                            });
                            this.label.eq(1).html('请输入验证码');
                            this.codeflag = false;
                        };
                        if (!this.inputpass.val()) {
                            this.label.eq(2).show();
                            this.label.eq(2).css({ //红色
                                backgroundColor: '#fff3f3',
                                color: '#eb0007',
                                border: '1px solid #ffadb0'
                            });
                            this.label.eq(2).html('请输入密码');
                            this.passflag = false;
                        };
                        if (!this.inputpassagain.val()) {
                            this.label.eq(3).show();
                            this.label.eq(3).css({ //红色
                                backgroundColor: '#fff3f3',
                                color: '#eb0007',
                                border: '1px solid #ffadb0'
                            });
                            this.label.eq(3).html('请再次输入密码');
                            this.passagainflag = false;
                        };
                        if (!this.inputnote.val()) {
                            this.label.eq(4).show();
                            this.label.eq(4).css({ //红色
                                backgroundColor: '#fff3f3',
                                color: '#eb0007',
                                border: '1px solid #ffadb0'
                            });
                            this.label.eq(4).html('请输入短信验证码');
                            this.noteflag = false;
                        };
                        if (this.tleflag && this.codeflag && this.passflag && this.passagainflag && this.noteflag && this.checkflag) {
                            // console.log(123);
                            $.ajax({
                                url: 'http://localhost/ugoshop/php/register.php',
                                data: {
                                    tel: this.inputtle.val(),
                                    password: this.inputpass.val()
                                }
                            });
                            alert('注册成功,自动登录中');
                            window.location.href = 'http://localhost/ugoshop/src/homepage.html';
                        };
                    });
                }
            }
            new Register().init();
        }
    }
})