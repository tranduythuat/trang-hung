"use strict";

// -------------------------
// 1. Function chạy sau khi load
// -------------------------
function initPage() {
    console.log("Trang đã load xong!");
    AOS.init({
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 150, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 50, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 1000, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
}

// -------------------------
// 2. Function xử lý khi submit form
// -------------------------
async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("🚀 ~ handleFormSubmit ~ data:", data);

    const {
        name: name,
        attendance: confirm,
        message: message,
    } = data;
    console.log("🚀 ~ handleFormSubmit 2~ data:", data);

    // Thông báo khi bắt đầu gửi
    Swal.fire({
        title: "Đang gửi /Sending/...",
        text: "Vui lòng chờ trong giây lát /Please wait a moment/",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });

    const url =
        "";

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                name,
                confirm,
                message,
            }),
        });

        const result = await res.json().catch(() => ({}));
        console.log("Server response:", result);

        form.reset();

        // Thông báo thành công
        Swal.fire({
            title: "Thành công /Success/!",
            text: "Cảm ơn bạn đã gửi phản hồi, thông tin đã được gửi đến dâu rể rồi nha /Thank you for your feedback, the information has been sent to the bride and groom./",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#3f4122ff",
        });
    } catch (error) {
        console.error("Error:", error);

        // Thông báo lỗi
        Swal.fire({
            title: "Lỗi!",
            text: "OPPS! Đã xảy ra lỗi: " + error.message,
            icon: "error",
            confirmButtonText: "Thử lại",
            confirmButtonColor: "#3f4122ff",
        });
    }
}

async function toggleMusic(e) {
    const audio = document.getElementById('audio');
    const iconSvg = document.getElementById('iconSvg');
    if (!audio.src) {
        alert('Chưa có nhạc, vui lòng thêm src cho audio.');
        return;
    }
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    audio.addEventListener('play', () => {
        iconSvg.classList.add('spin');
    });
    audio.addEventListener('pause', () => {
        iconSvg.classList.remove('spin');
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initPage();

    const btn = document.getElementById('player-btn');
    btn.addEventListener('click', toggleMusic);

    const form = document.forms["rsvpForm"];
    if (form) {
        form.addEventListener("submit", handleFormSubmit);
    }
});



