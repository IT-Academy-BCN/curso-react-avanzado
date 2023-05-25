# Uso de Mocking en Pruebas de React

El "mocking" es una técnica de testing que te permite simular el comportamiento de objetos o funciones externas, lo cual es útil para controlar el entorno de test. Aquí te proporcionamos algunos ejemplos de cómo usar mocking en tests de React.

## Mocking de Módulos

Supón que tienes un módulo que realiza algún cálculo o proceso que no quieres incluir en tus tests. Puedes usar `vi.mock` para simularlo.

```jsx
// utils.js
export const complexCalculation = (a, b) => { /* ... */ };
```

```jsx
// Component.test.js
import { complexCalculation } from './utils';

vi.mock('./utils', () => ({
  complexCalculation: vi.fn(() => 42),
}));

// Ahora, cada vez que 'complexCalculation' se llame dentro de tus tests, devolverá 42.
```

## Mocking de APIs

Mock Service Worker (MSW) es una librería que te permite interceptar y manejar solicitudes HTTP en el navegador. Esto puede ser útil para simular llamadas a APIs durante tus tests.

Primero, necesitas instalar la librería:

```bash
npm install --save-dev msw
```

Luego, puedes definir tus handlers de MSW en un archivo aparte:

```jsx
// handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.example.com/user', (req, res, ctx) => {
    return res(
      ctx.json({
        username: 'john_doe',
      }),
    );
  }),
];
```

Y utilizar estos handlers en tus tests:

```jsx
// App.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import App from './App';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays user data fetched from API', async () => {
  render(<App />);
  const userData = await waitFor(() => screen.getByText(/john_doe/i));
  expect(userData).toBeInTheDocument();
});
```

Este test renderiza el componente `App`, que asumimos que hace una petición a 'https://api.example.com/user' para obtener los datos del usuario. MSW interceptará esta petición y responderá con el JSON que hemos definido en nuestro handler.

De esta manera, puedes controlar las respuestas de la API en tus pruebas, lo que te permite probar cómo reaccionará tu componente ante diferentes respuestas.

## Mocking de un componente que recibe una función como prop

Considera un componente que recibe una función como prop:

```jsx
// ChildComponent.js
import React from 'react';

const ChildComponent = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Click me
    </button>
  );
};

export default ChildComponent;
```

Para testear este componente, necesitamos pasar una función como prop. Podemos usar `vi.mock` para simular esta función:

```jsx
// ChildComponent.test.js
import { render, screen } from '@testing-library/react';
import ChildComponent from './ChildComponent';

test('calls onClick prop when clicked', () => {
  const onClick = vi.fn();
  render(<ChildComponent onClick={onClick} />);
  const button = screen.getByText(/click me/i);
  button.click();
  expect(onClick).toHaveBeenCalled();
});
```

## Mocking de un componente que recibe un hook como prop

Considera un componente que recibe un hook como prop:

```jsx
// ChildComponent.js
import React from 'react';

const ChildComponent = ({ useHook }) => {
  const [value, setValue] = useHook();
  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={() => setValue('new value')}>
        Set new value
      </button>
    </div>
  );
};

export default ChildComponent;
```

Para testear este componente, necesitamos pasar un hook como prop. Podemos usar `vi.mock` para simular este hook:

```jsx
// ChildComponent.test.js
import { render, screen } from '@testing-library/react';
import ChildComponent from './ChildComponent';

test('calls useHook prop when clicked', () => {
  const useHook = vi.fn(() => ['initial value', vi.fn()]);
  render(<ChildComponent useHook={useHook} />);
  const button = screen.getByText(/set new value/i);
  button.click();
  expect(useHook).toHaveBeenCalledWith('new value');
});
```

## Mocking de un componente completo

Considera el siguiente componente:

```jsx
// ParentComponent.js
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  return (
    <div>
      <ChildComponent />
    </div>
  );
};

export default ParentComponent;
```

Para testear este componente, necesitamos testear también el componente hijo. Podemos usar `vi.mock` para simular el componente hijo:

```jsx
// ParentComponent.test.js
import { render, screen } from '@testing-library/react';
import ParentComponent from './ParentComponent';

test('renders child component', () => {
  vi.mock('./ChildComponent', () => () => <div>Mocked child component</div>);
  render(<ParentComponent />);
  const childComponent = screen.getByText(/mocked child component/i);
  expect(childComponent).toBeInTheDocument();
});
```
