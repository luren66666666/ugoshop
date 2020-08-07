define([], function() {
    return {
        init: function() {
            class First {
                constructor() {
                    this.a = $('.ul1 .navcat a');
                    this.box2 = $('.article2 .box1 .ul1 .box2');
                    this.input1 = $('.article1 .box1 form .input1');
                    this.li = $('nav .nav0 .top-nav-tool .yg-card');
                    this.quit = $('.nav0 .quit');
                    this.tuichu = $('.nav0 .quit .quit_a');
                    this.quit_span = $('.nav0 .quit .quit_span');
                }
                init() {
                    if ($.cookie('phone')) { //判断用户是否登录，
                        $('.xian a').show();
                        $('.article3 .boxglass .boxright .box4top .box4_num button').show();
                    } else {
                        $('.xian a').hide();
                        $('.article3 .boxglass .boxright .box4top .box4_num button').hide();
                    };
                    this.tuichu.on('click', () => {
                        // console.log(123);
                        $.cookie('phone', 'delete', { expires: -1, path: '/' });
                        window.location.href = 'http://10.31.163.32/ugoshop/src/homepage.html';
                    });
                    if ($.cookie('phone')) { //判断用户是否登录，
                        this.quit_span.html($.cookie('phone') + '!欢迎您');
                        this.li.eq(0).hide();
                        this.li.eq(1).hide();
                        this.quit.show();
                        // console.log($.cookie('phone'));
                    } else {
                        this.li.eq(0).show();
                        this.li.eq(1).show();
                        this.quit.hide();
                    };
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
                    this.spic = $('.article3 .boxglass .boxleft .spicwai .spic'); //小图
                    this.sf = $('.article3 .boxglass .boxleft .spicwai .sf'); //小放
                    this.bpic = $('.article3 .boxglass .boxleft .bf .bpic'); //大图
                    this.bf = $('.article3 .boxglass .boxleft .bf'); //大放
                    this.box1a = $('.article3 .boxglass .boxright .box1 a');
                    this.box1h1 = $('.article3 .boxglass .boxright h1');
                    this.box1box3 = $('.article3 .boxglass .boxright .box3');
                    this.span3 = $('.article3 .boxglass .boxright .box4top .box4top1 .span3');
                    this.box4_input = $('.article3 .boxglass .boxright .box4top .box4_num .box4_input'); //购买数量
                    // this.xiana = $('.xian a'); //进入购物车按钮
                    this.button = $('.article3 .boxglass .boxright .box4top .box4_num button'); //添加购物车按钮
                    this.ulpic = $('.article3 .boxglass .boxleft .boxbottom .boxitem ul'); //下面的小图
                    this.lipic = null; //下面的ul里面的渲染出来的li
                    this.left = $('.article3 .boxglass .boxleft .boxbottom .aleft');
                    this.right = $('.article3 .boxglass .boxleft .boxbottom .aright');
                }
                init() { //渲染详情页
                    // console.log(123);
                    let sid = window.location.search.substring(5);
                    let database = null;
                    // console.log(sid);
                    $.ajax({
                        url: 'http://10.31.163.32/ugoshop/php/doem.php',
                        dataType: 'json'
                    }).done((data) => {
                        // console.log(data.arr2);
                        let arr = data.arr2;
                        $.each(arr, (index, value) => {
                            if (sid === value.sid) {
                                // console.log(value);
                                this.spic.find('img').prop('src', value.url);
                                this.box1a.html(value.brank);
                                this.box1h1.html(value.title);
                                this.box1box3.html(value.keyword);
                                this.span3.html(value.nowprice);
                                let str = '';
                                // console.log(value.piclisturl.split(','));
                                let arrpic = value.piclisturl.split(','); //ul里面小图的路径，保存在数组里
                                $.each(arrpic, (index, value) => {
                                    str += `
                                        <li>
                                        <img src="${value}" alt="">
                                        </li>
                                    `;
                                });
                                this.ulpic.html(str);
                                this.glass();
                                this.lipic = $('.article3 .boxglass .boxleft .boxbottom .boxitem ul li');
                                this.thumbnail();
                                this.addcart(sid);
                            }
                        })
                    });
                }
                glass() { //放大镜
                    let urlbpic = this.spic.find('img').prop('src');
                    this.bpic.prop('src', urlbpic); //将小图的图片地址给大图
                    let ratio = this.bf.width() / this.sf.width(); //获取比例
                    this.bpic.css({ //设置大图的尺寸
                        width: this.spic.width() * ratio,
                        height: this.spic.height() * ratio
                    });
                    this.spic.on('mouseover', () => {
                        this.sf.css('display', 'block');
                        this.bf.css('display', 'block');
                    })
                    this.spic.on('mousemove', (ev) => {
                        // this.sf.css('display', 'block');
                        // this.bf.css('display', 'block');
                        // console.log(ev.offsetX);
                        var left = ev.pageX - this.spic.offset().left;
                        var top = ev.pageY - this.spic.offset().top;
                        // console.log(this.sf.width());
                        let sfleft = left - this.sf.width() / 2;
                        let sftop = top - this.sf.height() / 2;
                        // console.log(this.spic.width() - this.sf.width() / 2);
                        if (sfleft <= 0) {
                            sfleft = 0;
                        } else if (sfleft >= this.spic.width() - this.sf.width() - 1) {
                            // console.log(123);
                            sfleft = this.spic.width() - this.sf.width() - 1;
                        };
                        if (sftop <= 0) {
                            sftop = 0;
                        } else if (sftop >= this.spic.height() - this.sf.height() - 1) {
                            // console.log(123);
                            sftop = this.spic.height() - this.sf.height() - 1;
                        };
                        // console.log(sfleft);
                        // console.log(sftop);
                        this.sf.css({ //设置小放的位置
                            left: sfleft,
                            top: sftop
                        });
                        this.bpic.css({
                            left: -sfleft * ratio,
                            top: -sftop * ratio
                        });
                    });
                    this.spic.on('mouseout', () => {
                        this.sf.css('display', 'none');
                        this.bf.css('display', 'none');
                    });
                }
                thumbnail() {
                    let thumbnailspic = this.spic;
                    let thumbnailbpci = this.bpic;
                    // this.bpic.prop('src', urlbpic);
                    this.lipic.on('click', function() { //点击li里面的小图，对应的图片切换
                        // console.log($(this).find('img').prop('src'));
                        thumbnailspic.find('img').prop('src', $(this).find('img').prop('src'));
                        thumbnailbpci.prop('src', $(this).find('img').prop('src')); //再次将小图的图片地址给大图
                        // console.log(this.spic.find('img').prop('src'));//取不到
                    });
                    if (this.lipic.length <= 5) { //如果图片小于等于5张，则左右箭头都不可点击
                        this.left.css('opacity', 0.2);
                        this.right.css('opacity', 0.2);
                    } else {
                        let index = 5;
                        let indexsum = this.lipic.length;
                        let i = 0;
                        let distance = this.lipic.eq(0).outerWidth(true);
                        this.left.on('click', () => { //点击左箭头
                            // console.log(123);
                            // console.log(this.lipic.length);
                            this.right.css('opacity', 1);
                            i--;
                            if (i <= 0) {
                                i = 0;
                                this.left.css('opacity', 0.2);
                            };
                            this.ulpic.css({
                                left: -distance * i,
                            });
                        });
                        this.right.on('click', () => { //点击右箭头
                            // console.log(123);
                            // console.log(this.lipic.length);
                            this.left.css('opacity', 1);
                            i++;
                            if (i >= indexsum - index) {
                                i = indexsum - index;
                                this.right.css('opacity', 0.2);
                            };
                            this.ulpic.css({
                                left: -distance * i,
                            });
                        });
                    };
                }
                addcart(sid) {
                    let sidarr = [];
                    let numarr = [];
                    let flagsid = null;
                    this.button.on('click', () => {
                        // console.log(this.box4_input.val());
                        // console.log(sid);
                        if ($.cookie('sid')) { //如果cookie中存在sid
                            flagsid = 0;
                            sidarr = $.cookie('sid').split(',');
                            numarr = $.cookie('num').split(',');
                            $.each(sidarr, (index, value) => {
                                if (+value === +sid) { //如果购买的商品存在，则标记1
                                    flagsid = 1;
                                };
                            });
                            if (flagsid === 0) { //标记为0，则代表sid在数组中不存在，
                                sidarr.push(sid);
                                numarr.push(this.box4_input.val());
                            } else {
                                $.each(sidarr, (index, value) => {
                                    if (+value === +sid) {
                                        numarr[index] = Number(numarr[index]) + Number(this.box4_input.val());
                                    }
                                });
                            }
                            $.cookie('sid', sidarr, { expires: 7, path: '/' });
                            $.cookie('num', numarr, { expires: 7, path: '/' });
                        } else {
                            // console.log(123);
                            sidarr.push(sid);
                            numarr.push(this.box4_input.val());
                            $.cookie('sid', sidarr, { expires: 7, path: '/' });
                            $.cookie('num', numarr, { expires: 7, path: '/' });
                        }
                        alert('添加购物车成功');
                    })
                }
            }
            new Render().init();
        }
    }
})