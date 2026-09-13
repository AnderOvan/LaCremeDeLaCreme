# La Créme De La Créme

## Sistema Administrativo

Este apartado del proyecto corresponde al **módulo de administración de La Créme De La Créme**, una pastelería desarrollada como sitio web.

El objetivo de este módulo es proporcionar una interfaz administrativa desde la cual se pueda organizar y gestionar la información relacionada con los productos, pedidos y clientes de la tienda, además de disponer de opciones generales de configuración.

---

# 👤 Tercer Integrante: Sistema Administrativo

Anderson Joshua Ovando García

## Enfoque del módulo

Como tercer integrante soy el encargado del desarrollo y mantenimiento del **área administrativa** del sitio web.

Este módulo se encuentra separado de la tienda pública y utiliza una estructura de páginas independientes para cada sección del panel

(siendo 5 htmls distintos que hacen la función visual de cada panel dentro del sistema administrativo).


A futuro seré el encargado de configurar admin.js y también de crear la base de datos para LaCrémeDeLaCréme en donde probablemente se trabaje con java y sql, es por eso que actualmente no se dispone de un html o un panel encargado de inicio de sesión de los trabajadores de LaCrémeDeLaCréme ya que requiero de datos reales de usuarios para poder hacerlo funcionar.

Actualmente, el sistema administrativo está compuesto por:

- Panel principal(admin_home.html)
- Gestión de productos(panel_productos.html)
- Gestión de pedidos(panel_pedidos.html)
- Gestión de clientes(panel_clientes.html)
- Configuración(panel_config.html)

---

# 📁 Estructura del módulo administrativo

```text
LaCremeDeLaCreme-main/
│
├── admin/
│   ├── admin_home.html
│   ├── panel_productos.html
│   ├── panel_pedidos.html
│   ├── panel_clientes.html
│   └── panel_config.html
│
├── css/
│   └── admin.css
│
└── js/
    └── admin.js
```
