La Créme De La Créme

Descripción

La Créme De La Créme es un sitio web para una pastelería, desarrollado como proyecto académico de Desarrollo Full Stack II.

La versión actual corresponde a una implementación principalmente Front-End, construida con:

HTML5 para la estructura de las vistas.

CSS3 para estilos y presentación.

JavaScript para validaciones, interacción, catálogo, carrito y panel administrativo.

localStorage para persistir información del carrito y datos administrados desde el navegador.

En esta etapa no se utiliza un backend, una base de datos ni autenticación real. Estas funcionalidades quedan para etapas posteriores del proyecto.

👥 Distribución del trabajo

El proyecto se desarrolló de forma colaborativa mediante ramas y commits individuales. Cada integrante tuvo un área principal de responsabilidad.

👤 Alejandro Rodriguez — Tienda pública e interfaces informativas

Área principal: vistas públicas, información de la pastelería, formularios de usuario y validaciones de tienda.

Responsabilidades

Desarrollo y mantenimiento de las vistas informativas y de acceso de la tienda.

Página principal (index.html).

Página de información de la empresa (nosotros.html).

Sección de blog (blog.html).

Formulario de contacto (contacto.html).

Inicio de sesión (login.html).

Registro de usuarios (registro.html).

Validaciones mediante js/validaciones-tienda.js.

Integración de datos de regiones y comunas para formularios de registro.

Apoyo en la estructura visual y navegación general de la tienda.

Validaciones y lógica asociada

Entre las validaciones planteadas para esta sección se encuentran:

Formato de correo electrónico.

Validación del RUN.

Restricciones de contraseña.

Validación del formulario de contacto.

Carga relacionada con regiones y comunas.

👤 Matias Currin — Catálogo, carrito y persistencia

Área principal: catálogo de productos y lógica de compra del sitio público.

Responsabilidades

Desarrollo y mantenimiento del catálogo (productos.html).

Desarrollo del detalle de producto (detalle-producto.html).

Desarrollo del carrito (carrito.html).

Implementación de js/carrito.js.

Manejo del arreglo de productos mediante JavaScript.

Renderizado dinámico de los productos.

Agregar productos al carrito.

Modificar cantidades.

Eliminar productos.

Cálculo de subtotales y totales.

Persistencia del carrito mediante localStorage.

Uso de JSON.stringify() y JSON.parse() para guardar y recuperar la información.

Organización de los recursos gráficos utilizados por el catálogo.

Esta sección representa la lógica principal de compra de la tienda Front-End.

👤 Anderson Ovando — Sistema administrativo y mantenedores

Área principal: desarrollo del panel administrativo de la pastelería.

Responsabilidades

Diseño y desarrollo del área administrativa.

Panel principal (admin/admin_home.html).

Gestión de productos (admin/panel_productos.html).

Gestión de pedidos (admin/panel_pedidos.html).

Gestión de clientes (admin/panel_clientes.html).

Configuración (admin/panel_config.html).

Estilos específicos del administrador mediante css/admin.css.

Lógica administrativa mediante js/admin.js.

Gestión de clientes mediante js/clientes.js.

Gestión de pedidos mediante js/pedidos.js.

Creación, edición y eliminación de registros en los módulos correspondientes.

Validaciones adicionales para operaciones administrativas.

Persistencia de información administrativa mediante localStorage cuando corresponde.

El área administrativa se mantiene separada de la tienda pública y está preparada para evolucionar posteriormente hacia un sistema conectado a backend y base de datos.

🤝 Trabajo transversal del equipo

Aunque cada integrante tuvo un área principal, existen componentes que fueron desarrollados y coordinados de manera conjunta:

Diseño visual y consistencia: mantener una identidad visual común para las distintas páginas.

CSS global: css/styles.css como hoja principal de estilos de la tienda pública.

GitHub: uso de ramas, commits descriptivos y colaboración mediante el repositorio.

ERS: elaboración progresiva de los requerimientos del sistema.

Video explicativo: presentación grupal del funcionamiento del proyecto.

El historial de GitHub permite identificar las contribuciones individuales de cada integrante.

🛒 Funcionalidades actuales

Tienda pública

Las principales vistas disponibles son:

index.html — Inicio.

productos.html — Catálogo.

detalle-producto.html — Detalle de producto.

carrito.html — Carrito de compras.

registro.html — Registro de usuario.

login.html — Inicio de sesión.

contacto.html — Contacto.

nosotros.html — Información de la pastelería.

blog.html — Blog.

Funcionalidades

Navegación entre las vistas principales.

Catálogo dinámico.

Visualización del detalle de un producto.

Agregado y gestión de productos en el carrito.

Persistencia del carrito mediante localStorage.

Validaciones JavaScript para formularios.

Carga de regiones y comunas.

Carrusel de contenido en la página principal.

Área administrativa

Las vistas actuales son:

admin/admin_home.html

admin/panel_productos.html

admin/panel_pedidos.html

admin/panel_clientes.html

admin/panel_config.html

El área administrativa permite trabajar con información de productos, pedidos y clientes mediante JavaScript y localStorage en las funcionalidades que ya se encuentran implementadas.

📁 Organización actual del proyecto

LaCremeDeLaCreme-main/
│
├── admin/
│   ├── admin_home.html
│   ├── panel_clientes.html
│   ├── panel_config.html
│   ├── panel_pedidos.html
│   └── panel_productos.html
│
├── css/
│   ├── admin.css
│   └── styles.css
│
├── js/
│   ├── admin.js
│   ├── carrito.js
│   ├── carrusel-home.js
│   ├── clientes.js
│   ├── pedidos.js
│   ├── productos.js
│   ├── regiones-comunas.js
│   └── validaciones-tienda.js
│
├── img/
│   ├── equipo/
│   └── productos/
│
├── index.html
├── productos.html
├── detalle-producto.html
├── carrito.html
├── registro.html
├── login.html
├── contacto.html
├── nosotros.html
├── blog.html
└── README.md

🧩 JavaScript y responsabilidades

Archivo

Responsabilidad

js/carrito.js

Catálogo dinámico, carrito, cantidades, eliminación, totales y persistencia con localStorage.

js/productos.js

Lógica asociada a la vista del catálogo.

js/carrusel-home.js

Funcionamiento del carrusel de la página principal.

js/validaciones-tienda.js

Validaciones de registro, login y contacto.

js/regiones-comunas.js

Datos y carga de regiones/comunas.

js/admin.js

Navegación y gestión de productos del panel administrativo.

js/clientes.js

Gestión de clientes y sus validaciones/persistencia.

js/pedidos.js

Gestión y actualización de pedidos.

🎨 CSS

css/styles.css

Hoja de estilos principal de la tienda pública.

css/admin.css

Hoja de estilos específica del área administrativa.

💾 Persistencia con localStorage

El proyecto utiliza localStorage como mecanismo de persistencia durante esta etapa Front-End.

JavaScript
    ↓
JSON.stringify()
    ↓
localStorage
    ↓
JSON.parse()
    ↓
Estado restaurado

Esto permite conservar determinada información entre recargas del navegador sin utilizar todavía una base de datos.

✅ Validaciones

Además de las validaciones nativas de HTML, el proyecto incorpora validaciones mediante JavaScript.

Entre ellas se encuentran:

Validación de correos.

Validación de contraseñas.

Validación de datos de contacto.

Validación de productos administrativos.

Validación de clientes.

Restricciones de precio y stock.

🚀 Ejecución

No se necesita un backend para ejecutar la versión actual.

Se recomienda utilizar un servidor local como Live Server en Visual Studio Code.

Abrir el proyecto en Visual Studio Code.

Abrir index.html mediante Live Server.

Navegar por la tienda pública y el área administrativa.

📌 Estado del proyecto

Implementado

Estructura general de la tienda.

Navegación principal.

Catálogo y detalle de productos.

Carrito con localStorage.

Validaciones de formularios.

Área administrativa.

Gestión dinámica de productos.

Gestión dinámica de clientes.

Gestión dinámica de pedidos.

Estilos para tienda y administración.

Pendiente / próximas etapas

Backend.

Base de datos.

Autenticación real y control de sesiones.

Conexión de los mantenedores a una base de datos.

Ampliación de funcionalidades administrativas.

Revisión y ampliación de contenidos secundarios del sitio.

🌿 Trabajo con GitHub

El proyecto se desarrolla mediante ramas y commits descriptivos.

Cada integrante mantiene sus aportes identificables en el historial del repositorio.

Ejemplos de commits:

feat: agrega vista de productos
feat: implementa persistencia del carrito
feat: agrega panel administrativo de clientes
fix: corrige navegación del panel

El repositorio se utiliza como evidencia del trabajo colaborativo y del proceso de desarrollo.

📚 Contexto académico

Proyecto desarrollado para la asignatura Desarrollo Full Stack II (DSY1104).

La etapa actual corresponde a una primera versión Front-End del sistema, utilizando HTML, CSS, JavaScript y localStorage, mientras que las tecnologías de backend, base de datos y autenticación real se contemplan para etapas posteriores.
