// const submitBtn = document.querySelector("form button");

// function auth(type, isSignUp) {
//   const form = document.getElementById("auth-form");
//   const email = document.getElementById("email");
//   const password = document.getElementById("password");
//   const confirmPassword = document.getElementById("confirm-password");

//   const api = "AIzaSyAqCdu-rdEyvAlrc3JeUSbw-M3u-aQIFSU";
//   const url = `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${api}`;

//   password.addEventListener("input", removeError);
//   if (isSignUp) {
//     confirmPassword.addEventListener("input", removeError);
//   }
//   form.addEventListener("submit", submitHandler);

//   function submitHandler(e) {
//     e.preventDefault();
//     removeError();

//     if (isSignUp && !validate()) {
//       setError("Password do not match", confirmPassword);
//       return;
//     }
//     sendReq(url, {
//       email: email.value,
//       password: password.value,
//       returnSecureToken: true,
//     });
//   }

//   function validate() {
//     return password.value === confirmPassword.value;
//   }
// }

// function sendReq(url, data) {
//   const originalTxt = submitBtn.textContent;
//   submitBtn.textContent = "Sending...";

//   fetch(url, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((res) => res.json())
//     .then((json) => {
//       console.log(json);
//       if (json.error) {
//         setError(json.error.message, submitBtn);
//       } else {
//         const jsonData = { ...json, expiresIn: Date.now() + 3600 * 1000 };
//         localStorage.setItem("firebase-data", JSON.stringify(jsonData));
//         showSuccesMsg();
//         redirect();
//       }
//       submitBtn.textContent = originalTxt;
//     })
//     .catch((err) => {
//       console.error(err.error.message);
//       submitBtn.textContent = originalTxt;
//     });
// }

// function showSuccesMsg() {
//   const msgEl = document.querySelector(".auth-msg");
//   msgEl.classList.add("active");
// }

// function redirect() {
//   setTimeout(() => {
//     window.location = "/client/form.html";
//   }, 3000);
// }

// function setError(msg, el) {
//   const error = `<small id='error'>${msg}</small>`;
//   el.insertAdjacentHTML("afterend", error);
// }

// function removeError() {
//   const err = document.getElementById("error");
//   if (err) err.remove();
// }

