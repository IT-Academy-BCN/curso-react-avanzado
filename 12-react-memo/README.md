# Módulo 12: Aprendiendo y comprendiendo React.memo()

Video: [https://youtu.be/V60pfS8efWA](https://youtu.be/V60pfS8efWA)

React.memo() es una función de alto orden (HoC) que memoriza un componente funcional para evitar renderizados innecesarios. Este puede ser útil cuando tenemos componentes que renderizan la misma salida con las mismas propiedades. En nuestro caso, usaremos React.memo() en componentes específicos para asegurarnos de que nuestra aplicación se ejecuta sin problemas incluso con un gran número de recetas e interacción intensiva del usuario.

## Ejemplo de uso de React.memo()

```jsx
import React, { useState, useCallback } from 'react';

const Child = React.memo(({ onRemove, item }) => {
  console.log('Child render', item.id);
  return (
    <div>
      Item: {item.name}
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
});

const Parent = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' },
  ]);

  const handleRemove = useCallback((removeId) => {
    setItems(items => items.filter(item => item.id !== removeId));
  }, []);

  console.log('Parent render');

  return (
    <div>
      {items.map(item => (
        <Child key={item.id} item={item} onRemove={handleRemove} />
      ))}
    </div>
  );
};

export default Parent;
```

En este ejemplo, el componente `Children` está siendo envuelto en `React.memo()`. De este modo, si las propiedades del componente (`onRemove` y `item` en este caso) son iguales en dos renderizados consecutivos, React reutilizará el mismo output y evitará un renderizado innecesario.

## Consideraciones y Desventajas

1. **Uso innecesario**: No todos los componentes necesitan ser memorizados. De hecho, memorizar un componente que no necesita serlo puede ser contraproducente, ya que la comparación de las propiedades también consume recursos.

2. **Solo verifica las propiedades**: `React.memo()` solo compara las propiedades del componente. Esto significa que si el componente depende de algún otro dato (como las variables de estado o de contexto), no se beneficiará de la memorización.

3. **Complejidad adicional**: `React.memo()` puede hacer que tu código sea más difícil de leer y entender, especialmente para los desarrolladores que no están familiarizados con él.

4. **Shallow comparison**: `React.memo()` hace una comparación superficial de las propiedades, lo que significa que si las propiedades son objetos o arrays, solo se compararán sus referencias y no sus contenidos. Esto puede hacer que `React.memo()` no funcione como se espera en algunos casos.