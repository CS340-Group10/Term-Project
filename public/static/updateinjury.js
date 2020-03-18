function updateInjury(id){
    $.ajax({
        url: '/admin-injuries/' + id,
        type: 'PUT',
        data: $('#update-injury').serialize(),
        success: function(result){
            window.location.href = ("/admin");
        }
    })
};