# Estructura del Proyecto

Este proyecto sigue los principios de Clean Architecture con la siguiente estructura:

```
src/
└── app/
    ├── core/                 # Núcleo de la aplicación
    │   ├── domain/          # Entidades y reglas de negocio
    │   ├── use-cases/       # Casos de uso de la aplicación
    │   └── interfaces/      # Interfaces y contratos
    ├── data/                # Capa de datos
    │   ├── repositories/    # Implementaciones de repositorios
    │   ├── datasources/     # Fuentes de datos (API, Local Storage, etc.)
    │   └── models/          # Modelos de datos y DTOs
    ├── presentation/        # Capa de presentación
    │   ├── pages/          # Componentes de páginas
    │   ├── components/     # Componentes reutilizables
    │   └── shared/         # Componentes y utilidades compartidas
    ├── infrastructure/     # Capa de infraestructura
    │   ├── http/          # Servicios HTTP
    │   ├── storage/       # Servicios de almacenamiento
    │   └── config/        # Configuraciones
    └── shared/            # Utilidades compartidas globales
        ├── constants/     # Constantes
        ├── utils/         # Funciones utilitarias
        └── types/         # Tipos y enumeraciones
```
