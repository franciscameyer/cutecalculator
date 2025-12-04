# Cute Calculator

Calculadora web en **HTML, CSS y JavaScript** con estilo glassmorphism, funciones cientificas y un historial visible. Pensada para portafolio, con foco en UX y manejo de estado.

## Caracteristicas
- Operaciones basicas: `+`, `-`, `*`, `/`, potencia `x^y` y raiz enesima `yroot`.
- Funciones: `sin`, `cos`, `tan` (grados), `log`, `ln`, `sqrt`, factorial, cambio de signo, parentesis.
- Historial con limpiar y toggle de visibilidad.
- Cursor visible y flechas para mover e insertar digitos en medio.
- Entrada segura: evita doble punto decimal y protege division por 0.
- Diseño responsive con glassmorphism.

## Uso rapido
1. Abre `index.html` en tu navegador.
2. Usa el teclado en pantalla; flechas `←` `→` mueven el cursor.
3. Pulsa `Historial` para mostrar/ocultar; `Limpiar` borra el registro.
4. `DEL` deshace la ultima accion; `AC` resetea la calculadora.

## Estructura
- `index.html`: estructura y botones.
- `style.css`: estilos y layout.
- `script.js`: logica de calculo, historial, cursor y atajos.

## Notas
- Las funciones trigonometricas usan grados.
- Las raices enesimas se ingresan como indice y luego radicando (`yroot`).
- Factorial solo admite enteros no negativos.
