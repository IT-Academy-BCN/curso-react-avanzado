# Módulo 11: Aprendiendo y comprendiendo useCallback()

El Hook `useCallback()` de React nos permite optimizar aún más el rendimiento de nuestra aplicación al evitar la recreación innecesaria de funciones, especialmente en componentes que renderizan largas listas de casas.

Este Hook devuelve una versión memorizada de la función que solo cambia si cambian las dependencias. Esto es útil cuando pasamos funciones a componentes optimizados que dependen de la igualdad de referencia para prevenir actualizaciones innecesarias.

## Ejemplo de uso de useCallback()

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