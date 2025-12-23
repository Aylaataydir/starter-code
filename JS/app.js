
// const inputs = document.querySelectorAll("#name, #email, #message");
// const submit = document.querySelector(".contact-btn")


// inputs.forEach((item) => {
//     const err = item.parentElement.querySelector(".error-message");

//     item.addEventListener("focus", () => {

//         document.querySelector(".active")?.classList.remove("active")
//         item.classList.add("active")
//     })

//     item.addEventListener("blur", () => {
//         item.classList.remove("active")
//     })


//     if (item.id === "email") {

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         item.addEventListener("input", () => {
//             if (emailRegex.test(item.value)) {
//                 if (err) err.style.display = "none";
//             }
//         })

//         item.addEventListener("blur", () => {



//             if (item.value.trim() && !emailRegex.test(item.value)) {
//                 err.textContent = "Please enter a valid email."
//                 err.style.display = "block"


//             } else {
//                 if (err) err.style.display = "none";
//             }

//         })

//     }


// })



// submit.addEventListener("click", () => {

//     inputs.forEach((item) => {

//         const err = item.parentElement.querySelector(".error-message");
//         const value = item.value.trim();

//         if (!value) {
//             err.style.display = "block"
//             item.style.border = "2px solid red"
//         }


//         item.addEventListener("click", () => {
//             if (err) err.style.display = "none"
//             item.style.border = "none"

//         })

//     })
// })




const inputs = document.querySelectorAll("#name, #email, #message");
const submit = document.querySelector(".contact-btn");

// Tüm input'lar için event listener'lar
inputs.forEach((item) => {
    const err = item.parentElement.querySelector(".error-message");

    // Focus: active border ekle ve hata gizle
    item.addEventListener("focus", () => {
        document.querySelector(".active")?.classList.remove("active");
        item.classList.add("active");
        if (err) err.style.display = "none";
        item.style.border = "none"; // focus'ta red border'ı kaldır
    });

    // Blur: active border kaldır
    item.addEventListener("blur", () => {
        item.classList.remove("active");
    });

    // Input yazarken: hata gizle ve border temizle
    // item.addEventListener("input", () => {
    //     if (err && item.value.trim()) {
    //         err.style.display = "none";
    //         item.style.border = "none"; // yazarken red border kaldır
    //     }
    // });

    // Email spesifik doğrulama
    if (item.id === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        item.addEventListener("blur", () => {
            const value = item.value.trim();

            if (value && !emailRegex.test(value)) {
                // Email geçerli değil
                err.textContent = "Please enter a valid email.";
                err.style.display = "block";
                item.style.border = "2px solid red";
            } else if (value) {
                // Email geçerli
                if (err) err.style.display = "none";
                item.style.border = "none";
            }
        });
    }
});

// Submit button
submit.addEventListener("click", (e) => {
    let hasError = false;

    inputs.forEach((item) => {
        const err = item.parentElement.querySelector(".error-message");
        const value = item.value.trim();

        // Boş kontrol
        if (!value) {
            err.textContent = "This field is required";
            err.style.display = "block";
            item.style.border = "2px solid red";
            hasError = true;
        } else {
            // Email ek doğrulama
            if (item.id === "email") {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    err.textContent = "Please enter a valid email.";
                    err.style.display = "block";
                    item.style.border = "2px solid red";
                    hasError = true;
                } else {
                    // Email başarılı
                    if (err) err.style.display = "none";
                    item.style.border = "2px solid #5FB4A2"; // yeşil border
                }
            } else {
                // Name veya message başarılı
                if (err) err.style.display = "none";
                item.style.border = "2px solid #5FB4A2"; // yeşil border
            }
        }
    });

    // Hata varsa form gönderişini engelle
    if (hasError) {
        e.preventDefault();
    } else {
        // Başarılı: konsola yaz
        console.log("✅ Form başarıyla gönderildi!");
        // Opsiyonel: formu temizle ve border'ı kaldır
        // inputs.forEach(item => item.style.border = "none");
        // document.querySelector(".contact__me__form").reset();
    }
});
