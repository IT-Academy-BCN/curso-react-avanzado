# Módulo 7: Aprendiendo y comprendiendo useState()

Video: [https://youtu.be/f4McUV7R9zY](https://youtu.be/f4McUV7R9zY)

En este módulo exploraremos el hook `useState()` de React. Esta herramienta nos permite añadir estado a nuestros componentes funcionales y realizar acciones basadas en las interacciones del usuario.

## ¿Qué es `useState()`?

`useState()` es un hook que permite gestionar el estado en componentes funcionales. Los hooks se añadieron en React 16.8, y desde hace tiempo son la norma. Permiten usar el estado y otras características de React sin escribir una clase.

## ¿Cómo usar `useState()`?

Aquí un ejemplo básico de cómo se puede usar `useState()`:

```jsx
import React, { useState } from 'react';

const LikeButton = () => {
  const [like, setLike] = useState(0);

  const incrementLikes = () => setLike(like + 1);

  return (
    <button onClick={incrementLikes}>
      {like} {like === 1 ? 'Like' : 'Likes'}
    </button>
  );
}
```

En este componente, `useState(0)` declara una nueva variable de estado, `like`. `useState` devuelve el valor actual del estado y una función que te permite actualizarlo. Por eso escribimos `const [like, setLike] = useState()`. En nuestro ejemplo, `like` se establece en `0` inicialmente. `setLike` es la función que utilizamos para actualizar el estado.

Cuando se hace clic en el botón, se llama a la función `incrementLikes`, que a su vez llama a `setLike` con el nuevo número de me gusta. Esto hace que el componente se vuelva a renderizar con el nuevo estado.

## Más Ejemplos y Casos de Uso

### Usando `useState()` con un objeto

A veces es posible que quieras almacenar un objeto en tu estado. Aquí tienes un ejemplo de cómo hacer esto:

```jsx
const [usuario, setUsuario] = useState({nombre: "Juan", edad: 30});

// para actualizar el estado:
setUsuario({nombre: "Ana", edad: 25});
```

Cuando actualices variables de estado que son objetos o arreglos, recuerda siempre hacer una copia del estado actual antes de hacer cambios.

### Usando `useState()` con el estado anterior

Si el nuevo estado se calcula usando el estado anterior, puedes pasar una función a `setState()`. Aquí un ejemplo:

```jsx
const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);

  return (
    <button onClick={increment}>
      Incrementar
    </button>
  );
}
```

En este caso, la función `increment` llama a `setCount` con una función como su argumento. Esta función tiene acceso al estado anterior (`prevCount`), y devuelve el nuevo estado.

## Problemas y Consideraciones

1. **No hay fusión automática del objeto de estado**: A diferencia de `setState()` en un componente de clase, `useState()` no mezcla y actualiza automáticamente el objeto. Esto puede conducir a errores al actualizar el objeto de estado. Cuando actualices el estado, asegúrate de que estás copiando el estado existente y actualizándolo en consecuencia.

2. **Usar `useState()` con tipos de datos complejos**: Usar tipos de datos complejos como objetos y matrices con `useState()` puede requerir un poco más de esfuerzo, como la fusión manual de estados.

3. **Demasiadas variables de estado**: Si tienes demasiadas variables de estado, podría indicar que tu componente está haciendo demasiado. Considera dividir tu componente en componentes más pequeños y manejables.

4. **Las actualizaciones de estado pueden ser asíncronas**: React puede agrupar varias llamadas a `setState()` en una sola actualización para mejorar el rendimiento. Por esto, leer `state` inmediatamente después de llamar a `setState()` podría devolver el valor existente. Para manejar esto, puedes usar una función como argumento en `setCount` para actualizar de manera fiable a partir del estado anterior.

5. **useState dentro de side effects**: El estado debe establecerse en respuesta a los controladores de eventos o a los cambios en componentes padre. Evita llamar a `setState()` dentro de `useEffect()`, `setTimeout()`, `setInterval()` o en promesas. Esto puede llevar a actualizaciones inconsistentes del estado e introducir errores en tu aplicación.

Un ejemplo de este caso que no funciona es el siguiente:

```jsx
import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Error
      setSeconds(seconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>Elapsed time: {seconds} seconds</div>;
};
```

```jsx
import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Ejemplo corregido llamando al valor anterior en el callback
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>Elapsed time: {seconds} seconds</div>;
};
```

En este ejemplo corregido, estamos usando `setSeconds(prevSeconds => prevSeconds + 1)`. Esto le dice a React que actualice la variable de estado `seconds` en base a su valor anterior, asegurando que el estado siempre se actualiza correctamente.

Al final de este módulo, deberías sentirte cómodo utilizando el hook `useState()`, comprendiendo tanto sus fortalezas como las consideraciones necesarias al usarlo.