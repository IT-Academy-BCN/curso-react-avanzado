# Módulo 8: Aprendiendo y comprendiendo useEffect()

En este módulo, introduciremos y exploraremos el hook `useEffect()`. `useEffect()` nos permite manejar los efectos secundarios (side effects) en nuestros componentes de React, y es una parte integral para entender y trabajar eficientemente con React.

## Ejemplo de uso de useEffect()

Supongamos que tenemos un componente que muestra una lista de casas y queremos cargar esas casas de un servidor cuando nuestro componente se monte:

```jsx
import React, { useState, useEffect } from 'react';

const Houses = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch('http://miapi.com/houses')
      .then(response => response.json())
      .then(data => setHouses(data));
  }, []);

  return (
    <div>
      {houses.map((house) => (
        <div key={house.id}>
          <h2>{house.nombre}</h2>
          <p>{house.descripcion}</p>
        </div>
      ))}
    </div>
  );
};
```

En este ejemplo, `useEffect()` se utiliza para realizar una solicitud HTTP a nuestra API para obtener las casas. Cuando la promesa se resuelve, actualizamos nuestro estado de `houses` con los datos de la respuesta.


## Ejemplo de Uso de useEffect para la Limpieza de Efectos

```jsx
import React, { useState, useEffect } from 'react';

const EventComponent = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const manageMovement = (event) => {
      setCoordinates({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', manageMovement);

    // Devolvemos una función de limpieza que se ejecutará al desmontar el componente
    return () => {
      window.removeEventListener('mousemove', manageMovement);
    };
  }, []);

  return (
    <div>
      Las coordenadas del mouse son: (x: {coordinates.x}, y: {coordinates.y})
    </div>
  );
};
```

En este ejemplo, estamos añadiendo un evento de `mousemove` al `window` para seguir la posición del mouse. Cuando el componente se desmonta, se elimina el evento para evitar fugas de memoria.

## Ejemplo de uso de useEffect() para actualizaciones de estado dependientes del estado anterior

```jsx
import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCounter] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>Counter: {count}</div>;
};
```

En este caso, estamos creando un contador que se incrementa cada segundo. Observa cómo estamos pasando una función a `setCounter` para garantizar que siempre estamos usando el último estado.

## Ejemplo de uso de useEffect() con múltiples efectos

```jsx
import React, { useState, useEffect } from 'react';

const FetchComponent = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://miapi.com/usuario')
      .then((response) => response.json())
      .then((data) => {
        setUsuario(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (usuario) {
      document.title = `Bienvenido ${usuario.nombre}`;
    } else {
      document.title = 'loading...';
    }
  }, [usuario]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>Bienvenido, {usuario.nombre}</div>;
};
```

Aquí, estamos usando `useEffect()` dos veces. El primer `useEffect()` se encarga de buscar al usuario desde una API. El segundo `useEffect()` se encarga de actualizar el título del documento en función del estado del usuario.

## Consideraciones y posibles problemas con useEffect()

1. **Dependencias olvidadas**: Cuando usamos el hook `useEffect()`, proporcionamos un array de dependencias como segundo argumento. Este array contiene todas las variables que, si cambian, causarían la re-ejecución del efecto. Si olvidamos incluir una dependencia en este array, podemos enfrentarnos a problemas en nuestra aplicación.

 ```jsx
 const [count, setCount] = useState(0);

 useEffect(() => {
   const id = setInterval(() => {
     setCount(count + 1); // Aquí count es una dependencia
   }, 1000);
   return () => clearInterval(id);
 }, []); // Aquí deberíamos haber incluido count
 ```

 En este ejemplo, el valor de `count` no se actualiza cada segundo como se esperaría porque olvidamos incluirlo en el array de dependencias.

2. **Bucles infinitos**: Si actualizas una variable de estado dentro de `useEffect()` que también es una dependencia de este, puedes causar un bucle infinito.

 ```jsx
 const [count, setCount] = useState(0);

 useEffect(() => {
   setCount(count + 1);
 }, [count]); // Aquí estamos creando un bucle infinito
 ```

 En este ejemplo, actualizamos el estado `count` dentro de `useEffect()`, y `count` es una dependencia, lo que causa un bucle infinito.

3. **Limpieza de efectos**: Algunos efectos secundarios, como los observadores de eventos o las suscripciones, necesitan ser limpiados antes de que el componente se desmonte para evitar fugas de memoria.

 ```jsx
 useEffect(() => {
   const subscription = api.subscribe();

   return () => {
     // Aquí olvidamos cancelar la suscripción
   };
 }, []);
 ```

 En este ejemplo, olvidamos cancelar la suscripción en la función de limpieza, lo que puede causar fugas de memoria.

4. **Efectos sincrónicos vs asíncronos**: `useEffect()` siempre se ejecuta después de la renderización, por lo que no bloquea la interfaz de usuario. Sin embargo, si necesitas un efecto que se ejecuta antes de la renderización, tendrás que buscar otras soluciones.

 ```jsx
 useEffect(() => {
   setCount(count + 1);
 }, []);
 console.log(count); // Aquí count todavía no se ha actualizado
 ```

 En este ejemplo, estamos intentando acceder al valor actualizado de `count` justo después de llamar a `useEffect()`, pero `count` todavía no se ha actualizado porque `useEffect()` se ejecuta después de la renderización.

