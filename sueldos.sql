-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 17-11-2026 a las 13:32:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

-- Base de datos: `sueldos`
-- --------------------------------------------------------
create database if not exists `sueldos` default character set utf8mb4 collate utf8mb4_general_ci;
use `sueldos`;
-- --------------------------------------------------------
-- Estructura de tabla para la tabla `usuarios`
-- --------------------------------------------------------
create table if not exists `usuarios` (
  `id` int(10) unsigned not null auto_increment,
  `denominacion` varchar(100) not null,
  `correo` varchar(150) not null,
  `pswd` varchar(255) not null,
  `fecha_alta` datetime not null default current_timestamp(),
  `fecha_modificacion` datetime default null on update current_timestamp(),
  `fecha_baja` datetime default null,
  primary key (`id`)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_general_ci;
-- --------------------------------------------------------
-- Estructura de tabla para la tabla `empleados`
-- --------------------------------------------------------
create table if not exists `empleados` (
  `id` int(10) unsigned not null auto_increment,
  `id_usuario` int(10) unsigned not null,
  `denominacion` varchar(100) not null,
  `correo` varchar(150) default null,
  `area` varchar(100) default null,
  `fecha_alta` datetime not null default current_timestamp(),
  `fecha_modificacion` datetime default null on update current_timestamp(),
  `fecha_baja` datetime default null,
  primary key (`id`),
  key `id_usuario` (`id_usuario`),
  constraint `empleados_ibfk_1` foreign key (`id_usuario`) references `usuarios` (`id`)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_general_ci;
-- --------------------------------------------------------
-- Estructura de tabla para la tabla `liquidaciones`
-- --------------------------------------------------------
create table if not exists `liquidaciones` (
  `id` int(10) unsigned not null auto_increment,
  `id_empleado` int(10) unsigned not null,
  `id_usuario` int(10) unsigned not null,
  `fecha_vencimiento` date default null,
  `monto` decimal(12,2) not null,
  `fecha_alta` datetime not null default current_timestamp(),
  `fecha_modificacion` datetime default null on update current_timestamp(),
  `fecha_baja` datetime default null,
  primary key (`id`),
  key `id_empleado` (`id_empleado`),
  key `id_usuario` (`id_usuario`),
  constraint `liquidaciones_ibfk_1` foreign key (`id_empleado`) references `empleados` (`id`),
  constraint `liquidaciones_ibfk_2` foreign key (`id_usuario`) references `usuarios` (`id`)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_general_ci;
-- --------------------------------------------------------
-- Estructura de tabla para la tabla `actividades`
-- --------------------------------------------------------
create table if not exists `actividades` (
  `id` int(10) unsigned not null auto_increment,
  `id_usuario` int(10) unsigned not null,
  `tabla` varchar(50) not null,
  `id_dato` int(10) unsigned not null,
  `accion` varchar(50) not null,
  `fecha_alta` datetime not null default current_timestamp(),
  primary key (`id`),
  key `id_usuario` (`id_usuario`),
  constraint `actividades_ibfk_1` foreign key (`id_usuario`) references `usuarios` (`id`)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_general_ci;
