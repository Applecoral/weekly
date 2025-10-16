// Theme colors
const themeColor = "#AA2C72"; // your purple tone
const accentColor = "#D9D9D9"; // soft pink accent

// Function to check password
function checkPassword() {
  const lastAccess = localStorage.getItem("lastAccess");
  const now = new Date().getTime();
  const twoWeeks = 14 * 24 * 60 * 60 * 1000;

  if (lastAccess && now - lastAccess < twoWeeks) {
    document.getElementById("protected-content").style.display = "block";
    return;
  }

  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = themeColor;
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";
  overlay.style.color = accentColor;

  const promptBox = document.createElement("div");
  promptBox.style.textAlign = "center";

  const title = document.createElement("h2");
  title.textContent = "Enter Password";
  title.style.marginBottom = "10px";

  const input = document.createElement("input");
  input.type = "password";
  input.style.padding = "10px";
  input.style.border = "none";
  input.style.borderRadius = "8px";
  input.style.outline = "none";
  input.style.textAlign = "center";
  input.style.fontSize = "16px";

  const button = document.createElement("button");
  button.textContent = "Access";
  button.style.marginTop = "12px";
  button.style.padding = "10px 20px";
  button.style.backgroundColor = accentColor;
  button.style.color = themeColor;
  button.style.border = "none";
  button.style.borderRadius = "8px";
  button.style.cursor = "pointer";
  button.style.fontWeight = "bold";

  button.onclick = () => {
    const password = "rainfall"; // set your password here
    if (input.value === password) {
      localStorage.setItem("lastAccess", now);
      document.body.removeChild(overlay);
      document.getElementById("protected-content").style.display = "block";
    } else {
      alert("Wrong password, try again.");
    }
  };

  promptBox.appendChild(title);
  promptBox.appendChild(input);
  promptBox.appendChild(button);
  overlay.appendChild(promptBox);
  document.body.appendChild(overlay);
}

// Run check
window.onload = checkPassword;
