document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const phoneInput = document.getElementById("phone");

  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "auto",
    geoIpLookup: function (callback) {
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback("US"));
    },
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = iti.getNumber();

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(firstName)) {
      alert("O nome deve conter apenas letras e ter pelo menos 2 caracteres.");
      return;
    }

    if (!nameRegex.test(lastName)) {
      alert(
        "O sobrenome deve conter apenas letras e ter pelo menos 2 caracteres."
      );
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    if (!iti.isValidNumber()) {
      alert("Por favor, insira um número de telefone válido.");
      return;
    }

    window.location.href = "obrigado.html";
  });
});
