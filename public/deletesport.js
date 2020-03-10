function deleteSport(id){
    $.ajax({
        url: '/admin/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

