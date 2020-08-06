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
            let sidarr = []; //存放sid的数组
            let numarr = []; //存放数量的数组
            class Render {
                constructor() {
                    this.article3 = $('.article3');
                    this.span3 = $('.article4 .span3');
                    this.span5 = $('.article4 .span5');
                    this.numand = 0;
                    this.priceand = 0;
                    this.deleteone = null; //先声明全局变量，再在渲染后赋值
                    // this.box0 = null;
                    this.data = null; //渲染的全部接口数据
                    this.lefta = null;
                    // this.center = null;
                    this.righta = null;
                    // this.center = null;
                }
                init() {
                    // console.log($.cookie('sid').split(','));
                    if ($.cookie('sid')) {
                        let sidarrcookie = $.cookie('sid').split(',');
                        let numarrcookie = $.cookie('num').split(',');
                        let str = '';
                        $.ajax({
                            url: 'http://localhost/ugoshop/php/doem.php',
                            dataType: 'json'
                        }).done((data) => {
                            let arrdata = data.arr2;
                            this.data = arrdata;
                            // console.log(arrdata);
                            $.each(sidarrcookie, (index1, value1) => {
                                $.each(arrdata, (index2, value2) => {
                                    if (value2.sid === value1) {
                                        // console.log(123);
                                        // console.log(value1);
                                        str = `
                                        <div class="box0">
                                        <span class="spanleft">商家直销</span>
                                        <span class="spanright">免运费</span>
                                        <div class="box1">
                                        <input type="checkbox" class="input1">
                                        <img src="${value2.url}" alt="">
                                        <p>${value2.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value2.keyword}</p>
                                        <span class="span1">￥${value2.nowprice}</span>
                                        <div class="left"><a href="javascript:;" class="lefta">-</a></div>
                                        <div class="center">${numarrcookie[index1]}</div>
                                        <div class="right"><a href="javascript:;" class="righta">+</a></div>
                                        <span class="span2">￥${value2.nowprice*numarrcookie[index1]}</span>
                                        <a href="javascript:;" class="abottom">删除</a>
                                        </div>
                                        </div>
                                        `;
                                        this.numand += Number(numarrcookie[index1]);
                                        this.priceand += value2.nowprice * numarrcookie[index1];
                                        this.numprice();
                                    };
                                })
                                this.article3.append(str);
                            });
                            //渲染结束后，再获取渲染的元素对象
                            this.deleteone = $('.article3 .box0 .box1 .abottom');
                            this.lefta = $('.article3 .box0 .box1 .left a');
                            this.righta = $('.article3 .box0 .box1 .right a');
                            // this.box0 = $('.article3 .box0');
                            this.adelete();
                        });

                    }
                }
                numprice() { //计算总价，和总数
                    this.span3.html(this.numand);
                    this.span5.html(`￥${this.priceand}`);
                }
                adelete() { //点击删除，删除某一类商品
                    let this_data = this.data;
                    let this_span3 = this.span3;
                    let this_span5 = this.span5;
                    let amount = 0; //总数
                    let totalprice = 0; //总价
                    let index = 0;
                    // console.log(this.deleteone.length);
                    this.deleteone.on('click', function() {
                        //点击删除后,要重新获取+和-的元素对象
                        this.lefta = $('.article3 .box0 .box1 .left a');
                        this.righta = $('.article3 .box0 .box1 .right a');
                        amount = 0;
                        totalprice = 0;
                        // console.log(this_box0.length);
                        // console.log($(this).index('.abottom'));
                        index = $(this).index('.abottom');
                        // console.log(index);
                        $('.article3 .box0').eq(index).remove();
                        // console.log($(this).index('.abottom'));
                        sidarr = $.cookie('sid').split(',');
                        numarr = $.cookie('num').split(',');
                        // console.log(sidarr);
                        // console.log(numarr);
                        sidarr.splice(index, 1);
                        numarr.splice(index, 1);
                        // console.log(sidarr);
                        // console.log(numarr);
                        if (sidarr.length === 0) {
                            $.cookie('sid', sidarr, { expires: -1, path: '/' });
                            $.cookie('num', numarr, { expires: -1, path: '/' });
                            this_span3.html(null);
                            this_span5.html(null);
                        } else {
                            // console.log(123);
                            $.cookie('sid', sidarr, { expires: 7, path: '/' });
                            $.cookie('num', numarr, { expires: 7, path: '/' });
                            // console.log(sidarr);
                            // console.log(numarr);
                            // console.log(this_data);
                            $.each(sidarr, (index1, value1) => {
                                $.each(this_data, (index2, value2) => {
                                    if (Number(value1) === Number(value2.sid)) {
                                        // console.log(456);
                                        totalprice += value2.nowprice * numarr[index1];
                                        amount += Number(numarr[index1]);
                                    }
                                })
                            });
                            // console.log(amount, totalprice);
                            this_span3.html(amount);
                            this_span5.html(totalprice);
                        }
                        // console.log(this_data);
                    });
                    // console.log(this.lefta.length);
                    this.lefta.on('click', function() {
                        // console.log($(this).index('.lefta'));
                        //点击之前对应的数量
                        var str1 = $('.article3 .box0 .box1 .center').eq($(this).index('.lefta')).html();
                        str1 = Number(str1) - 1;
                        if (str1 <= 1) {
                            str1 = 1;
                        }
                        //点击之后对应的数量
                        $('.article3 .box0 .box1 .center').eq($(this).index('.lefta')).html(str1);
                        sidarr = $.cookie('sid').split(',');
                        numarr = $.cookie('num').split(',');
                        // console.log($('.article3 .box0 .box1 .span1').eq($(this).index('.lefta')).html().substring(1));
                        var price = $('.article3 .box0 .box1 .span1').eq($(this).index('.lefta')).html().substring(1);
                        //通过价格与接口数据做比较，获取对应的sid

                        $.cookie('sid', sidarr, { expires: 7, path: '/' });
                        $.cookie('num', numarr, { expires: 7, path: '/' });
                    });
                    this.righta.on('click', function() {
                        var str2 = $('.article3 .box0 .box1 .center').eq($(this).index('.righta')).html();
                        str2 = Number(str2) + 1;
                        $('.article3 .box0 .box1 .center').eq($(this).index('.righta')).html(str2);
                    });
                }
            }
            new Render().init();
        }
    }
})