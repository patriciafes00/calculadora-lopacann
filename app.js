// 👉 URL de tu API en Apps Script
const API_URL =
  "https://script.google.com/macros/s/AKfycbzP_4MF_rZuTTcJqN5tu_zK29xIGNbzXSmb1Wyst1SE6i0dIkc7QSzMipC-xJt1Umbo/exec";

function enviarRegistroAnalytics(datos) {
  console.log("Enviando datos a Sheets...", datos);

  fetch(API_URL, {
    method: "POST",
    mode: "no-cors", // importante para evitar problemas de CORS
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  }).catch((error) => {
    console.error("Error enviando datos a Sheets:", error);
  });
}

function calcularDosis() {
  const pesoInput = document.getElementById("peso");
  const especieSelect = document.getElementById("especie");
  const patologiaSelect = document.getElementById("patologia");
  const regionSelect = document.getElementById("region");
  const resultadoDiv = document.getElementById("resultado");

  const peso = parseFloat(pesoInput.value);

  if (isNaN(peso) || peso <= 0) {
    resultadoDiv.innerHTML = "⚠️ Ingresa un peso válido.";
    return;
  }

  // Fórmulas de dosis
  const dosis_inicial_mg = 0.3 * peso;
  const dosis_mantenimiento_mg = 2 * peso;

  const gotas_inicial = dosis_inicial_mg / 1.5;
  const gotas_mantenimiento_mg = dosis_mantenimiento_mg / 1.5;

  const patologiaTexto =
    patologiaSelect.options[patologiaSelect.selectedIndex].text;
  const especieTexto =
    especieSelect.options[especieSelect.selectedIndex].text;
  const regionTexto =
    regionSelect.options[regionSelect.selectedIndex].text;

  resultadoDiv.innerHTML =
    "🩺 Especie: <b>" + especieTexto + "</b><br>" +
    "⚖️ Peso: <b>" + peso.toFixed(2) + " kg</b><br>" +
    "📍 Región: <b>" + regionTexto + "</b><br>" +
    "🌿 Dosis inicial: <b>" +
    dosis_inicial_mg.toFixed(2) +
    " mg</b> (" +
    gotas_inicial.toFixed(1) +
    " gotas)<br>" +
    "🌿 Dosis de mantenimiento: hasta <b>" +
    dosis_mantenimiento_mg.toFixed(2) +
    " mg</b> (" +
    gotas_mantenimiento_mg.toFixed(1) +
    " gotas)<br>" +
    "⏳ Frecuencia: 1–2 veces al día<br>" +
    "🧬 Patología seleccionada: <b>" +
    patologiaTexto +
    "</b>";

  // 👉 Enviar datos a tu hoja de cálculo
  enviarRegistroAnalytics({
    especie: especieSelect.value,
    peso: peso,
    patologia: patologiaSelect.value,
    region: regionSelect.value,   // ahora viene del selector
    tipoUsuario: "veterinario",  // seguimos fijo
    dosisInicialMg: dosis_inicial_mg,
    dosisMantenimientoMg: dosis_mantenimiento_mg
  });
}

// Botón y service worker
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-calcular");
  btn.addEventListener("click", calcularDosis);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./service-worker.js")
      .catch((error) => {
        console.error("Error al registrar el Service Worker:", error);
      });
  }
});
