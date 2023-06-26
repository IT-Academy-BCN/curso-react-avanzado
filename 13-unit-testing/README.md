# Tests Unitarios en React con Vitest y React Testing Library

En este modulo profundizaremos en la importancia y la práctica de los test unitarios, un proceso en el que verificamos la funcionalidad de los componentes individuales de una aplicación React de forma aislada. Los test unitarios son una parte fundamental para mantener la calidad del código, garantizar la confiabilidad de la aplicación y detectar errores al principio del ciclo de desarrollo.

Usaremos un conjunto de herramientas necesarias para poder ejecutar los tests, que son:

- React Testing Library: una herramienta liviana pero efectiva que brinda una perspectiva más centrada en el usuario para los test. Veremos como hacer que nuestras aplicaciones sean más accesibles y a desarrollar tests que reflejen las interacciones de los usuarios en el mundo real.
- Vitest: un ejecutor de pruebas de JavaScript moderno y rápido diseñado para Vite. Los beneficios de Vitest, como el soporte ESM nativo, el aislamiento de tests y su capacidad para realizar tests en paralelo, lo hacen perfecto para el curso.
- JSDOM: Para ser capazces de ejecutar test unitarios y reproducir las interacciones de usuario debemos usar un navegador, en este caso utilizaremos JSDOM, un navegador sin interfaz basado en JavaScript que simula el entorno de un navegador. JSDOM proporcionará la plataforma para renderizar nuestros componentes y realizar pruebas, imitando operaciones en un entorno de navegador real.


## Configuración

Primero, necesitas instalar las dependencias necesarias. Asegúrate de tener instalado `vitest` y `@testing-library/react` en tu proyecto:

```bash
npm install --save-dev vitest @testing-library/react
```

Para correr los tests, puedes agregar un script a tu `package.json`:

```json
"scripts": {
  "test": "vitest"
}
```

## Ejemplos de Tests

### 1. Test del Componente `Counter`

Imagina que tienes el siguiente componente de contador:

```jsx
// Counter.js
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default Counter;
```

Aquí tienes un test unitario para este componente:

```jsx
// Counter.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('renders Counter and increases count on click', () => {
  render(<Counter />);

  const counterText = screen.getByText(/You clicked 0 times/i);
  expect(counterText).toBeInTheDocument();

  const button = screen.getByText(/Click me/i);
  fireEvent.click(button);

  const updatedCounterText = screen.getByText(/You clicked 1 times/i);
  expect(updatedCounterText).toBeInTheDocument();
});
```

### 2. Test del Componente `Greeting`

Ahora, imaginemos otro componente simple llamado `Greeting`:

```jsx
// Greeting.js
import React from 'react';

const Greeting = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Greeting;
```

Aquí está cómo podrías escribir un test para este componente:

```jsx
// Greeting.test.js
import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('renders Greeting with provided name', () => {
  render(<Greeting name="John" />);

  const greetingText = screen.getByText(/Hello, John!/i);
  expect(greetingText).toBeInTheDocument();
});
```

Con estos ejemplos, deberías poder comenzar a escribir test unitarios para tus propios componentes React. Recuerda que los tests unitarios deben centrarse en el comportamiento de tus componentes desde la perspectiva del usuario (por ejemplo, lo que verían e interactuarían), en lugar de los detalles de implementación. ¡Feliz prueba!
