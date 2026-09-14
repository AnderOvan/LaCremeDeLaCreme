# 🧁 Módulo de Autenticación, Validaciones y Contenido 

**Integrante 1:** Matías Currín

**Repositorio Principal:** [https://github.com/AnderOvan/LaCremeDeLaCreme.git](https://github.com/AnderOvan/LaCremeDeLaCreme.git)

Este repositorio/rama contiene los desarrollos y módulos del frontend asignados a mi rol en el proyecto **La Creme De La Creme**. Mi aporte se centró en la lógica de negocio cliente, validaciones de formularios con JavaScript ES6+, maquetación de autenticación y desarrollo de contenido para el blog.

---

## 🛠️ Mis Aportes y Módulos Desarrollados

### 1. Sistema de Validaciones de Negocio (`js/validaciones-tienda.js`)

Desarrollé la lógica para interceptar el evento `submit` de los formularios mediante `e.preventDefault()`, anulando la validación por defecto (`novalidate`) para brindar mensajes de error personalizados en el DOM.

* **Validación de RUN (Chile):** Aplicación de expresión regular `/^[0-9]{7,8}[0-9kK]{1}$/` para asegurar un formato de 7 a 9 caracteres numéricos/K, sin puntos ni guion.
* **Filtro de Dominios de Correo:** Implementación de verificación con `.endsWith()` para restringir correos a los dominios autorizados (`@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`).
* **Seguridad de Claves:** Control de longitud para contraseñas de entre **4 y 10 caracteres**.
* **Contador de Caracteres:** Lógica en tiempo real para el área de comentarios (máximo 500 caracteres).

---

### 2. Desplegables Dinámicos de Regiones y Comunas (`js/regiones-comunas.js`)

Diseñé el módulo geográfico dependiente para la selección de dirección en los formularios de registro de usuario:

* Estructuración del arreglo de objetos con las regiones de Chile y sus respectivas comunas.
* Lógica de actualización mediante el evento `change`: la selección de comuna permanece deshabilitada (`disabled`) hasta que se elija una región, poblando el combo de forma dinámica mediante `.find()` y creación de elementos `<option>` en el DOM.

---

### 3. Maquetación y Vistas Desarrolladas

#### 🔐 Formularios de Autenticación

* **`login.html`:** Formulario de inicio de sesión enlazado con la hoja de estilos global y las validaciones de acceso.
* **`registro.html`:** Formulario de alta de usuario con soporte de columnas dobles (`.form-row`) para los desplegables dinámicos de región/comuna.

#### 📰 Sección de Contenido / Blog

* **`detalle-blog-1.html`:** Vista de lectura completa para la entrada *"Los 5 Secretos para un Bizcocho Perfecto y Esponjoso"*.
* **`detalle-blog-2.html`:** Vista dedicada al *"Lanzamiento de Nuestra Línea Saludable y Vegan"*.
* **`detalle-blog-3.html`:** Artículo técnico sobre *"Cómo Maridar Tus Postres Preferidos con Café de Especialidad"*.

#### 🎨 Hoja de Estilos (`css/styles.css`)

* Creación de las clases de maquetación para contenedores de autenticación (`.auth-card`, `.auth-section`).
* Estilos para estados de error de formulario (`.input-error`, `.error-text`).
* Layouts responsivos con Flexbox para las lecturas de artículos del blog (`.blog-post`, `.post-header`, `.chef-quote`).

---

## 📂 Archivos Presentes en esta Rama

```text
├── css/
│   └── styles.css              # Reglas CSS agregadas para formularios y blog
├── js/
│   ├── validaciones-tienda.js   # Lógica de validación de entradas de usuario
│   └── regiones-comunas.js     # Manejo dinámico de combos Región/Comuna
├── login.html                  # Interface de inicio de sesión
├── registro.html               # Interface de creación de cuenta
├── detalle-blog-1.html         # Artículo de lectura 1
├── detalle-blog-2.html         # Artículo de lectura 2
└── detalle-blog-3.html         # Artículo de lectura 3

```

---

## 🚀 Cómo Probar mis Componentes

1. Clonar esta rama o descargar los archivos.
2. Abrir `login.html` o `registro.html` en el navegador para probar las validaciones de campo vacíos, correo restringido, contraseña y selección dependiente de Región/Comuna.
3. Navegar a `detalle-blog-1.html`, `detalle-blog-2.html` o `detalle-blog-3.html` para visualizar el diseño adaptativo y estructurado de las noticias del blog.
