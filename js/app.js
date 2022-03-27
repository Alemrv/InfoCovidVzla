const notificationButton = document.getElementById("enableNotifications");

initializeApp();

function initializeApp() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker y Notificaciones push soportados");

    //Register the service worker
    navigator.serviceWorker
      .register("/sw.js")
      .then(swReg => {
        console.log("Service Worker registrado", swReg);

        swRegistration = swReg;
        initializeUi();
      })
      .catch(error => {
        console.error("Service Worker Error", error);
      });
  } else {
    console.warn("Mensajes push no soportados");
    notificationButton.textContent = "Mensajes push no soportados";
  }
}

function initializeUi() {
  notificationButton.addEventListener("click", () => {
    displayNotification();
  });
}

function displayNotification() {
  if (window.Notification && Notification.permission === "granted") {
    notification();
  }
  // If the user hasn't told if he wants to be notified or not
  // Note: because of Chrome, we are not sure the permission property
  // is set, therefore it's unsafe to check for the "default" value.

  else if (window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission(status => {
      if (status === "granted") {
        notification();
      } else {
        alert("Denegaste o removiste los permisos para las notificaciones.");
      }
    });
  } else {
    // If the user refuses to get notified
    alert(
      "Denegaste los permisos para recibir notificaciones. Por favor ve a la configuraciónde tu teléfono o navegador para permitir las notificaciones"
    );
  }
}

function notification() {
  const options = {
    body: "Recuerda revisar la información actualizada sobre el Covid-19",
    icon: "/img/icons/logo-32_x_32.png"
  };
  swRegistration.showNotification("Notificación de InfoCovidVzla", options);
}