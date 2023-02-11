const form = document.getElementById("auth-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const messagebox=document.getElementById("mesagebox")
const alertmes=document.querySelector(".als")
const btnload=document.querySelector(".loaderbtn")
form.addEventListener("submit", submitHandler);
function submitHandler(e)
{
    const data={email:email.value,password:password.value}
    e.preventDefault();
    if(password.value.length>0 && email.value.length>0)
    {
        btnload.style.disabled = true;
        btnload.innerHTML="Loading ......"
        fetch("http://localhost:3000/docx/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((res) => res.json())
          .then((json) => {
            if(json?.user&&json?.token)
            {
            localStorage.setItem("docxter", JSON.stringify(json));
            }
            messagebox.style.display="flex"
            messagebox.style.borderBottom="2px solid green"
            alertmes.innerHTML=json?.message
            setTimeout(() => {
                btnload.style.disabled = false
                btnload.innerHTML="Signin"
                messagebox.style.display="none"
                messagebox.style.borderBottom=""
            }, 3000);
            checkForAuth();
            
        })
          .catch((err) => {
            messagebox.style.display="flex"
            messagebox.style.borderBottom="2px solid red"
            alertmes.innerHTML="something went wrong"
            setTimeout(() => {
                btnload.innerHTML="Signin"
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
function checkForAuth() {
    const authData = JSON.parse(localStorage.getItem("docxter"));
    if (authData) {
      window.location = "/client/form.html";
    } else {
      localStorage.removeItem("docxter");
    }
  }
  
  checkForAuth()
