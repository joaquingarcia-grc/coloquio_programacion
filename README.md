# Sistema de Liquidación de Sueldos

Sistema web desarrollado para la gestión de empleados y liquidaciones de sueldos. Permite administrar registros, realizar el seguimiento de las fechas de acreditación, consultar reportes de vencimientos y visualizar las liquidaciones mediante un calendario.

**Desarrollado por:** Joaquín García.

---

## Características principales

### Gestión de usuarios
- Registro de nuevos usuarios sin necesidad de iniciar sesión previamente.
- Inicio y cierre de sesión.
- Edición de los datos de la cuenta desde el apartado de configuración.
- Asociación de los registros con el usuario que los genera.

### Gestión de empleados
- Alta de empleados.
- Registro de denominación (apellido y nombre), correo electrónico y área.
- Modificación de información.
- Baja lógica de registros.
- Asociación de cada empleado con el usuario que lo registró.

### Gestión de liquidaciones
- Registro de liquidaciones asociadas a un empleado.
- Asociación de cada liquidación con el usuario responsable de su carga.
- Registro del monto correspondiente.
- Registro de fecha de emisión y fecha de acreditación.
- Modificación y baja lógica de liquidaciones.

### Reportes y vencimientos
- Visualización de liquidaciones próximas a su fecha de acreditación.
- Avisos anticipados de uno o dos días antes del vencimiento.
- Identificación de liquidaciones que deben acreditarse durante el día.
- Actualización de los avisos cuando una liquidación es eliminada.

### Calendario
- Visualización de liquidaciones organizadas por fecha.
- Consulta de las liquidaciones correspondientes a un día determinado.
- Identificación de liquidaciones pendientes y aquellas que ya no están pendientes.
- Consulta de registros históricos, incluyendo liquidaciones eliminadas.

### Registro de actividad
- Seguimiento de las acciones realizadas por los usuarios.
- Registro de altas, modificaciones y bajas.
- Consulta del historial de actividad mediante tablas dinámicas.

### Seguridad y privacidad
- Almacenamiento seguro de contraseñas mediante `password_hash()` de PHP.
- Gestión de sesiones mediante CodeIgniter 4.
- Separación de información por usuario.
- Cada usuario puede consultar y gestionar únicamente los registros que le pertenecen.
- Eliminación lógica (*Soft Delete*), conservando los registros dados de baja.

---

## Tecnologías utilizadas

### Backend
- PHP
- CodeIgniter 4
- MySQL

### Frontend
- HTML5
- CSS3
- JavaScript
- jQuery
- AJAX
- Bootstrap
- Bootstrap Icons
- DataTables
- DataTables Buttons

### Herramientas y funcionalidades
- CodeIgniter Sessions.
- CodeIgniter Query Builder.
- Consultas SQL y relaciones entre tablas.
- Gestión de contraseñas mediante `password_hash()`.

---

## Interfaz y componentes

El sistema utiliza DataTables para la visualización y gestión de información en los módulos de:

- Empleados.
- Liquidaciones.
- Actividad.

Los reportes de vencimientos se presentan mediante un panel lateral independiente, facilitando la consulta de avisos y próximas acreditaciones.

El calendario permite consultar la información de las liquidaciones según la fecha seleccionada.

---

## Documentación de referencia

**CodeIgniter 4**
- [Sessions](https://codeigniter.com/user_guide/libraries/sessions.html)
- [Query Builder - JOIN](https://codeigniter.com/user_guide/database/query_builder.html#join)

**DataTables**
- [Layout](https://datatables.net/reference/option/layout)
- [Buttons - Action](https://datatables.net/reference/feature/buttons.buttons.action)
- [Buttons - Usage](https://datatables.net/manual/extensions/buttons/usage)

**PHP**
- [password_hash()](https://www.php.net/manual/es/function.password-hash.php)

---

## Autor

**Joaquín García**

Proyecto desarrollado utilizando CodeIgniter 4 y tecnologías web.