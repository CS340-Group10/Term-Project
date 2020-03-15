function updateItem(id){
    $.ajax({
        url: '/sports/' + id,
        type: 'PUT',
        data: $('#update-sport').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};