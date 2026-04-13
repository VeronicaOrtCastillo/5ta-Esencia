## 1. Flujo de trabajo en Git

### Paso 1: Clonar el repo
```bash
git clone https://github.com/VeronicaOrtCastillo/5ta-Esencia.git
cd Pagina-Sobre-Nosotros
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