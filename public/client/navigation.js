const home=document.querySelector(".hm")
const about=document.querySelector(".abs")
const contact=document.querySelector(".acs")
function navclick()
{
    switch(window.location.pathname)
    {
        case "/client/form.html":
            home.style.backgroundColor="#212121";
            about.style.backgroundColor="";
            contact.style.backgroundColor="";
            break;
        case "/client/aboutus.html":
            home.style.backgroundColor="";
            about.style.backgroundColor="#212121";
            contact.style.backgroundColor="";
            break;
        case "/client/contactus.html":
            home.style.backgroundColor="";
            about.style.backgroundColor="";
            contact.style.backgroundColor="#212121";
            break;
       default:
        home.style.backgroundColor="#212121";
        about.style.backgroundColor="";
        contact.style.backgroundColor="";
        break;
    }
}

navclick()