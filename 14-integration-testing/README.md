# Tests de Integración en React

Video: [https://youtu.be/EJUrm1-HUa4](https://youtu.be/EJUrm1-HUa4)

Los tests de integración verifican que diferentes unidades de software, o en nuestro caso, componentes de React, funcionen correctamente juntos. A diferencia de los tests unitarios, que testean componentes de forma aislada, los tests de integración prueban la interacción entre varios de dichos componentes.

Esto es más representativo de cómo se comporta nuestra aplicación en el mundo real, en comparación con los test unitarios que solo prueban componentes individuales de forma aislada. Al simular las interacciones del usuario y verificar los cambios resultantes en la aplicación, puedes detectar errores y problemas que pueden no ser evidentes en las test unitarios.

Los test de integración también pueden ayudar a garantizar que los nuevos cambios o características no rompan la funcionalidad existente, aumentando así la confiabilidad y solidez de la aplicación.

## Ejemplo de Test de Integración

Un buen ejemplo de test de integración son los formularios, en donde el usuario interacciona con numerosos componentes individuales para realizar una petición.

A continuación los distintos componentes necesarios:

```tsx
// Input.tsx
import React, { ChangeEvent, FC } from 'react'

interface InputProps {
  id: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({ id, label, value, onChange }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input value={value} onChange={onChange} />
  </div>
)

export default Input
```

```jsx
// Select.tsx
import React, { ChangeEvent, FC } from 'react'

interface SelectProps {
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
}

const Select: FC<SelectProps> = ({ label, value, onChange, options }) => (
  <div>
    <label>{label}</label>
    <select value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

export default Select
```

```tsx
// Button.tsx
import React, { FC, MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: FC<ButtonProps> = ({ children, onClick, type = 'button' }) => (
  <button type={type} onClick={onClick}>
    {children}
  </button>
);

export default Button;
```

```tsx
// Form.tsx
import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { Button, Select, Input } from '../atoms';

interface FormProps {
  onSubmit: (data: any) => void
}

const Form: FC<FormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('developer')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, role }),
    })
    const data = await response.json()
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input id="name" label="Name" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
      <Input id="email" label="Email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
      <Select
        id="role"
        label="Role"
        value={role}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
        options={[
          { value: 'developer', label: 'Developer' },
          { value: 'designer', label: 'Designer' },
          { value: 'product', label: 'Product Manager' },
        ]}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}

export default Form
```

```tsx
import { render, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Form } from '../../../components/molecules';

global.fetch = vi.fn();
function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

it('submits the form with name, email, and role, and receives a response', async () => {
  const onSubmit = vi.fn();

  const response = {
    name: 'test',
    email: 'test@test.com',
    role: 'developer',
  };

  // @ts-ignore
  fetch.mockResolvedValue(createFetchResponse(response));

  const { getByLabelText, getByText } = render(<Form onSubmit={onSubmit} />);

  fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
  fireEvent.change(getByLabelText('Email'), {
    target: { value: 'john.doe@example.com' },
  });
  fireEvent.change(getByLabelText('Role'), { target: { value: 'developer' } });
  fireEvent.click(getByText('Submit'));

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith(response);
  });
});
```
