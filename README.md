# Cute Calculator

Calculadora web en **HTML, CSS y JavaScript** con estilo glassmorphism, funciones cientificas, historial visible, modo oscuro y funciones secundarias con shift. Pensada para portafolio, con foco en UX y manejo de estado.

## Caracteristicas
- Operaciones basicas: `+`, `-`, `*`, `/`, potencia `x^y` y raiz enesima `yroot`.
- Funciones: `sin`, `cos`, `tan` (grados), `log`, `ln`, `sqrt`, factorial, cambio de signo, parentesis.
- Shift para funciones secundarias: `sin⁻¹`, `cos⁻¹`, `tan⁻¹` (grados), `10^x`, `e^x`, `x²`, intercambia `x^y` y `yroot`.
- Modo oscuro con boton dedicado; ajustes pastel para ambas paletas.
- Historial con limpiar y toggle de visibilidad.
- Cursor visible y flechas para mover e insertar digitos en medio.
- Entrada segura: evita doble punto decimal y protege division por 0.
- Diseno responsive con glassmorphism.

## Uso rapido
1. Abre `index.html` en tu navegador.
2. Usa el teclado en pantalla; flechas izquierda/derecha mueven el cursor.
3. Pulsa `shift` para alternar funciones secundarias (trig inversa, `10^x`, `e^x`, `x²`, etc.).
4. Pulsa `Historial` para mostrar/ocultar; `Limpiar` borra el registro.
5. `DEL` deshace la ultima accion; `AC` resetea la calculadora.
6. Pulsa `🌙` para alternar modo oscuro/claro.

## Estructura
- `index.html`: estructura y botones.
- `style.css`: estilos y layout.
- `script.js`: logica de calculo, historial, cursor y atajos.

## Notas
- Las funciones trigonometricas usan grados.
- Las raices enesimas se ingresan como indice y luego radicando (`yroot`).
- Factorial solo admite enteros no negativos.
