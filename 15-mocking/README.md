# Uso de Mocking en Testing de React

Video: [https://youtu.be/Y13QiIKuytQ](https://youtu.be/Y13QiIKuytQ)

El "mocking" es una técnica de testing que te permite simular el comportamiento de objetos o funciones externas, lo cual es útil para controlar el entorno de test. Aquí te proporcionamos algunos ejemplos de cómo usar mocking en tests de React.

## Mocking de Módulos

Supón que tienes un módulo que realiza algún cálculo o proceso que no quieres incluir en tus tests. Puedes usar `vi.mock` para simularlo.

```jsx
// utils.ts
export const complexCalculation = (a: number, b: number) => { return a * a / b * a * b };
```

```jsx
// Component.test.tsx
import { complexCalculation } from './utils';

vi.mock('./utils', () => ({
  complexCalculation: vi.fn(() => 42),
}));

// Ahora, cada vez que 'complexCalculation' se llame dentro de tus tests, devolverá 42.
```

## Mocking de un componente que recibe una función como prop

Considera un componente que recibe una función como prop:

```tsx
// ChildComponent.tsx
import React, { FC } from 'react';

interface ChildComponentProps {
  onClick: () => void;
}

const ChildComponent: FC<ChildComponentProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Click me
    </button>
  );
};

export default ChildComponent;
```

Para testear este componente, necesitamos pasar una función como prop. Podemos usar `vi.mock` para simular esta función:

```tsx
// ChildComponent.test.tsx
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

```tsx
// HookComponent.tsx
import React, { FC } from 'react';

interface HookComponentProps {
  useHook: () => [string, (value: string) => void];
}

const HookComponent: FC<HookComponentProps> = ({ useHook }) => {
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

export default HookComponent;
```

Para testear este componente, necesitamos pasar un hook como prop. Podemos usar `vi.mock` para simular este hook:

```tsx
// HookComponent.test.tsx
import { render, screen } from '@testing-library/react';
import HookComponent from './HookComponent';

test('calls useHook prop when clicked', () => {
  const setValueMock = vi.fn();
  const useHook = vi.fn(
    () => ['initial value', setValueMock] as [string, (value: string) => void]
  );
  render(<HookComponent useHook={useHook} />);
  const button = screen.getByText(/set new value/i);
  button.click();
  expect(useHook).toHaveBeenCalled();
  expect(setValueMock).toHaveBeenCalledWith('new value');
});
```

## Mocking de un componente completo

Considera el siguiente componente:

```tsx
// ParentComponent.tsx
import React, { FC } from 'react';
import Child from './Child';

const ParentComponent: FC = () => {
  return (
    <div>
      <Child />
    </div>
  );
};

export default ParentComponent;
```

Para testear este componente, necesitamos testear también el componente hijo. Podemos usar `vi.mock` para simular el componente hijo:

```tsx
// ParentComponent.test.tsx
import { render, screen } from '@testing-library/react';
import { vi, test } from 'vitest';
import ParentComponent from './ParentComponent';
import '@testing-library/jest-dom';

vi.mock('./ChildComponent', () => ({
  default: () => <div>adios</div>,
}));

test('renders child component', () => {
  render(<ParentComponent />);
  const childComponent = screen.getByText(/adios/i);
  expect(childComponent).toBeInTheDocument();
});
```
