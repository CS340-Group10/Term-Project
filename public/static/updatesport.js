function updateSport(id){
    $.ajax({
        url: '/admin/sports/update/' + id,
        type: 'PUT',
        data: $('#update-sport').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};