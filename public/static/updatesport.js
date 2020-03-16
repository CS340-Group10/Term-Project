function updateSport(id){
    $.ajax({
        url: '/admin/sports/' + id,
        type: 'PUT',
        data: $('#update-sport').serialize(),
        success: function(result){
            window.location.href = ("/admin");
        }
    })
};