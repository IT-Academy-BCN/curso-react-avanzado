# Módulo 6: Introducción a Styled Components

Video: [https://youtu.be/ffkhJZ4qiXY](https://youtu.be/ffkhJZ4qiXY)
Video 2: [https://youtu.be/tatci9ctMfE](https://youtu.be/tatci9ctMfE)

En este módulo presentaremos `styled-components`, una libreria que mejora el estilo CSS en las aplicaciones de React. Lo usaremos para crear estilos reutilizables y modulares en nuestra aplicación.

## ¿Qué son los Styled Components?

Los Styled Components son una de las nuevas formas de usar CSS en JavaScript moderno. Son esencialmente funciones de JavaScript que devuelven estilos CSS. Esto te permite escribir CSS real en tu JavaScript, dándote los beneficios de CSS con los beneficios de JavaScript.

Usando `styled-components` podemos:

- Eliminar el mapeo entre componentes y estilos, ¡no más archivos CSS!
- Definir estilos que están acotados a un componente, sin afectar otras partes de la aplicación.
- Crear estilos reutilizables y modulares, que ayudan a mantener un sistema de diseño consistente en toda la aplicación.

## ¿Cómo utilizar Styled Components?

Aquí tienes un ejemplo sencillo de un botón:

```jsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
  padding: 0.5em 1em;
  font-size: 1em;
`;

// Uso en un componente
const SomeComponent = () => (
  <div>
    <StyledButton>¡Haz click en mí!</StyledButton>
  </div>
);
```

## Elementos principales de la API de Styled Components

Además de estilizar los elementos html, `styled-components` también proporciona una serie de funcionalidades útiles.

### Propiedades dinámicas

Puedes pasar props a tus componentes estilizados para cambiar su estilo dinámicamente. Por ejemplo:

```jsx
const DynamicStyledButton = styled.button`
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};
`;

// Uso en un componente
const SomeComponent = () => (
  <div>
    <DynamicStyledButton primary>Botón primario</DynamicStyledButton>
    <DynamicStyledButton>Botón secundario</DynamicStyledButton>
  </div>
);
```

### Estilos globales

Usa `createGlobalStyle` para aplicar estilos globales en tu aplicación.

```jsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: papayawhip;
  }
`;

// Uso en un componente principal
const App = () => (
  <div>
    <GlobalStyle />
    {/* Otros componentes */}
  </div>
);
```

### Propiedad polimórfica 'as'

La prop `as` te permite cambiar el elemento DOM o componente que un componente estilizado renderiza. Esto es muy útil cuando quieres reutilizar estilos de componentes pero cambiar el elemento real que se está renderizando. Aquí tienes un ejemplo:

```jsx
const Component = styled.div`
  color: palevioletred;
`;

// Uso en otro componente
const OtherComponent = () => (
  <div>
    <Component as="button">Esto es un botón</Component>
    <Component as="a" href="#">Esto es un enlace</Component>
  </div>
);
```

En este caso, tanto el botón como el enlace tendrán el color 'palevioletred', pero se renderizan como elementos DOM diferentes.

### Usando `attrs`

`attrs` es una función que puedes usar para definir algunos atributos para tus componentes estilizados. Aquí tienes un ejemplo:

```jsx
const Input = styled.input.attrs(props => ({
  type: 'text',
  size: props.size || '1em',
}))`
  border: 2px solid palevioletred;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

// Uso en un componente
const Component = () => (
  <div>
    <Input placeholder="Un pequeño campo de texto" size="0.5em" />
    <Input placeholder="Un campo de texto más grande" size="2em" />
  </div>
);
```

En este caso, tenemos un componente estilizado `Input` que siempre tiene un tipo 'texto'. También tiene un tamaño que puede ser sobrescrito con props.

## ¿Problemas de instalación?

https://stackoverflow.com/questions/70810819/npm-err-cannot-read-properties-of-null-reading-edgesout