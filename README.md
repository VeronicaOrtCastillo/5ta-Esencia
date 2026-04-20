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

### Paso 7: Traer actualizaciones de GitHub a Visual Code
```bash
git checkout main
git pull origin main
git checkout TU-NOMBRE-feature
git merge main
```
---
## 2. Estructura del proyecto

```
5ta-Esencia
├── img/
│   ├── Logo.png                     <- Logo de la marca
│   ├── telefono.png                 <- Imagen hero de fondo (pagina contactanos)
│   ├── fondoquienessomos.jpg        <- Imagen hero de fondo (pagina nosotros)
│   ├── carrito.png                  <- Imagen carrito de compras (barra de navegacion)
│   │
│   ├── Productos/                   <-Imganes de productos
│   │   ├── 1. Rioja Reserva (vino tinto).PNG
│   │   ├── 2. Ribera del Duero (vino tinto).PNG
│   │   ├── 3. Chianti Classico (vino tinto).PNG
│   │   ├── 4. Albariño (vino blanco).PNG
│   │   ├── 5. Sweet Red (vino dulce).PNG
│   │   ├── For every ocassion (botella de vino con cajita colgante).png
│   │   ├── Individual Grazing Box.jpeg
│   │   ├── Kit pareja.jpeg
│   │   ├── Tabla basica.png
│   │   └── Tabla picnic.jpeg
│   │
│   └── team/                        <- Fotos individuales del equipo
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
│   
├── js/
│   ├── index.js                     <- Index principal de javascript
│   └── itemsController              <- Js para pagina productos
│   
├── index.html                       <- Pagina principal
├── contactanos.html                 <- Pagina de contacto
├── login.html                       <- Pagina de login
├── nosotros.html                    <- Pagina nosotros
├── productos.html                   <- Pagina productos
├── carrito.html                     <- Pagina carrito
├── style.css                        <- Archivo de css
└── README.md                        <- Este archivo

```
---
## 3. Convencion de ramas

Cada integrante trabaja en su propia rama:

```
Nombre-feature
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