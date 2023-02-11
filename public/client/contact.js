const cemail=document.querySelector(".cemail")
const cdesc=document.querySelector(".cdesc")
const cmessagebox=document.getElementById("mesagebox")
const calertmes=document.querySelector(".als")
const contactform = document.getElementById("cform");
const cbtnload=document.querySelector(".contactloader")
contactform.addEventListener("submit", cfsubmitHandler);
function cfsubmitHandler(e)
{
    e.preventDefault();
    const data={email:cemail.value,description:cdesc.value}
    if(cemail.value.length>0 && cdesc.value.length>0)
    {
        cbtnload.style.disabled = true;
        cbtnload.innerHTML="Loading ......"
        fetch("http://localhost:3000/docx/contact-us", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((res) => res.json())
          .then((json) => {  
            cmessagebox.style.display="flex"
            cmessagebox.style.borderBottom="2px solid green"
            calertmes.innerHTML=json?.message
            setTimeout(() => {
                cbtnload.style.disabled = false
                cbtnload.innerHTML="Send"
                cmessagebox.style.display="none"
                cmessagebox.style.borderBottom=""
            }, 3000);
        })
          .catch((err) => {
            cmessagebox.style.display="flex"
            cmessagebox.style.borderBottom="2px solid red"
            calertmes.innerHTML="something went wrong"
            setTimeout(() => {
                cbtnload.innerHTML="Send"
                cbtnload.style.disabled = false;    
                cmessagebox.style.display="none"
                cmessagebox.style.borderBottom=""
            }, 3000);
        });
    }
    else
    {
        cmessagebox.style.display="flex"
        cmessagebox.style.borderBottom="2px solid red"
        calertmes.innerHTML="Some Parameters are missing"
        setTimeout(() => {
            cmessagebox.style.display="none"
            cmessagebox.style.borderBottom=""
        }, 3000);

    }
}

