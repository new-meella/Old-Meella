function modaldelete() {
    swal({
        title: "You are deleting this menu!",
        text: "You will not be able to recover this menu.",
        html: true,
        type: "info",
        showCancelButton: true,
        confirmButtonColor: "#FF0000",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            if (isConfirm) {
                swal({
                    title: "Deleted!",
                    text: "Your menu has been deleted.",
                    html: true,
                    type: "success",
                    confirmButtonColor: "#437F97",
                    confirmButtonText: "OK",
                    closeOnConfirm: true
                });
            } else {
                swal("Cancelled", "Your menu is safe :)", "error");
            }
        });
}

function modalapply() {
    swal({
        title: "Success!",
        text: "Your menu has been applied.",
        html: true,
        type: "success",
        confirmButtonColor: "#437F97",
        confirmButtonText: "OK",
        closeOnConfirm: false,
    });
}
