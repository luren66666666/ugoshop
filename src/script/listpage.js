define([], function() {
    return {
        init: function() {
            let arr1 = [];
            let arr2 = [];
            // console.log(123);
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
            class Render {
                constructor() {
                    this.boxul = $('section .article3 .boxul');
                    this.page = $('section .pagelist .page');
                    this.boxmoren = $('section .article3 .boxsort .integral .boxmoren');
                    this.boxpricetop = $('section .article3 .boxsort .integral .boxpricetop');
                    this.boxpricebottom = $('section .article3 .boxsort .integral .boxpricebottom');
                    this.boxli = null;
                    this.boxoul = null;
                    this.num = 465;
                    // this.boxli = $('section .article3 .boxul ul li');
                    // this.num = 0;
                }
                init() {
                    //渲染数据
                    $.ajax({
                        url: 'http://localhost/ugoshop/php/listdata.php',
                        dataType: 'json'
                    }).done((data) => {
                        let arr = data;
                        // console.log(arr);
                        let str = '<ul>';
                        $.each(arr, function(index, value) {
                            str += `
                            <li>
                            <a href="javascript:;">
                                <img src="${value.url}" alt="">
                                <p class="p1">${value.title}</p>
                                <p class="p2">${value.keyword}</p>
                                <div>
                                    <span class="span1">￥${value.nowprice}</span>
                                    <span class="span2">
                                        <i>￥</i>${value.originalprice}
                                    </span>
                                    <span class="span3">
                                        <i>${value.sailnumber}</i>人已购买
                                    </span>
                                </div>
                            </a>
                        </li>
                            `;
                        });
                        str += '</ul>';
                        this.boxul.html(str);
                        // console.log($('section .article3 .boxul ul li').length);
                        // console.log(this.boxli.length);
                        // this.num = 10; //ajax是异步的.
                        this.boxli = $('section .article3 .boxul ul li');
                        this.boxoul = $('section .article3 .boxul ul');
                        this.lisort();
                        //因为是异步的，所有需要通过回调函数的方式，来获取元素，或者使用事件委托.
                    });

                    this.page.pagination({
                        pageCount: 5, //页面数量
                        jump: true, //是否开启跳转到指定的页数
                        prevContent: '上一页',
                        nextContent: '下一页',
                        callback: (api) => {
                            // console.log(api.getCurrent());
                            $.ajax({
                                url: 'http://localhost/ugoshop/php/listdata.php',
                                data: {
                                    page: api.getCurrent()
                                },
                                dataType: 'json'
                            }).done((data) => {
                                let str = '<ul>';
                                $.each(data, (index, value) => {
                                    str += `
                            <li>
                            <a href="javascript:;">
                                <img src="${value.url}" alt="">
                                <p class="p1">${value.title}</p>
                                <p class="p2">${value.keyword}</p>
                                <div>
                                    <span class="span1">￥${value.nowprice}</span>
                                    <span class="span2">
                                        <i>￥</i>${value.originalprice}
                                    </span>
                                    <span class="span3">
                                        <i>${value.sailnumber}</i>人已购买
                                    </span>
                                </div>
                            </a>
                        </li>
                            `;
                                })
                                str += '</ul>';
                                // console.log(123);
                                // console.log(this);
                                // console.log(this.num);
                                this.boxul.html(str);
                                this.boxli = $('section .article3 .boxul ul li');
                                this.boxoul = $('section .article3 .boxul ul');
                                // console.log(this.boxli.eq(0).find('.span1').html().substring(1));
                                // this.lisortre();
                            });
                        }
                    });

                    // console.log(this.boxul.find('ul').length);
                }
                lisort() {
                        // console.log(boxli.length);
                        // this.num = 5;
                        // console.log(this.num);
                        // this.boxpricetop.off();
                        this.boxpricetop.on('click', () => {
                            arr1 = [];
                            arr2 = [];
                            this.boxli.each(function(index, value) {
                                arr1[index] = $(this);
                            });
                            // console.log(Number(arr2[0].find('.span1').html().substring(1)));
                            $.each(arr1, (index, value) => { //将页面里的每个商品的价格添加到数组里
                                    arr2[index] = Number(value.find('.span1').html().substring(1));
                                })
                                // console.log(arr2);
                            arr2.sort(function(a, b) { //对数组进行排序
                                return a - b;
                            });
                            let arr3 = []; //排序好的
                            console.log(arr2);
                            $.each(arr2, function(index1, value1) {
                                $.each(arr1, function(index2, value2) {
                                    if (value1 == value2.find('.span1').html().substring(1)) {
                                        arr3[index1] = value2;
                                    }
                                })
                            });
                            this.boxoul.html('');
                            $.each(arr3, (index, value) => {
                                this.boxoul.append(value);
                            })
                        })
                    }
                    // lisortre() {
                    //     this.boxpricetop.off();
                    //     this.boxpricetop.on('click', () => {
                    //         arr1 = [];
                    //         arr2 = [];
                    //         this.boxli.each(function(index, value) {
                    //             arr1[index] = $(this);
                    //         });
                    //         // console.log(Number(arr2[0].find('.span1').html().substring(1)));
                    //         $.each(arr1, (index, value) => {
                    //             arr2[index] = Number(value.find('.span1').html().substring(1));
                    //         })
                    //         console.log(arr2);
                    //     })
                    // }
            }
            new Render().init();
        }
    }
})