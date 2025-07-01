# 🧭 Gestión Task - Frontend

Este es el **Frontend** de la aplicación "Gestión Task", una plataforma para gestionar usuarios y tareas, desarrollada con **React + Vite**. Esta interfaz proporciona una experiencia rápida, segura y modular para la administración de tareas según roles.

---

## 🚀 Tecnologías Utilizadas

- **Vite** – Herramienta de construcción ultrarrápida
- **React** – Librería principal de UI
- **React Router DOM** – Para navegación y protección de rutas
- **Axios** – Cliente HTTP para consumo de API con interceptores personalizados
- **Bootstrap / Tailwind / Custom CSS** – Diseño responsivo (según tu elección)
- **TypeScript** – Tipado estático para mayor robustez *(opcional)*

---

## 🎨 Características Principales

### 🔐 Seguridad y Accesos

- **Protección de Rutas**: Rutas privadas que verifican si el usuario está autenticado.
- **Roles de Usuario**: Interfaz dinámica según el tipo de usuario (`Administrador`, `Supervisor`, `Empleado`).
- **Persistencia de sesión**: Autenticación basada en JWT almacenado localmente.

### ⚙️ Manejo de Errores

- **Interceptors globales** con Axios para:
  - Captura de errores 401, 403, 500, etc.
  - Redirección automática al login o notificaciones amigables.
- **Modales personalizados** para mostrar mensajes de error o éxito.

### 🧩 Estructura Modular

- **Layout principal** con sidebar, navbar y área de contenido central.
- Componentes reutilizables como:
  - Formularios (`TaskForm`, `UserForm`)
  - Tablas con paginación y filtros
  - Cards, botones y modales

### 🧠 Hooks Personalizados

- Hooks para autenticación (`useAuth`), manejo de formularios (`useForm`), y control de estados globales o contextos.

### 🧭 Navegación

- Menú lateral dinámico
- Pestañas / Tabs para organización por secciones (Ej: Información, Asignación, Asistencia)
- Rutas públicas vs privadas

### ⚡ Renderizado Eficiente

- Carga condicional de componentes
- Skeleton loaders / spinners para una mejor UX mientras se cargan los datos

---

## 🖼️ Capturas de Pantalla

### 🟢 Pantalla de Login
![image](https://github.com/user-attachments/assets/33a4fe6a-0e3d-4b13-a5f8-8f849b163d68)

![image](https://github.com/user-attachments/assets/97aa32c0-9b47-44f6-8f44-1b2a3aaaba93)



### 🟢 Creación de Usuario
![image](https://github.com/user-attachments/assets/c82e64c7-549a-4d8c-b13d-b7783d164ddc)


### 🟢 Listado de Usuarios
![image](https://github.com/user-attachments/assets/f72642a7-8395-4344-b926-f9583b96dc1c)


### 🟢 Creación de Tarea
![image](https://github.com/user-attachments/assets/c65d06f6-f8e1-4cd7-a2da-d576c62c1a9e)


### 🟢 Listado de Tareas
![image](https://github.com/user-attachments/assets/689745c6-c656-48d6-8532-9a0452d75a0c)


> Asegúrate de tener estas imágenes en el directorio `/screenshots` de tu repositorio.

---

## 📦 Instalación

1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/gestion-task-frontend.git
cd gestion-task-frontend
```

2. Instala dependencias

```bash
npm install
```

3. Crea un archivo `.env` con la URL de la API:

```env
VITE_API_URL=https://localhost:7130/api
```

4. Inicia el servidor

```bash
npm run dev
```

La aplicación estará disponible en:  
🌐 `http://localhost:5173`

---

## 🧪 Pruebas

*Por implementar* – puedes integrar librerías como:

- `Jest` + `React Testing Library` para pruebas de componentes

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

## 📬 Contacto

¿Tienes preguntas o sugerencias?

📧 [nirn18345@gmail.com](mailto:nirn18345@gmail.com)
