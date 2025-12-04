function calcularDosis() {
  const pesoInput = document.getElementById("peso");
  const especieSelect = document.getElementById("especie");
  const patologiaSelect = document.getElementById("patologia");
  const resultadoDiv = document.getElementById("resultado");

  const peso = parseFloat(pesoInput.value);

  if (isNaN(peso) || peso <= 0) {
    resultadoDiv.innerHTML = "⚠️ Ingresa un peso válido.";
    return;
  }

  // Podrías ajustar la dosis según especie o patología más adelante
  const dosis_inicial_mg = 0.3 * peso;
  const dosis_mantenimiento_mg = 2 * peso;

  const gotas_inicial = dosis_inicial_mg / 1.5;
  const gotas_mantenimiento = dosis_mantenimiento_mg / 1.5;

  const patologiaTexto =
    patologiaSelect.options[patologiaSelect.selectedIndex].text;
  const especieTexto =
    especieSelect.options[especieSelect.selectedIndex].text;

  resultadoDiv.innerHTML =
    "🩺 Especie: <b>" + especieTexto + "</b><br>" +
    "🌿 Dosis inicial: <b>" +
    dosis_inicial_mg.toFixed(2) +
    " mg</b> (" +
    gotas_inicial.toFixed(1) +
    " gotas)<br>" +
    "🌿 Dosis de mantenimiento: hasta <b>" +
    dosis_mantenimiento_mg.toFixed(2) +
    " mg</b> (" +
    gotas_mantenimiento.toFixed(1) +
    " gotas)<br>" +
    "⏳ Frecuencia: 1–2 veces al día<br>" +
    "🧬 Patología seleccionada: <b>" +
    patologiaTexto +
    "</b>";
}

// Conectar el botón a la función cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-calcular");
  btn.addEventListener("click", calcularDosis);
});
