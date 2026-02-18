

const openBtn = document.getElementById("openScheduleModal");
const closeBtn = document.getElementById("closeScheduleModal");
const modal = document.getElementById("scheduleModal");

openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

// Handle form submission
const form = modal.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent default reload

  const name = document.getElementById("modalName").value;
  const email = document.getElementById("modalEmail").value;
  const phone = document.getElementById("modalPhone").value;
  const date = document.getElementById("modalMeetingDate").value;
  const time = document.getElementById("modalMeetingTime").value;

  try {
    const res = await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, date, time })
    });

    const data = await res.json();
    alert(data.message || "Email sent successfully!");
    form.reset();
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  } catch (err) {
    console.error(err);
    alert("Failed to send email. Try again.");
  }
});
