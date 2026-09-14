/* ==========================================================================
   REGIONES Y COMUNAS DE CHILE (regiones-comunas.js)
   Carga dinámica de combos dependientes para formularios
   ========================================================================== */

const regionesYComunas = [
    {
        region: "Región Metropolitana de Santiago",
        comunas: ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "La Florida", "Puente Alto", "San Bernardo"]
    },
    {
        region: "Región de Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Concón", "Quilpué", "Villa Alemana", "San Antonio"]
    },
    {
        region: "Región del Biobío",
        comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Los Ángeles"]
    },
    {
        region: "Región de La Araucanía",
        comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"]
    },
    {
        region: "Región de Los Lagos",
        comunas: ["Puerto Montt", "Puerto Varas", "Osorno", "Castro"]
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

    if (!regionSelect || !comunaSelect) return;

    // 1. Cargar el listado de regiones al select
    regionesYComunas.forEach(item => {
        const option = document.createElement('option');
        option.value = item.region;
        option.textContent = item.region;
        regionSelect.appendChild(option);
    });

    // 2. Evento al cambiar la selección de Región
    regionSelect.addEventListener('change', (e) => {
        const regionSeleccionada = e.target.value;

        // Reiniciar y deshabilitar el combo de comunas
        comunaSelect.innerHTML = '<option value="">Seleccione una comuna</option>';
        comunaSelect.disabled = true;

        if (regionSeleccionada !== '') {
            const regionData = regionesYComunas.find(r => r.region === regionSeleccionada);

            if (regionData && regionData.comunas) {
                regionData.comunas.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
                });
                comunaSelect.disabled = false;
            }
        }
    });
});