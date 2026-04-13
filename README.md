## 1. Flujo de trabajo en Git

### Paso 1: Clonar el repo
```bash
git clone https://github.com/VeronicaOrtCastillo/5ta-Esencia.git
cd 5ta-Esencia
```

### Paso 2: Crear tu rama
```bash
git checkout main
git pull origin main
git checkout -b TU-NOMBRE-feature
```

### Paso 3: Hacer tu trabajo
Edita SOLO los archivos y secciones que te corresponden (ver seccion 6).

### Paso 4: Commits
```bash
git add .
git commit -m "DESCRIPCION DE LO REALIZADO"
```

### Paso 5: Push de tu rama
```bash
git push origin TU-NOMBRE-feature
```

### Paso 6: Crear Pull Request
Ve a GitHub > Pull requests > "New Pull Request" > base: main - compare: TU-NOMBRE-feature

**NUNCA hagas push directo a main.**

---
## 2. Estructura del proyecto

```
5ta-Esencia
├── img/
│   ├── Logo.png       <- Logo de la marca
│   ├── telefono.png   <- Imagen hero de fondo
│   ├── fondoquienessomos.jpg        <- Imagen hero de fondo
│   └── team/           <- Fotos individuales del equipo
│       ├── alex.jpg
│       ├── brenda.jpg
│       ├── chris.jpg
│       ├── vianey.jpg
│       ├── angel.jpg
│       ├── daniel.jpg
│       ├── fer.jpg
│       ├── eduardo.jpg
│       ├── vero.jpg
│       └── victor.jpg
├── index.html          <- Pagina principal
├── contactanos.html          <- Pagina de contacto
├── login.html          <- Pagina de login
├── nosotros.html          <- Pagina nosotros
├── productos.html          <- Pagina productos
├── Script.js          <- Archivo de javascript
├── Style.css          <- Archivo de css
└── README.md    <- Este archivo

```
---
## 3. Convencion de ramas

Cada integrante trabaja en su propia rama:

```
feature/quienes-somos-nombre
```

| Integrante | Ramas                         |
|------------|-------------------------------|
| Alex       | `alex-feature`  |
| Brenda     | `Brenda-feature`                      |
| Chris      | `Chris-feature` |
| Vianey     | `vianey_feature`              |
| Angel      | `Angel-feature`               |
| Daniel     | `Daniel-feature`              |
| Fer        | `FerAO-feature`               |
| Eduardo    | `eduardo-feature`|
| Vero       | `Vero/feature`                |
| Victor     | `Victor-feature`              |

---