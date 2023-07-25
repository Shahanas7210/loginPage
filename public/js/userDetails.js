
function redirectToLogin() {
  window.location.href = "/register";
}


function deleteFunction(deleteLink) {

  var actionsTd = deleteLink.closest('td');

  var id = actionsTd.getAttribute('id');

  console.log('ID to delete:', id);

  var request = {
    "url": `http://localhost:3001/api/users/${id}`,
    "method": "DELETE",

  }


  
swal({
  title: "Do you want to delete this record?",
  text: "Once deleted, you cannot undo this action.",
  icon: "warning",
  buttons: ["Cancel", "Delete"],
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    $.ajax(request).done(function(response) {
      swal("Good job!", "Record deleted successfully!", "success")
        .then((result) => {
          location.reload();
        })
        .catch((err) => {
          console.log("Error showing success message: " + err);
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
      swal("Oops!", "Something went wrong. Record not deleted.", "error")
        .then((result) => {
        })
        .catch((err) => {
          console.log("Error showing error message: " + err);
        });
    });
  } else {
    swal("Great", "Your record is safe", "success")
    
  }
});

  


  // if(confirm("Do you wnt delete this record ?")){
  //   $.ajax(request).done(function(response){
  //     swal("Good job!", "You clicked the button!", "success").then((result) => {
  //       location.reload();
  //   }).catch((err) => {
  //       console.log("Press ok");
  //   });
  //   })
  // }
}


