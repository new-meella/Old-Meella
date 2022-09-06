//save button//
function SaveFunction() {
  var Name = document.getElementById("txtInputName").value;
  document.getElementById("show_name").innerHTML = Name;

  var Lastname = document.getElementById("txtInputLastname").value;
  document.getElementById("show_lastname").innerHTML = Lastname;

  var Phone = document.getElementById("txtInputPhone").value;
  document.getElementById("show_Phone").innerHTML = Phone;

  var Email = document.getElementById("txtInputEmail").value;
  document.getElementById("show_Email").innerHTML = Email;

  var hide = document.getElementById("edit_profile");
  hide.style.display = "none";

  var show = document.getElementById("show_profile");
  show.style.display = "block";


  var save = document.getElementById("save");
  save.style.display = "none";

  var edit = document.getElementById("edit");
  edit.style.display = "block";

  var at = document.getElementById("txtInputEmail").value.indexOf("@");
  if (at == -1) {
    alert("Not a valid e-mail!");
  }

  var Phone = document.getElementById("txtInputPhone").value;
   
      if (Phone.length > 10) {
    alert("Please Type the Phone no. again");
  } 
  if (Phone.length < 10){
    alert("Please Type the Phone no. again");
  }

}



//cancel button//
function ClearFields() {
  document.getElementById("cancel").reset();
}


//click edit profile//

function EditProfile() {
  var x = document.getElementById("edit_profile");
  var z = document.getElementById("show_profile");
  var btn = document.getElementById("edit");
  var savebtn = document.getElementById("save");
  x.style.display = "block";
  z.style.display = "none";

  btn.style.display = "none";


  savebtn.style.display = "block";


}



//change password//
var change = document.querySelector("#Change");
change.addEventListener("click", function () {
  var editpassword = document.querySelector(".edit_password");
  editpassword.classList.toggle("show");
  var savebtn = document.getElementById("save");
  var cancelbtn = document.getElementById("cancel");
  savebtn.classList.toggle("position");
  cancelbtn.classList.toggle("position");

})
//

