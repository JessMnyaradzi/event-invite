// EVENT DATE AND TIME
const eventDate = new Date("January 13, 2027 14:00:00").getTime();


// COUNTDOWN FUNCTION
function updateCountdown() {

    // GET THE CURRENT DATE AND TIME
    const now = new Date().getTime();

    // FIND THE DIFFERENCE BETWEEN THE EVENT AND NOW
    const difference = eventDate - now;


    // CHECK IF THE EVENT HAS ARRIVED
    if (difference <= 0) {

        document.getElementById("days").textContent = "0";

        document.getElementById("hours").textContent = "0";

        document.getElementById("minutes").textContent = "0";

        document.getElementById("seconds").textContent = "0";

        document.getElementById("countdown-message").textContent =
            "🎉 THE WAIT IS OVER! LET'S CELEBRATE!";

        return;
    }


    // CALCULATE DAYS
    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    // CALCULATE HOURS
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );


    // CALCULATE MINUTES
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );


    // CALCULATE SECONDS
    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    // DISPLAY THE RESULTS ON THE PAGE
    document.getElementById("days").textContent = days;

    document.getElementById("hours").textContent = hours;

    document.getElementById("minutes").textContent = minutes;

    document.getElementById("seconds").textContent = seconds;

}


// RUN THE COUNTDOWN IMMEDIATELY
updateCountdown();


// UPDATE THE COUNTDOWN EVERY SECOND
setInterval(updateCountdown, 1000);

// RSVP FORM

const rsvpForm = document.getElementById("rsvp-form");

const rsvpMessage = document.getElementById("rsvp-message");
const attendanceOptions = document.querySelectorAll(
    'input[name="attendance"]'
);

const guestsInput = document.getElementById("guests");
attendanceOptions.forEach(function(option) {

    option.addEventListener("change", function() {

        if (option.value === "no") {

            guestsInput.value = "1";
            guestsInput.disabled = true;

        } else {

            guestsInput.disabled = false;

        }

    });

});


rsvpForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const selectedAttendance =
        document.querySelector('input[name="attendance"]:checked');

    const formData = {
        name: document.getElementById("name").value,
        attendance: selectedAttendance.value,
        guests: document.getElementById("guests").value,
        message: document.getElementById("message").value
    };

    fetch("https://script.google.com/macros/s/AKfycbwSFcoT9KLJ_924UofZwF20i3tknjkaJZfOBn6Utj2bZ8z1u_mu0ifg9iMA8cVlC_tH/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData)
    });

    if (selectedAttendance.value === "yes") {

        rsvpMessage.textContent =
            "🎉 Thank you! Your RSVP has been received. We can't wait to celebrate with you!";

        rsvpForm.reset();

    } else {

        rsvpMessage.textContent =
            "💕 Thank you for letting us know. We hope to celebrate with you another time!";

        rsvpForm.reset();

        setTimeout(function() {
            rsvpMessage.textContent = "";
            showSection(0);
        }, 2500);

    }

});

// STEP-BY-STEP SECTIONS


const sections = document.querySelectorAll(".page-section");

function showSection(sectionNumber) {

    sections.forEach(function(section, index) {

        if (index === sectionNumber) {

            section.style.display = "flex";

        } else {

            section.style.display = "none";

        }

    });

}

showSection(0);