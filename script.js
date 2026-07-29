// =========================
// HÄMTA ELEMENT
// =========================

const envelope = document.getElementById("envelope");
const intro = document.getElementById("intro");
const website = document.getElementById("website");
const countdown = document.getElementById("countdown");
const heartsContainer = document.getElementById("hearts");

let invitationOpened = false;
let heartInterval = null;


// =========================
// ÖPPNA KUVERTET
// =========================

function openInvitation() {
    if (invitationOpened) {
        return;
    }

    invitationOpened = true;

    envelope.classList.add("open");
    createEnvelopeHeartBurst();

    setTimeout(() => {
        intro.style.display = "none";

        website.classList.remove("hidden");
        website.classList.add("show");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 1700);
}

envelope.addEventListener("click", openInvitation);

envelope.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openInvitation();
    }
});


// =========================
// HJÄRTAN SOM KOMMER UR KUVERTET
// =========================

function createEnvelopeHeartBurst() {
    const heartBurst = document.getElementById("heartBurst");

    if (!heartBurst) {
        return;
    }

    const positions = [
        {
            x: "-140px",
            y: "-135px",
            rotation: "-25deg",
            symbol: "♡"
        },
        {
            x: "-105px",
            y: "-190px",
            rotation: "15deg",
            symbol: "♥"
        },
        {
            x: "-65px",
            y: "-145px",
            rotation: "-10deg",
            symbol: "♡"
        },
        {
            x: "-25px",
            y: "-205px",
            rotation: "20deg",
            symbol: "♥"
        },
        {
            x: "20px",
            y: "-160px",
            rotation: "-20deg",
            symbol: "♡"
        },
        {
            x: "60px",
            y: "-210px",
            rotation: "25deg",
            symbol: "♥"
        },
        {
            x: "100px",
            y: "-165px",
            rotation: "10deg",
            symbol: "♡"
        },
        {
            x: "140px",
            y: "-130px",
            rotation: "30deg",
            symbol: "♥"
        }
    ];

    positions.forEach(function (position, index) {
        const heart = document.createElement("span");

        heart.classList.add("burst-heart");
        heart.textContent = position.symbol;

        heart.style.setProperty("--x", position.x);
        heart.style.setProperty("--y", position.y);
        heart.style.setProperty(
            "--rotation",
            position.rotation
        );

        heart.style.animationDelay = `${index * 0.07}s`;

        heartBurst.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1900);
    });
}


// =========================
// NEDRÄKNING – ENDAST DAGAR
// =========================

// =========================
// NEDRÄKNING – ENDAST DAGAR
// RÄKNAS FRÅN 00.00
// =========================

const weddingDate = new Date(2026, 11, 26);
weddingDate.setHours(0, 0, 0, 0);

function updateCountdown() {
    if (!countdown) {
        return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const difference =
        weddingDate.getTime() - today.getTime();

    if (difference < 0) {
        countdown.innerHTML = `
            <div class="countdown-box days-only">
                <span>0</span>
                <small>Roj mane</small>
            </div>
        `;

        return;
    }

    const days = Math.round(
        difference / (1000 * 60 * 60 * 24)
    );

    countdown.innerHTML = `
        <div class="countdown-box days-only">
            <span>${days}</span>
            <small>Roj mane</small>
        </div>
    `;
}

updateCountdown();

setInterval(updateCountdown, 60000);


// =========================
// FALLANDE HJÄRTAN PÅ SIDAN
// =========================

const heartSymbols = [
    "♡",
    "♥",
    "🤍"
];

function createFallingHeart() {
    if (!heartsContainer) {
        return;
    }

    const heart = document.createElement("span");

    heart.classList.add("heart");

    heart.textContent =
        heartSymbols[
            Math.floor(
                Math.random() * heartSymbols.length
            )
        ];

    const randomLeft = Math.random() * 100;
    const randomSize = Math.random() * 15 + 12;
    const randomDuration = Math.random() * 5 + 6;
    const randomOpacity = Math.random() * 0.5 + 0.25;

    heart.style.left = randomLeft + "vw";
    heart.style.fontSize = randomSize + "px";
    heart.style.animationDuration =
        randomDuration + "s";
    heart.style.opacity = randomOpacity;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, randomDuration * 1000);
}


// =========================
// STARTA OCH STOPPA HJÄRTAN
// =========================

function startHeartAnimation() {
    if (heartInterval !== null) {
        return;
    }

    heartInterval = setInterval(
        createFallingHeart,
        900
    );
}

function stopHeartAnimation() {
    clearInterval(heartInterval);
    heartInterval = null;
}

document.addEventListener(
    "visibilitychange",
    function () {
        if (document.hidden) {
            stopHeartAnimation();
        } else {
            startHeartAnimation();
        }
    }
);

startHeartAnimation();
