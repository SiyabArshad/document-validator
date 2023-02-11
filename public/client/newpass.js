const urlParams = new URLSearchParams(window.location.search);
const tokem = urlParams.get('token')
const form = document.getElementById("auth-form");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const messagebox=document.getElementById("mesagebox")
const alertmes=document.querySelector(".als")
const btnload=document.querySelector(".loaderbtn")
form.addEventListener("submit", submitHandler);
function submitHandler(e)
{
    const data={password:password.value,token:tokem}
    e.preventDefault();
    if(validate())
    {
        btnload.style.disabled = true;
        btnload.innerHTML="Loading ......"
        fetch("http://localhost:3000/docx/new-password", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((res) => res.json())
          .then((json) => {
            messagebox.style.display="flex"
            messagebox.style.borderBottom="2px solid green"
            alertmes.innerHTML=json?.message
            setTimeout(() => {
                btnload.style.disabled = false
                btnload.innerHTML="Reset"
                messagebox.style.display="none"
                messagebox.style.borderBottom=""
            }, 3000);
        })
          .catch((err) => {
            messagebox.style.display="flex"
            messagebox.style.borderBottom="2px solid red"
            alertmes.innerHTML="something went wrong"
            setTimeout(() => {
                btnload.innerHTML="Reset"
                btnload.style.disabled = false;    
                messagebox.style.display="none"
                messagebox.style.borderBottom=""
            }, 3000);
        });
    }
    else
    {
        messagebox.style.display="flex"
        messagebox.style.borderBottom="2px solid red"
        alertmes.innerHTML="Password doesnot mtach"
        setTimeout(() => {
            messagebox.style.display="none"
            messagebox.style.borderBottom=""
        }, 3000);

    }
}

function validate() {
    return password.value === confirmPassword.value;
  }


  function checkForAuth() {
    const authData = JSON.parse(localStorage.getItem("docxter"));
    if (authData) {
      window.location = "/client/form.html";
    } else {
      localStorage.removeItem("docxter");
    }
  }
  
  checkForAuth()
