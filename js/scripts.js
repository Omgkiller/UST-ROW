// ("#send").click = function(){
//     console.log("submitted");
// };

// $("#apply").on("submit",function(e) {
//     e.preventDefault();

// });

var form = document.getElementById("apply");
    
async function handleSubmit(event) {
  event.preventDefault();
  let status;
  if (this.id=="apply"){
    status = document.getElementById("form-status");
  }else if (this.id=="contactUs"){
    status = document.getElementById("my-form-status");
  }
  var data = new FormData(event.target);
  const fullname = $("#fullname").val().trim();
  const nickname = $("#nickname").val().trim();
  const school = $("#school").val().trim();
  const email = $("#email").val().trim();
  const phone = $("#telnum").val().trim();
  const contactMethod = $("#contact-method").val().trim();
   if (!fullname || !nickname ||!school||!email||!phone||!contactMethod){
      status.innerHTML = "Please fill in all input field!";
     return;
  }

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
form.addEventListener("submit", handleSubmit)
