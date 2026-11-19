# Trabajo práctico 9 de Lenguajes IV

**Posada del Valle** es un sitio de reservas de demostración para un hotel ficticio de Salta. Universidad Católica de Salta, Ingeniería en Informática, comisión 1, 2026.

**Alumno:** Agustin Farfan

- Sitio publicado: https://agusfar45.github.io/tp9-lenguajes-iv/
- Repositorio: https://github.com/agusfar45/tp9-lenguajes-iv

## Abrir en Visual Studio Code

Abrí la carpeta del proyecto en VS Code. Con Node.js 22.12 o posterior dentro de la rama 22, o Node.js 24, ejecutá:

```sh
npm install
npm run dev
```

La terminal de Vite muestra la URL local. Para generar el sitio de producción ejecutá `npm run build`. Para revisarlo, usá `npm run preview`.

## Requisitos de la consigna

| Requisito | Implementación |
| --- | --- |
| Proyecto React | Vite, React y React Router |
| Cuatro componentes en src | `Inicio.jsx`, `Header.jsx`, `AcercaDeNosotros.jsx` y `Reservas.jsx` |
| Cuatro habitaciones | Patio, Vista al cerro, Familiar y Suite del valle |
| Rango de fechas | Calendario propio de dos meses hecho en React: primer clic marca el ingreso y el segundo la salida, con el rango resaltado. No permite días pasados (según la hora de Salta). |
| Confirmación | `window.alert` con habitación, fechas y total. El mismo mensaje queda visible en el resumen tipo ticket. |
| Imágenes | Ilustraciones SVG propias del hotel y de cada habitación en `src/assets`. |
| Estilos | CSS propio (`src/style.css`), sin librerías: marcos en forma de arco colonial, franja inspirada en el aguayo y diseño adaptable a celular. |
| Despliegue | GitHub Pages, publicado automáticamente con GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`. |

El TP5 aporta la organización de un proyecto React. Del TP6 se retoma la separación del encabezado como componente. El TP7 aporta la navegación por rutas desde el encabezado. El TP9 aplica esas ideas al dominio de reservas.

## Prueba de la reserva

1. Entrá en «Reservas» y confirmá que aparecen cuatro habitaciones.
2. Elegí «Patio» y en el calendario tocá un día de ingreso y otro dos días después. El total esperado es ARS 136.000.
3. Confirmá. Debe aparecer un aviso del navegador con la habitación, las dos fechas y el total.
4. Tocá un día anterior al ingreso: pasa a ser el nuevo ingreso. Sin salida elegida, el formulario no confirma.

La reserva es académica. El sitio no envía datos, no cobra y no registra disponibilidad real.

## Publicación

Cada push a la rama `main` ejecuta el workflow `deploy.yml`, que instala dependencias con `npm install`, compila con `npm run build` y publica la carpeta `dist` en GitHub Pages. El proyecto usa rutas con hash para permitir el acceso directo a Reservas bajo el subdirectorio de GitHub Pages. Para publicar en Vercel desde el código fuente, usá el preset Vite, el comando `npm run build` y el directorio de salida `dist`.
