 //检测是否登录
 let login = localStorage.getItem('login');
 if (!login) {
   alert("还未登陆，请登录之后再来");
   localStorage.setItem('url', location.href);
   location.href = './login.html'
 }
 //定义购物车对象
 class car {
   constructor(ele, user) {
     this.ele = $(ele);
     this.user = user;
     this.info = {
       num: 0,
       total: 0
     };
     this.init();
   }
   //初始化
   init() {
     this.body = $('.panel-body');
     this.num = $('#totalnumber');
     this.types = $('#typegoods');
     this.total = $('.setlement');
     this.allcheck = $('.allcheck');
     this.getData();
     //绑定点击事件
     this.ele.click((e) => {
       let tar = $(e.target);
       this.id = tar.attr('idx');
       if (tar.hasClass('checked')) {
         this.data.forEach(item => {
           if (item.goods_id == this.id) {
             item.checkit = tar[0].checked;
           }
         });
         this.redenerTable();
       }
       if (tar.hasClass('allcheck')) {
         this.data.forEach(item => {
           item.checkit = tar[0].checked;
         })
         this.render();
       }
       if (tar.hasClass('reduce')) {
         this.reduce();
       }
       if (tar.hasClass('add')) {
         this.add();
       }
       if (tar.hasClass('del')) {
         this.delect(this.id);
       }
       //结算时效果
       if (tar.hasClass('setlet')) {
         let flag = confirm("你确定要结算吗？");
         if (flag) {
           let deldata = this.data.filter(item => {
             return item.checkit == true;
           })
           deldata.forEach(item => {
             this.delect(item.goods_id);
           })
         }
       }
     });
   }

   //获取数据
   async getData() {
     let data = await $.pAjax({
       url: '../api/getcar.php',
       data: {
         username: this.user
       },
     });
     this.data = JSON.parse(data);
     this.render();
   }

   //渲染结构
   render() {
     this.redenerTable();
     let str = '';
     this.data.forEach(item => {
       let total = item.goods_num * item.price;
       str += `<div class="media">
               <div class="media-left">
                   <a href="./details.html?=${item.goods_id}" class="media_left">
                       <input type="checkbox"  ${item.checkit ?"checked":""} class="checked" idx='${item.goods_id}'>
                       <img class="media-object" style="width: 100px;"
                           src="${item.img}"
                           alt="...">
                   </a>
               </div>
               <div class="media-body">
                   <div class="media_body_left">
                       <h4 class="media-heading">${item.title}</h4>
                       <div class="price">
                           <i class="glyphicon glyphicon-yen"></i>
                           <span>${item.price}</span>
                       </div>
                   </div>
                   <div class="media_body_center">
                       <div class="btn-group" role="group" aria-label="...">
                           <button type="button"  idx="${item.goods_id}" class="reduce btn btn-default">-</button>
                           <button type="button" class="btn btn-default">${item.goods_num}</button>
                           <button type="button"  idx="${item.goods_id}" class="add btn btn-default">+</button>
                       </div>
                   </div>
                   <div class="media_body_right">
                       <span>总价：￥${total.toFixed(2)}</span>
                       <span idx="${item.goods_id}" class="glyphicon glyphicon-remove del"></span>
                   </div>
               </div>
           </div>`
     });
     this.body.html(str);
   }
   //渲染购物车边框信息
   redenerTable() {
     //过滤选中的商品
     this.checkdata = this.data.filter(item => {
       return item.checkit == true;
     });

     this.info.num = this.checkdata.reduce((pre, cur) => {
       return pre + cur.goods_num * 1;
     }, 0)
     this.info.total = this.checkdata.reduce((pre, cur) => {
       return pre + cur.goods_num * cur.price;
     }, 0)
     //判断是否全选
     let res = this.data.every(item => {
       return item.checkit == true
     });
     this.types.html(this.data.length);
     this.num.html(this.info.num);
     this.total.html(`总价格：￥${this.info.total}`);
     this.allcheck[0].checked = res;
   }
   //减号执行
   reduce() {
     let data = this.data.find(item => {
       return item.goods_id == this.id
     }).goods_num;
     if (data <= 1) {
       alert('商品数量最小为1!!!!');
       return
     }
     $.ajax({
       url: '../api/revcar.php',
       data: {
         goods_id: this.id,
         goods_num: --data,
         username: this.user
       }
     }).then(res => {
       res = JSON.parse(res);
       if (res.code) {
         this.data.forEach(item => {
           if (item.goods_id == this.id) {
             item.goods_num = data;
             this.render();
           }
         })
       }
     })
   }
   //加号执行
   add() {
     let data = this.data.find(item => {
       return item.goods_id == this.id
     }).goods_num;
     $.ajax({
       url: '../api/revcar.php',
       data: {
         goods_id: this.id,
         goods_num: ++data,
         username: this.user
       }
     }).then(res => {
       res = JSON.parse(res);
       if (res.code) {
         this.data.forEach(item => {
           if (item.goods_id == this.id) {
             item.goods_num = data;
             this.render();
           }
         })
       }
     })
   }
   //删除执行
   delect(id) {
     $.ajax({
       url: '../api/revcar.php',
       data: {
         username: this.user,
         goods_id: id
       }
     }).then(res => {
       res = JSON.parse(res);
       if (res.code) {
         this.data = this.data.filter(item => {
           return item.goods_id != id;
         })
         this.render();
       }
     })
   }
 }

 new car('.container', login);