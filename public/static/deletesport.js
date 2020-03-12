function deleteSport(id, name){
    $.ajax({
        url: '/admin/' + id + '.' + name,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

