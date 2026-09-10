Para que los **3 integrantes** tengan una carga de trabajo equivalente, mantengan orden en GitHub y aseguren evidencias de aportes individuales para la evaluación, aquí tienes la reorganización de los archivos de tu proyecto **`pasteleria-dss/`** distribuida por módulos de responsabilidad:

---

### 👤 **Integrante 1: Tienda Pública e Informativas (Validaciones de Usuarios y Contacto)**
**Enfoque:** Vistas informativas del cliente, autenticación y contacto.

* **Páginas HTML a su cargo (8 vistas):**
  * `index.html` *(Página principal / Home)*
  * `nosotros.html` *(Información de la pastelería y equipo)*
  * `blog.html` *(Sección de noticias)*
  * `detalle-blog-1.html` y `detalle-blog-2.html` *(Lecturas de noticias)*
  * `contacto.html` *(Formulario de consultas)*
  * `login.html` *(Inicio de sesión)*
  * `registro.html` *(Registro de nuevos clientes)*
* **Archivo JS a su cargo:**
  * **`js/validaciones-tienda.js`**: Lógica de validación para los formularios de Registro, Login y Contacto.
    * Validar formato de correo restringido a `@duoc.cl`, `@profesor.duoc.cl` o `@gmail.com`.
    * Validar RUN sin puntos ni guión (7 a 9 caracteres).
    * Validar contraseñas (4 a 10 caracteres) y comentarios de contacto.
    * Conectar `js/regiones-comunas.js` en la vista de registro.

---

### 👤 **Integrante 2: Módulo Catálogo, Carrito de Compras y LocalStorage**
**Enfoque:** Lógica del negocio principal de la pastelería y persistencia de datos.

* **Páginas HTML a su cargo (3 vistas):**
  * `productos.html` *(Catálogo general de pasteles)*
  * `detalle-producto.html` *(Vista detallada del pastel seleccionado)*
  * `carrito.html` *(Resumen de compra)*
* **Archivo JS y Recursos a su cargo:**
  * **`js/carrito.js`**: Core dinámico de la tienda.
    * Arreglo de objetos JavaScript con los productos de la pastelería.
    * Funciones para renderizar los productos en pantalla y añadir/modificar/eliminar ítems del carrito.
    * Lógica de conservación de datos mediante **`localStorage`** usando `JSON.stringify()` y `JSON.parse()`.
  * Organizar imágenes de la carpeta `img/productos/` y `img/logo.png`.

---

### 👤 **Integrante 3: Sistema Administrativo y Mantenedores**
**Enfoque:** Panel de control privado para la gestión de productos y usuarios de la pastelería.

* **Páginas HTML a su cargo (7 vistas):**
  * `admin-home.html` *(Dashboard principal con menú vertical)*
  * `admin-productos.html` *(Tabla/Listado de productos)*
  * `admin-nuevo-producto.html` y `admin-editar-producto.html` *(Formularios de productos)*
  * `admin-usuarios.html` *(Tabla/Listado de usuarios registrados)*
  * `admin-nuevo-usuario.html` y `admin-editar-usuario.html` *(Formularios de usuarios y roles)*
* **Archivo JS a su cargo:**
  * **`js/validaciones-admin.js`**: Validaciones avanzadas para la administración.
    * **Productos:** Código de producto (mínimo 3 caracteres), nombre, precio (mínimo 0), stock entero y alerta de stock crítico.
    * **Usuarios:** RUN sin puntos/guión, nombres, correo permitido, selección de roles (*Administrador, Vendedor, Cliente*) y carga dinámica de regiones y comunas asociando `js/regiones-comunas.js`.

---

### 🤝 **Tareas Transversales (Coordinación entre los 3)**

1. **Estilos CSS Globale (`css/styles.css`)**:
   * Definir juntos en el primer día la paleta de colores de la pastelería, tipografías y barra de navegación responsiva para que todas las páginas se vean unificadas.
2. **Historial de Commits en GitHub**:
   * Cada estudiante debe realizar sus propios *commits* descriptivos desde su cuenta (ej: `feat: agrega formulario de registro` o `feat: implementa localstorage en carrito`), ya que el docente evaluará los aportes individuales en el repositorio.
3. **Documento ERS (Versión 1)**:
   * Redactar en conjunto la especificación de requerimientos y herramientas del software.
4. **Video Explicativo (Google Drive)**:
   * Grabar un video grupal donde los 3 muestren el funcionamiento del sitio y subirlo a Google Drive con permisos de lectura.

---

*Ten presente que la fecha límite de entrega en la plataforma AVA es el **lunes 14 de septiembre de 2026 antes de las 11:00 AM**, y la entrega en AVA es estrictamente **individual** registrando el enlace del repositorio y del video. En la Semana 06 se realizará la interrogación escrita donde cada uno responderá sobre su código.*

🧁 ¿Te gustaría que preparemos el archivo `js/regiones-comunas.js` o el código base para la validación del RUN y correos restringidos?
