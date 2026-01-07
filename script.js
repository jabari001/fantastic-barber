console.log("Script loaded");
console.log(images);

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS LOADED");


  // ELEMENTS
  const bg = document.getElementById("bg");
  const cards = document.querySelectorAll(".service-card");
  const serviceInput = document.getElementById("service");

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const dayInput = document.getElementById("day");
  const timeInput = document.getElementById("time");
  const notesInput = document.getElementById("notes");
  const busyWarning = document.getElementById("busyWarning");
  const form = document.getElementById("bookingForm");

  // IMAGES (make sure paths & names are correct)
const images = {
  haircut: "images/haircut.avif",
  beard: "images/beard.avif",
  combo: "images/combo.avif",
  home: "images/home.avif",
};


  // DEFAULT BACKGROUND
  bg.style.backgroundImage = `url('${images.haircut}')`;

  // SERVICE SELECTION
  cards.forEach(card => {
    const bgKey = card.dataset.bg;

    card.addEventListener("mouseenter", () => {
      bg.style.backgroundImage = `url('${images[bgKey]}')`;
    });

    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      serviceInput.value = card.querySelector("h3").innerText;
    });
  });

  // BUSY LOGIC (1 HOUR NOTICE)
timeInput.addEventListener("change", () => {
  if (!timeInput.value || !dayInput.value) return;

  const selectedDate = new Date(dayInput.value);
  const day = selectedDate.getDay();

  // Check Monday first
  if (day === 1) {
    busyWarning.textContent = " Closed on Mondays. Please choose another day.";
    return;
  }

  // Combine date + time into one Date object
  const [hours, minutes] = timeInput.value.split(":");
  selectedDate.setHours(hours, minutes, 0);
  selectedDate.setSeconds(0);

  const now = new Date();
  const diffMinutes = (selectedDate - now) / 60000;

  if (diffMinutes < 60 && diffMinutes > -60) { 
    // within 1 hour window of now
    busyWarning.textContent =
      "⏳ Barber is currently serving another client. Next available slot is after 1 hour.";
  }if (selectedDate < now) {
  busyWarning.textContent = "you do no that  we are alive right.";
  return;
} 
  else {
    busyWarning.textContent = "";
  }
});



  // MONDAY OFF LOGIC
dayInput.addEventListener("change", () => {
  const selectedDate = new Date(dayInput.value);

  if (selectedDate.getDay() === 1) {
    busyWarning.textContent = " Closed on Mondays. Please choose another day.";
  } else {
    busyWarning.textContent = "";
  }
});

  // SUBMIT TO WHATSAPP
  form.addEventListener("submit", e => {
    e.preventDefault();

    if (!nameInput.value || !phoneInput.value || !dayInput.value || !timeInput.value) {
      alert("Please fill all required fields.");
      return;
    }

    const selectedDate = new Date(dayInput.value);
    if (selectedDate.getDay() === 1) {
      alert("Sorry, the barber is closed on Mondays.");
      return;
    }

    const message =
`Hello 👋 I would like to book a barber appointment.%0A
Service: ${serviceInput.value}%0A
Name: ${nameInput.value}%0A
Phone: ${phoneInput.value}%0A
Date: ${dayInput.value}%0A
Time: ${timeInput.value}%0A
Notes: ${notesInput.value || "None"}`;

    const whatsappNumber = "254794918813"; // CHANGE NUMBER
   document.getElementById("loading").style.display = "flex";

setTimeout(() => {
  window.open(`https://wa.me/${0794918813}?text=${message}`, "_blank");
  document.getElementById("loading").style.display = "none";
}, 1200);

  });

});



