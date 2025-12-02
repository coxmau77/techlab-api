# TechLab API - Documentación

## Descripción

API REST para gestión de productos con autenticación JWT y Firestore. Este proyecto sigue una arquitectura profesional con separación clara de responsabilidades.

## Estructura del Proyecto

```
techlab-api/
├── api/                  # Backend API
│   ├── controllers/      # Controladores
│   ├── routes/           # Rutas
│   ├── services/         # Lógica de negocio
│   ├── models/           # Modelos de datos
│   ├── middlewares/      # Middlewares
│   ├── utils/            # Utilidades
│   ├── validators/       # Validaciones
│   └── index.js          # Punto de entrada
├── config/               # Configuraciones
│   └── firebase.js       # Configuración Firebase
├── public/               # Frontend
│   ├── css/             # Estilos
│   ├── js/               # JavaScript
│   ├── pages/            # Páginas HTML
│   └── index.html        # Página principal
├── .env                  # Variables de entorno
├── .gitignore            # Archivos ignorados por Git
├── package.json           # Dependencias
├── vercel.json            # Configuración Vercel
└── README.md             # Documentación
```

## Configuración

1. **Variables de entorno**: Copiar `.env.example` a `.env` y configurar las variables necesarias.

2. **Instalar dependencias**:

```bash
npm install
```

3. **Ejecutar en desarrollo**:

```bash
npm run dev
```

4. **Ejecutar en producción**:

```bash
npm start
```

## Rutas de API

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Productos (requieren autenticación)

- `GET /api/products` - Obtener todos los productos
- `POST /api/products` - Crear nuevo producto
- `GET /api/products/:id` - Obtener producto por ID
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

## Tecnologías

- **Backend**: Node.js, Express
- **Base de datos**: Firebase Firestore
- **Autenticación**: JWT
- **Validación**: Express Validator
- **Frontend**: HTML, CSS, JavaScript vanilla

## Despliegue

Configurado para despliegue en Vercel con:

- Rutas de API bajo `/api/`
- Archivos estáticos bajo `/`
- Configuración optimizada para Node.js

## Mejoras implementadas

1. **Estructura profesional**: Separación clara de responsabilidades
2. **Manejo de errores**: Sistema robusto de manejo de errores
3. **Validación**: Validación completa de datos de entrada
4. **Seguridad**: Autenticación JWT y protección de rutas
5. **Organización**: Archivos y directorios bien organizados
