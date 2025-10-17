// Theme colors
const themeColor = "#AA2C72"; // main purple tone
const accentColor = "#D9D9D9"; // soft silver accent

// PASSWORD PROTECTION
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
  overlay.style.fontFamily = "Roboto, sans-serif";

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
    const password = "rainfall";
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

// FEEDBACK POPUP + EMAILJS
document.addEventListener("DOMContentLoaded", () => {
  // EmailJS init
  emailjs.init("igWJkDe7jvbsQjJOq");

  const feedbackBtn = document.createElement("button");
  feedbackBtn.id = "feedbackBtn";
  feedbackBtn.textContent = "Feedback";
  Object.assign(feedbackBtn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: themeColor,
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 0 8px rgba(0,0,0,0.2)",
  });
  document.body.appendChild(feedbackBtn);

  const feedbackPopup = document.createElement("div");
  feedbackPopup.id = "feedbackPopup";
  Object.assign(feedbackPopup.style, {
    display: "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    zIndex: "10000",
    textAlign: "center",
    fontFamily: "Roboto, sans-serif",
    width: "280px",
  });

  feedbackPopup.innerHTML = `
    <h3 style="color:${themeColor};margin-bottom:10px;">Send Feedback</h3>
    <input type="text" id="user_name" placeholder="Your name" style="width:100%;padding:8px;margin-bottom:10px;border:1px solid #ccc;border-radius:5px;">
    <textarea id="message" placeholder="Your message" style="width:100%;height:80px;padding:8px;margin-bottom:10px;border:1px solid #ccc;border-radius:5px;"></textarea>
    <div>
      <button id="sendFeedback" style="background-color:${themeColor};color:white;padding:8px 15px;border:none;border-radius:5px;cursor:pointer;">Send</button>
      <button id="closeFeedback" style="background-color:${accentColor};color:black;padding:8px 15px;border:none;border-radius:5px;cursor:pointer;margin-left:10px;">Close</button>
    </div>
  `;
  document.body.appendChild(feedbackPopup);

  const closeFeedback = feedbackPopup.querySelector("#closeFeedback");
  const sendFeedback = feedbackPopup.querySelector("#sendFeedback");

  feedbackBtn.addEventListener("click", () => {
    feedbackPopup.style.display = "block";
  });

  closeFeedback.addEventListener("click", () => {
    feedbackPopup.style.display = "none";
  });

  sendFeedback.addEventListener("click", () => {
    const name = document.getElementById("user_name").value;
    const message = document.getElementById("message").value;

    if (!name || !message) {
      alert("Please fill in all fields.");
      return;
    }

    emailjs.send("service_x360", "template_fbdv0mh", {
      user_name: name,
      message: message,
    })
    .then(() => {
      alert("Feedback sent successfully!");
      feedbackPopup.style.display = "none";
    })
    .catch(() => {
      alert("Failed to send feedback. Please try again later.");
    });
  });
});

// RUN PASSWORD CHECK
window.onload = checkPassword;
