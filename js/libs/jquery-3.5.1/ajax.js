$.extend({
  pAjax:function(option){
            return new Promise(function(resolve,reject){
                $.ajax({
                    url:option.url,
                    type:option.type,
                    data:option.data,
                    async:option.async,
                    success:function(res){
                        resolve(res)
                    },
                    error:function(err){
                        reject(err)
                    }
                })
            })
        }
});