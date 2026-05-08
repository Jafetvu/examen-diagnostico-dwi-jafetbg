# Examen Diagnóstico DWI

## Descripción

Este proyecto es un sistema básico de gestión de productos. Cuenta con un backend desarrollado en Django que expone una API REST y un frontend construido en React. Permite la visualización, creación y consulta de detalles de productos a través de una interfaz amigable y responsiva.

## Tecnologías Utilizadas

### Frontend

- **React** (creado con Vite)
- **Bootstrap** (para el diseño, modales y responsividad)
- **Axios** (para consumo de la API REST)

### Backend

- **Python / Django**
- **Django REST Framework (DRF)** (para la creación de la API)
- **django-cors-headers** (para permitir peticiones originadas desde el frontend en React)

## Funcionalidades

- **Listado de Productos**: Visualización de todos los productos disponibles en formato de tarjetas (Cards).
- **Detalle de Producto**: Vista detallada (Modal) para consultar la información completa de un producto específico.
- **Creación de Productos**: Formulario (Modal) para agregar nuevos productos al sistema, incluyendo imágenes.
- **Comunicación Cliente-Servidor**: Consumo asíncrono de la API REST para mantener el frontend actualizado.

## Instrucciones para ejecutar el proyecto

### Prerrequisitos

- **Node.js** y **npm** instalados.
- **Python 3.x** instalado.
- **Git** instalado.

### Configuración del Backend (Django)

1. Abrir una terminal y navegar a la carpeta del backend:
   ```bash
   cd backend/diagnostico
   ```
2. Crear un entorno virtual:
   ```bash
   python -m venv venv
   ```
3. Activar el entorno virtual:
   - En Windows: `venv\Scripts\activate`
   - En macOS/Linux: `source venv/bin/activate`
4. Instalar las dependencias requeridas (asegúrate de tener instalado Django, DRF y CORS headers):
   ```bash
   pip install django djangorestframework django-cors-headers Pillow
   ```
5. Aplicar las migraciones de la base de datos:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Iniciar el servidor de desarrollo:
   ```bash
   python manage.py runserver
   ```
   El servidor backend estará corriendo en `http://127.0.0.1:8000/`.

### Configuración del Frontend (React)

1. Abrir una nueva terminal y navegar a la carpeta del frontend:
   ```bash
   cd frontend/frontend-diagnostico
   ```
2. Instalar los paquetes y dependencias de Node:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   El frontend estará disponible en la URL local que indique Vite (usualmente `http://localhost:5173/`).

## Evidencias o capturas de pantalla

Link del documento con evidencias: https://docs.google.com/document/d/1KhZo1eTVXAAtLCRHn05iDTmZbnEH8P-QGQGJxswajs4/edit?usp=sharing

## Uso de Inteligencia Artificial (IA)

**¿Se usó IA?** Sí.

**¿Para qué se usó?**
La asistencia de Inteligencia Artificial (Gemini) se utilizó como herramienta de apoyo (Pair Programming) para:

1. **Desarrollo Frontend:** Construir y estructurar componentes de React (como `ProductCard`, `ProductDetailModal`, `ProductFormModal`), implementando diseño con Bootstrap.
2. **Integración:** Consumir la API de Django usando Axios.
3. **Documentación y Versionamiento:** Generar la estructura de este archivo `README.md`
