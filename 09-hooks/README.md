# Módulo 9: Aprendiendo sobre hooks

Video: [https://youtu.be/wlsL4klK3rU](https://youtu.be/wlsL4klK3rU)

Los Hooks de React son funciones que nos permiten "engancharnos" a las características de React desde un componente funcional. En este módulo, aprenderemos cómo usar Hooks para manejar la lógica de estado más compleja en nuestra aplicación. 

Para ilustrar la utilidad de los Hooks, crearemos un Hook personalizado llamado `useFetch`, que combinará el uso de `useState` y `useEffect` para facilitar la obtención de datos desde una API.

## Ejemplo de useFetch

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

Este Hook personalizado `useFetch` recibe una URL como parámetro y devuelve un objeto que contiene los datos recuperados, un indicador de carga y cualquier error que pueda haber ocurrido durante la solicitud. El Hook `useEffect` se utiliza para realizar la solicitud de la API cuando el componente se monta (o cuando la URL cambia), y los Hooks `useState` se utilizan para almacenar y actualizar el estado de los datos, la carga y el error.

## Usando useFetch en un Componente

```jsx
import React from 'react';
import useFetch from './useFetch';

function Component() {
  const { data, loading, error } = useFetch('https://api.example.com/data');

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}

export default Component;
```

En este componente, estamos usando el Hook `useFetch` para recuperar los datos de 'https://api.example.com/data'. Mientras los datos se están cargando, mostramos un mensaje de "Cargando...". Si ocurre un error, mostramos el mensaje de error. Una vez que los datos se han cargado correctamente, los mostramos en el componente.

Este es solo un ejemplo de cómo podemos usar los Hooks para abstraer la lógica de estado y efectos en nuestros componentes. A medida que vayamos adquiriendo más experiencia con los Hooks, descubriremos que nos ofrecen una gran flexibilidad para organizar y reutilizar la lógica de nuestros componentes.