function mostrarSeccion(id){
    const secciones = document.querySelectorAll(
        ".diseno_contenido_principal section"
    )

    secciones.forEach(function(seccion) {
        seccion.style.display = "none"
    });

    document.getElementById(id).style.display = "block";

}



