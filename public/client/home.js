const authData = JSON.parse(localStorage.getItem("docxter"));
const profilemenu=document.querySelector(".hmmen")
const username=document.getElementById("proname")
const userpic=document.getElementById("propic")
const useremail=document.getElementById("progmail")
const userdob=document.getElementById("prodob")
const logoutBtn = document.querySelector("#logoutBtn");
const downloadBtn = document.querySelector(".downloadfile");
const downloadLink = document.querySelector(".downloadfile a");
const uploadBtn = document.querySelector(".uploadbnt");
const form = document.querySelector("form");
const doc = document.getElementById("doc");
const filename = document.getElementById("filename");
const fontSize = document.getElementById("fontSize");
const fontStyle = document.getElementById("fontStyle");
const fontFamily = document.getElementById("fontFamily");
const lineSpacing = document.getElementById("lineSpacing");
const fsname=document.querySelector(".fsname")
const ls=document.querySelector(".profile-card11")
var fileToRead = document.getElementById("doc");

/*!SECTION Fetching parameters data in realtime
parameter fetching
*/
const fetchparameters=()=>{
  ls.style.display="flex"
  const getpara = new FormData();
  getpara.append("token", authData?.token)  
      fetch("http://localhost:3000/docx/getparameters",{
        method: "POST",
        body: getpara,
      }).then((res) =>res.json()).then((data)=>{
          fontSize.value=data?.fontSize
          fontStyle.value=data?.fontType
          lineSpacing.value=data?.lineSpacing
          fontFamily.value=data?.fontName
        setTimeout(() => {
          ls.style.display="none"
        }, 1000);
      }).catch((e)=>{
        console.log(e)
        ls.style.display="none"
      })
}

//end

fileToRead.addEventListener("change", function(event) {
    var files = fileToRead.files;
    if (files.length) {
        fsname.textContent=files[0].name
        console.log("Type: " + files[0].type);
        console.log("Size: " + files[0].size + " bytes");
    }

}, false);
function logoutUser(e) {
    localStorage.removeItem("docxter");
    window.location = "/client/signin.html";
  }
  function loginUser(e) {
    window.location = "/client/signin.html";
  }
if(authData)
{
  fetchparameters()
    profilemenu.style.display="flex"
    userpic.innerHTML=authData?.user.name[0]
    username.innerHTML=authData?.user.name
    useremail.innerHTML=authData?.user.email
    userdob.innerHTML=`Date Of Birth:${new Date(authData?.user.dateOfBirth).getMonth()+1}-${new Date(authData?.user.dateOfBirth).getDay()}-${new Date(authData?.user.dateOfBirth).getFullYear()}`
    logoutBtn.innerHTML="Log out"
    logoutBtn.addEventListener("click", logoutUser);
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      verifiedoperations()
     })
}
else
{
    logoutBtn.innerHTML="Log in"
    logoutBtn.addEventListener("click", loginUser);
   // guestoperations()   
   form.addEventListener("submit", (e)=>{
    e.preventDefault();
    guestoperations()
   })
}


const guestoperations=()=>{
    ls.style.display="flex"
    uploadBtn.style.display="none"
      const data = new FormData();
      data.append("doc", doc.files[0]);
      data.append("fontSize", fontSize.value);
      data.append("fontStyle", fontStyle.value);
      data.append("fontFamily", fontFamily.value);
      data.append("lineSpacing", lineSpacing.value);
      fetch("http://localhost:3000/upload-docx", {
            method: "POST",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
              setTimeout(()=>{
                ls.style.display="none"
              downloadBtn.style.display="flex"  
              uploadBtn.textContent="Uplaod"
              const filename = data.filePath.replace("./public", "");
              fsname.textContent=filename
              downloadLink.setAttribute("href", filename)
              },2000)
            })
            .catch((err) => {
              ls.style.display="none"
              uploadBtn.style.display = "flex";
            });
}

const verifiedoperations=()=>{
      ls.style.display="flex"
      uploadBtn.style.display="none"
      const strvals={
        fontSize:fontSize.value
        ,lineSpacing:lineSpacing.value
        ,fontStyle:fontStyle.value,
        fontFamily:fontFamily.value,
        token:authData.token
      }
      updateparameters(strvals) 
      const data = new FormData();
      data.append("doc", doc.files[0]);
      data.append("fontSize", fontSize.value);
      data.append("fontStyle", fontStyle.value);
      data.append("fontFamily", fontFamily.value);
      data.append("lineSpacing", lineSpacing.value);
      
      fetch("http://localhost:3000/upload-docx", {
            method: "POST",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {       
              setTimeout(()=>{
                ls.style.display="none"
              downloadBtn.style.display="flex"  
              uploadBtn.textContent="Uplaod"
              const filename = data.filePath.replace("./public", "");
              fsname.textContent=filename
              downloadLink.setAttribute("href", filename)
              },2000)
            })
            .catch((err) => {
              ls.style.display="none"
              uploadBtn.style.display = "flex";
            });
}

async function updateparameters(data){
  const data1 = new FormData();
  data1.append("token", data.token);
  data1.append("fontSize", data.fontSize);
  data1.append("fontType", data.fontStyle);
  data1.append("fontName", data.fontFamily);
  data1.append("lineSpacing", data.lineSpacing);
  fetch("http://localhost:3000/docx/parameters", {
    method: "POST",
    body: data1,
  })
    .then((res) => res.json())
    .then((data) => {
    })
    .catch((err) => {
      console.log(err)
      ls.style.display="none"
      uploadBtn.style.display = "flex";
    });
}