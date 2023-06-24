# Tests Unitarios en React con Vitest

Vitest es una herramienta de pruebas unitarias moderna y ligera, creada por el mismo creador de Vite y Vue.js. En este documento, aprenderemos a utilizar Vitest para probar componentes React.

## Configuración

Primero, necesitas instalar las dependencias necesarias. Asegúrate de tener instalado `vitest` en tu proyecto:

```bash
npm install --save-dev vitest
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
