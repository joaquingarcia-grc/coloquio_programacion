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
- XAMPP con Apache y MySQL/MariaDB.
- Un navegador web.
- Git para clonar el repositorio (opcional si se descarga el proyecto en formato ZIP).

XAMPP incluye los componentes necesarios para ejecutar el proyecto: Apache, PHP y MySQL/MariaDB.

### 1. Instalar XAMPP

Descargar el instalador desde el sitio oficial:

[https://www.apachefriends.org/](https://www.apachefriends.org/)

Seleccionar la versión correspondiente al sistema operativo. Se recomienda utilizar una distribución que incluya PHP 8.3 o superior.

#### Windows

1. Descargar el instalador de XAMPP para Windows.
2. Ejecutar el archivo descargado.
3. Seleccionar los componentes necesarios:
   - Apache.
   - MySQL.
   - PHP.
   - phpMyAdmin.
4. Seleccionar la carpeta de instalación. Por defecto:

   `C:\xampp`

5. Completar la instalación.

Para iniciar los servicios, abrir **XAMPP Control Panel** y presionar el botón `Start` correspondiente a Apache y MySQL.

#### Linux

1. Descargar el instalador de XAMPP para Linux desde el sitio oficial.
2. Abrir una terminal y ubicarse en la carpeta donde se descargó el instalador.
3. Otorgar permisos de ejecución:

```bash
chmod +x xampp-linux-x64-*-installer.run
```

4. Ejecutar el instalador:

```bash
sudo ./xampp-linux-x64-*-installer.run
```

5. Seguir los pasos del asistente de instalación.

Por defecto, XAMPP se instala en:

`/opt/lampp`

Para iniciar los servicios, se pueden utilizar cualquiera de las siguientes opciones:

**Opción 1:**

```bash
sudo /opt/lampp/xampp start
```

**Opción 2:**

```bash
sudo /opt/lampp/lampp start
```

Para detener los servicios:

**Opción 1:**

```bash
sudo /opt/lampp/xampp stop
```

**Opción 2:**

```bash
sudo /opt/lampp/lampp stop
```

### 2. Clonar el repositorio

Una vez instalado XAMPP, ubicar la carpeta `htdocs`, donde se alojarán los archivos del proyecto.

**Windows:**

Abrir una terminal y ejecutar:

```bash
cd C:\xampp\htdocs
mkdir trabajo_final_programacion_garcia_joaquin
cd trabajo_final_programacion_garcia_joaquin
```

**Linux:**

```bash
cd /opt/lampp/htdocs
sudo mkdir trabajo_final_programacion_garcia_joaquin
sudo chown -R $USER:$USER trabajo_final_programacion_garcia_joaquin
cd trabajo_final_programacion_garcia_joaquin
```

Clonar el repositorio dentro de la carpeta creada:

```bash
git clone URL_DEL_REPOSITORIO .
```

También es posible descargar el repositorio en formato ZIP, descomprimirlo y colocar su contenido dentro de la carpeta correspondiente.

**Nota:** La ruta `C:\xampp\htdocs` corresponde a una instalación habitual de XAMPP en Windows, mientras que `/opt/lampp/htdocs` corresponde a Linux. Si se utiliza una ubicación diferente, se deberán adaptar las rutas.

### 3. Iniciar los servicios

**Windows:**

Abrir XAMPP Control Panel e iniciar Apache y MySQL mediante los botones `Start`.

**Linux:**

Ejecutar cualquiera de las dos alternativas indicadas anteriormente para iniciar XAMPP.

Verificar que Apache y MySQL se encuentren funcionando correctamente.

### 4. Importar la base de datos

Ingresar a phpMyAdmin desde el navegador:

```text
http://localhost/phpmyadmin
```

Seleccionar la pestaña **Importar** y elegir el archivo `sueldos.sql`, ubicado en la raíz del proyecto.

El archivo contiene las instrucciones SQL necesarias para crear la base de datos `sueldos`, sus tablas y las relaciones correspondientes.

No es necesario crear la base de datos manualmente, ya que el propio archivo se encarga de realizar esa operación.

El archivo no incluye registros precargados, ya que los usuarios pueden registrarse desde la propia aplicación.

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

Esta configuración es válida tanto para Windows como para Linux, siempre que se mantenga el nombre de la carpeta del proyecto dentro de `htdocs`.

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

### XAMPP

- [Sitio oficial de XAMPP](https://www.apachefriends.org/)

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