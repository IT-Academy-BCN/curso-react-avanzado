# Módulo 11: Aprendiendo y comprendiendo useCallback()

Video: [https://youtu.be/0CgTAw0TbwI](https://youtu.be/0CgTAw0TbwI)

El Hook `useCallback()` de React nos permite optimizar aún más el rendimiento de nuestra aplicación al evitar la recreación innecesaria de funciones, especialmente en componentes que renderizan largas listas de casas.

Este Hook devuelve una versión memorizada de la función que solo cambia si cambian las dependencias. Esto es útil cuando pasamos funciones a componentes optimizados que dependen de la igualdad de referencia para prevenir actualizaciones innecesarias.

## Ejemplo de uso de useCallback()

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

```jsx
import React, { useState, useCallback } from 'react';

function HousesList({ houses }) {
  const [filter, setFilter] = useState('');

  const handleFilterChange = useCallback((event) => {
    setFilter(event.target.value);
  }, []);

  const filteredHouses = houses.filter(house => house.name.includes(filter));

  return (
    <div>
      <input type="text" value={filter} onChange={handleFilterChange} />
      {filteredHouses.map(house => (
        <div key={house.id}>{house.name}</div>
      ))}
    </div>
  );
}
```

En este ejemplo, `useCallback()` se utiliza para memorizar la función `handleFilterChange` que se pasa al componente `input`. De este modo, la función no se recreará en cada renderizado, a menos que cambien sus dependencias (en este caso, no hay ninguna).

## Consideraciones y Desventajas

1. **Uso innecesario**: Al igual que `useMemo()`, `useCallback()` puede ser innecesario en muchas situaciones. Solo debes usarlo cuando pasas funciones a componentes que dependen de la igualdad de referencia para prevenir actualizaciones innecesarias.

2. **Complejidad adicional**: `useCallback()` puede hacer que tu código sea más difícil de leer y entender, especialmente para los desarrolladores que no están familiarizados con este Hook.

3. **Costo de memorización**: La memorización también tiene un costo. React debe mantener una copia de la función en la memoria, lo que puede aumentar el uso de la memoria de tu aplicación.

4. **Dependencias**: Debes asegurarte de que todas las dependencias estén incluidas en la lista de dependencias de `useCallback()`. Si no, puedes obtener resultados inconsistentes o bugs difíciles de detectar.