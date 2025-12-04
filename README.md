# Cute Calculator

Calculadora web desarrollada en **HTML, CSS y JavaScript**, con un
diseño basado en glassmorphism y funcionalidades avanzadas orientadas a
mejorar la experiencia de usuario. Incluye soporte para operaciones
científicas, funciones secundarias mediante un modo *Shift*, historial
interactivo, cursor editable y modo oscuro. Este proyecto está diseñado
como pieza de portafolio, demostrando manejo de interfaz, estructura
lógica y control de estado.

## Características

### Operaciones principales

-   Suma, resta, multiplicación y división.
-   Potencias (`x^y`) y raíces enésimas (`yroot`).
-   Cambio de signo y uso de paréntesis.
-   Control del cursor para editar números en cualquier posición.

### Funciones científicas

-   Funciones trigonométricas: `sin`, `cos`, `tan` (en grados).
-   Logaritmos: `log` y `ln`.
-   Raíz cuadrada (`sqrt`).
-   Factorial.
-   Protección contra condiciones inválidas (como división entre cero).

### Funciones secundarias con Shift

El botón *Shift* permite alternar hacia un conjunto adicional de
operaciones: - Trigonometría inversa: `arcsin`, `arccos`, `arctan`. -
Potencias especiales: `10^x` y `e^x`. - Operación de cuadrado (`x²`). -
Intercambio dinámico entre `x^y` y `yroot`.

### Interfaz y experiencia de usuario

-   Estilo visual glassmorphism completamente responsivo.
-   Historial con panel ocultable y opción para limpiar entradas.
-   Cursor visible con navegación mediante flechas.
-   Modo oscuro opcional, con adaptación estética completa.
-   Evita entradas inválidas como múltiples puntos decimales.

## Uso rápido

1.  Abrir el archivo `index.html` en el navegador.
2.  Utilizar el teclado en pantalla para ingresar operaciones.
3.  Usar las flechas izquierda y derecha para mover el cursor dentro de
    la expresión.
4.  Activar *Shift* para habilitar las funciones secundarias.
5.  Mostrar u ocultar el historial mediante el botón correspondiente.
6.  Emplear `DEL` para deshacer una acción y `AC` para reiniciar la
    calculadora.
7.  Activar el modo oscuro desde su botón dedicado.

## Estructura del proyecto

-   **index.html**\
    Contiene la estructura visual de la calculadora, sus botones y el
    panel de historial.

-   **style.css**\
    Define la apariencia, paleta de colores, efectos glassmorphism,
    adaptabilidad móvil y estilos del modo oscuro.

-   **script.js**\
    Implementa la lógica principal: operaciones matemáticas, manejo del
    historial, cursor, funciones de Shift, validaciones y gestión de
    eventos.

## Notas adicionales

-   Todas las funciones trigonométricas e inversas operan en **grados**.
-   Para raíces enésimas, se ingresa primero el índice y luego el valor
    (`yroot`).
-   El factorial admite únicamente enteros no negativos.
-   El historial se almacena solo durante la sesión y no persiste entre
    recargas.
