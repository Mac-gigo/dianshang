//设置cookie
        function setCookie(key,value,expires){
            if(expires){
                let date = new Date();
                let d = date.getTime() - 8*60*60*1000;
                d = d+expires * 1000;
                date.setTime(d);
                document.cookie = `${key}=${value};expires=${date}`;
        }else{
        document.cookie = `${key}=${value}`
    }
        }
        
        
        //获取cookie
        function getCookie(key) {
             let cookies = document.cookie;
             let arr = cookies.split('; ');
               let res = "";
         arr.forEach((item,index)=>{
         if(item.split('=')[0]==key){
            res = item.split('=')[1];
           }
         });
       return res;
        }