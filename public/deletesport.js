function deleteSport(id){
    $.ajax({
        url: '/admin/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

/*
function deleteTeam(id){
    $.ajax({
        url: '/admin-team/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteInjury(id){
    $.ajax({
        url: '/admin-injury/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
*/
