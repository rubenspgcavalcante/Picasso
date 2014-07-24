var DB = (function () {

    this.save = function (user) {
        if(user.id == null){
            user.id = new Date().getTime();
        }
        $.jStorage.set(user.id, user);
    };

    this.get = function(id){
        return $.jStorage.get(id);
    };

    this.remove = function (id) {
        $.jStorage.deleteKey(id);
    };

    this.list = function () {
        var ids = $.jStorage.index();
        var users = [];
        for(var i=0; i < ids.length; i++){
            users.push(this.get(ids[i]));
        }

        return users;
    };

    this.flush = function(){
        $.jStorage.flush();
    };

    return {
        save: this.save,
        get: this.get,
        remove: this.remove,
        list: this.list,
        flush: this.flush
    };
})();