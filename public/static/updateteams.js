function updateTeam(id){
    $.ajax({
        url: '/admin-teams/' + id,
        type: 'PUT',
        data: $('#update-team').serialize(),
        success: function(result){
            window.location.href = ("/admin");
        }
    })
};