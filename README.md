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
- PHP 8.3.
- CodeIgniter 4.
- MySQL / MariaDB.

### Frontend
- HTML5.
- CSS3.
- JavaScript.
- jQuery.
- AJAX.
- Bootstrap.
- Bootstrap Icons.
- DataTables.
- DataTables Buttons.

### Herramientas y funcionalidades
- CodeIgniter Sessions.
- CodeIgniter Query Builder.
- Consultas SQL y relaciones entre tablas.
- Gestión de contraseñas mediante `password_hash()`.

---

## Instalación y configuración

### Requisitos previos

Para ejecutar el proyecto se necesita:

- PHP 8.3 o superior.
- XAMPP con Apache y MySQL, o un entorno equivalente.
- MySQL o MariaDB.
- Un navegador web.
- Git para clonar el repositorio.

### 1. Clonar el repositorio

Ubicarse en la carpeta `htdocs` de XAMPP y crear una carpeta para el proyecto:

```bash
cd /opt/lampp/htdocs
mkdir trabajo_final_programacion_garcia_joaquin
cd trabajo_final_programacion_garcia_joaquin
```

Clonar el repositorio dentro de la carpeta creada:

```bash
git clone URL_DEL_REPOSITORIO .
```

**Nota:** La ruta `/opt/lampp/htdocs` corresponde a una instalación habitual de XAMPP en Linux. En otros sistemas operativos, se deberá utilizar la ubicación correspondiente de `htdocs`.

### 2. Iniciar XAMPP

Iniciar los servicios de Apache y MySQL desde el panel de control de XAMPP.

### 3. Crear la base de datos

Ingresar a phpMyAdmin desde el navegador:

```text
http://localhost/phpmyadmin
```

Crear una nueva base de datos con el nombre:

```text
sueldos
```

Se puede utilizar MySQL o MariaDB como motor de base de datos.

### 4. Importar la estructura SQL

Seleccionar la base de datos `sueldos`, ingresar en la pestaña **Importar** y seleccionar el archivo `sueldos.sql`, ubicado en la raíz del proyecto.

El archivo contiene la estructura necesaria para crear las tablas y relaciones del sistema. No incluye registros precargados, ya que los usuarios pueden registrarse desde la propia aplicación.

### 5. Configurar la conexión a la base de datos

Abrir el archivo:

`app/Config/Database.php`

Modificar los parámetros de conexión según la configuración local:

```php
public array $default = [
    'DSN'      => '',
    'hostname' => 'localhost',
    'username' => 'root',
    'password' => '',
    'database' => 'sueldos',
    'DBDriver' => 'MySQLi',
];
```

Los valores de usuario, contraseña y servidor deben coincidir con la configuración de MySQL o MariaDB del entorno utilizado.

### 6. Configurar la URL del proyecto

Abrir el archivo:

`app/Config/App.php`

Buscar la propiedad `$baseURL` y establecer la siguiente dirección:

```php
public string $baseURL = 'http://localhost/trabajo_final_programacion_garcia_joaquin/public/';
```

Esta configuración corresponde al nombre de la carpeta utilizada al clonar el repositorio dentro de `htdocs`.

Si se modifica el nombre de la carpeta o su ubicación, también deberá actualizarse esta dirección.

### 7. Acceder al sistema

Una vez completados los pasos anteriores, ingresar desde el navegador:

```text
http://localhost/trabajo_final_programacion_garcia_joaquin/public/
```

Desde la pantalla inicial se podrá registrar un usuario y comenzar a utilizar el sistema.

---

## Uso del sistema

El sistema permite realizar las siguientes operaciones:

1. **Registro e inicio de sesión:** crear una cuenta y acceder al sistema.
2. **Empleados:** registrar, consultar, modificar y dar de baja empleados.
3. **Liquidaciones:** cargar liquidaciones, asociarlas a empleados y establecer sus fechas de emisión y acreditación.
4. **Reportes:** consultar avisos de próximas acreditaciones y vencimientos.
5. **Calendario:** visualizar las liquidaciones según sus fechas y consultar registros históricos.
6. **Actividad:** consultar el historial de acciones realizadas dentro del sistema.
7. **Configuración:** modificar los datos de la cuenta del usuario.

Cada usuario administra exclusivamente los registros asociados a su cuenta.

---

## Interfaz y componentes

El sistema utiliza DataTables para la visualización y gestión de información en los módulos de:

- Empleados.
- Liquidaciones.
- Actividad.

Los reportes de vencimientos se presentan mediante un panel lateral independiente, que facilita la consulta de avisos y próximas acreditaciones.

El calendario cuenta con una vista propia que permite visualizar las liquidaciones organizadas por fecha, consultar los registros de un día determinado e identificar su estado.

---

## Documentación de referencia

### CodeIgniter 4
- [Sessions](https://codeigniter.com/user_guide/libraries/sessions.html)
- [Query Builder - JOIN](https://codeigniter.com/user_guide/database/query_builder.html#join)

### DataTables
- [Layout](https://datatables.net/reference/option/layout)
- [Buttons - Action](https://datatables.net/reference/feature/buttons.buttons.action)
- [Buttons - Usage](https://datatables.net/manual/extensions/buttons/usage)

### PHP
- [password_hash()](https://www.php.net/manual/es/function.password-hash.php)

---

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consultar el archivo `LICENSE` para conocer sus condiciones de uso, modificación y distribución.

---

## Información académica

- **Autor:** Joaquín García.
- **Asignatura:** Programación III.
- **Carrera:** Tecnicatura Superior en Análisis y Desarrollo de Software.
- **Institución:** Instituto Superior Gaspar L. Benavento.

Proyecto desarrollado con fines académicos.