// Select input fields and button
const siteInput = document.getElementById("site-input");
const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const addButton = document.getElementById("add-button");
const passwordLists = document.getElementById("passwordLists");

let passwords = [];

function renderPasswords() {
  passwordLists.innerHTML = "";

  passwords.forEach((entry, index) => {
    const entryDiv = document.createElement("div");
    entryDiv.classList.add("entry");

    entryDiv.innerHTML = `
      <p><strong>Website:</strong> ${entry.site}</p>
      <p><strong>Username:</strong> ${entry.username}</p>
      <p><strong>Password:</strong> <span class="masked">********</span></p>
      <button  type="button" class="show-btn">Show</button>
      <button type="button" class="copy-btn">Copy</button>
      <button  type="button" class="delete-btn">Delete</button>
      `;

    const deleteBtn = entryDiv.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      passwords.splice(index, 1);
      localStorage.setItem("passwords", JSON.stringify(passwords));
      renderPasswords();
    });

    const showBtn = entryDiv.querySelector(".show-btn");
    const passwordText = entryDiv.querySelector(".masked");

    let isHidden = true;

    showBtn.addEventListener("click", () => {
      if (isHidden) {
        passwordText.textContent = entry.password;
        showBtn.textContent = "Hide";
      } else {
        passwordText.textContent = "********";
        showBtn.textContent = "Show";
      }
      isHidden = !isHidden;
    });

    const copyBtn = entryDiv.querySelector(".copy-btn");

    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(entry.password);
      copyBtn.textContent = "copied";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 1000);
    });

    passwordLists.appendChild(entryDiv);
  });
}

addButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  if (
    siteInput.value.trim() === "" ||
    usernameInput.value.trim() === "" ||
    passwordInput.value.trim() === ""
  ) {
    alert("Please fill all fields before adding!");
    return; // Stop running the function
  }

  const newEntry = {
    site: siteInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
  };

  passwords.push(newEntry);
  localStorage.setItem("passwords", JSON.stringify(passwords));

  siteInput.value = "";
  usernameInput.value = "";
  passwordInput.value = "";

  renderPasswords();
});

const savedPasswords = localStorage.getItem("passwords");
if (savedPasswords) {
  passwords = JSON.parse(savedPasswords);
  renderPasswords();
}
