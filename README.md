Cute Calculator

Calculadora web escrita en HTML, CSS y JavaScript, con estilo glassmorphism, funciones científicas, historial integrado, modo oscuro y funciones secundarias mediante botón shift. Diseñada como proyecto de portafolio, con énfasis en UX y manejo de estado.

Características

Operaciones básicas: +, -, *, /, potencia (x^y) y raíz enésima (yroot).

Funciones científicas: sin, cos, tan (en grados), log, ln, sqrt, factorial, cambio de signo y paréntesis.

Funciones secundarias con Shift: sin⁻¹, cos⁻¹, tan⁻¹ (en grados), 10^x, e^x, x², además de intercambio dinámico entre x^y y yroot.

Modo oscuro con botón dedicado, manteniendo paleta pastel en ambas variantes.

Historial con opciones para mostrar/ocultar y limpiar.

Cursor visible y navegación con flechas para editar números en medio de la expresión.

Entrada robusta: evita el doble punto decimal y maneja correctamente división por cero.

Diseño responsive con apariencia glassmorphism.

Uso rápido

Abre index.html en tu navegador.

Utiliza el teclado en pantalla; las flechas izquierda/derecha mueven el cursor en la expresión.

Pulsa Shift para alternar las funciones secundarias (trigonometría inversa, 10^x, e^x, x², etc.).

Usa Historial para mostrar u ocultar el registro; Limpiar borra todas las entradas.

DEL deshace la última acción; AC reinicia la calculadora.

Pulsa 🌙 para cambiar entre modo claro y modo oscuro.

Estructura del proyecto

index.html: estructura de la interfaz y botones.

style.css: estilos, animaciones y layout.

script.js: lógica del cálculo, historial, cursor, shift y controles de entrada.

Notas

Las funciones trigonométricas trabajan en grados.

Para raíces enésimas, se ingresa primero el índice y luego el radicando (yroot).

El factorial opera solo con enteros no negativos.