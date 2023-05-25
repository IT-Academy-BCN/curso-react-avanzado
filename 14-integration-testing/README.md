# Tests de Integración en React

Los tests de integración verifican que diferentes unidades de software, o en nuestro caso, componentes de React, funcionen correctamente juntas. A diferencia de los tests unitarias, que prueban componentes de forma aislada, los tests de integración prueban la interacción entre componentes.

Para los tests de integración en React, utilizaremos React Testing Library. Esta biblioteca está diseñada para simular el comportamiento del usuario y proporciona herramientas para interactuar con los componentes tal como lo haría un usuario.

## Configuración

## Ejemplo de Test de Integración

Supón que tenemos un componente `App` que renderiza un `Counter` y un `Greeting` componentes. Queremos probar que estos componentes funcionan correctamente juntos.

Aquí está el componente `App`:

```jsx
// App.js
import React from 'react';
import Counter from './Counter';
import Greeting from './Greeting';

const App = () => (
  <div>
    <Counter />
    <Greeting name="John" />
  </div>
);

export default App;
```

Y aquí está el test de integración:

```jsx
// App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('App correctly renders and interacts with Counter and Greeting', () => {
  render(<App />);

  // Counter tests
  const counterText = screen.getByText(/You clicked 0 times/i);
  expect(counterText).toBeInTheDocument();

  const button = screen.getByText(/Click me/i);
  fireEvent.click(button);

  const updatedCounterText = screen.getByText(/You clicked 1 times/i);
  expect(updatedCounterText).toBeInTheDocument();

  // Greeting tests
  const greetingText = screen.getByText(/Hello, John!/i);
  expect(greetingText).toBeInTheDocument();
});
```

En este test, renderizamos el componente `App` y luego verificamos que los componentes `Counter` y `Greeting` se renderizan e interactúan correctamente.

Recuerda, la idea de los test de integración es asegurarte de que los componentes funcionan correctamente juntos, en lugar de simplemente verificar que cada componente funciona de forma aislada.
