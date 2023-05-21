# Módulo 10: Aprendiendo y entendiendo useMemo()

El Hook `useMemo()` de React nos permite optimizar el rendimiento de nuestra aplicación evitando cálculos innecesarios. Este Hook memoriza el resultado de una función de cálculo intensiva y solo lo recalcula si alguna de sus dependencias cambia.

Este módulo se centrará en el uso de `useMemo()` para mejorar la eficiencia de nuestro proyecto. Imaginemos que queremos filtrar las casas basadas en ciertos criterios, y este proceso de filtrado es intensivo. En lugar de realizar este cálculo cada vez que se renderiza el componente, podemos usar `useMemo()` para almacenar el resultado y solo recalcularlo cuando los criterios de filtrado cambien.

## Ejemplo de uso de useMemo()

```jsx
import React, { useMemo } from 'react';

function HousesList({ houses, filter }) {
  const filteredHouses = useMemo(() => {
    return houses.filter(house => house.category === filter);
  }, [houses, filter]);

  return (
    <div>
      {filteredHouses.map(house => (
        <div key={house.id}>{house.name}</div>
      ))}
    </div>
  );
}
```

En este ejemplo, `useMemo()` se utiliza para memorizar el resultado de la operación de filtrado. Solo cuando `houses` o `filter` cambien, se volverá a realizar la operación de filtrado.

## Consideraciones y Desventajas

1. **Uso innecesario**: No todas las operaciones necesitan ser optimizadas con `useMemo()`. Solo debes usarlo cuando la operación es costosa y notas un impacto en el rendimiento.

2. **Complejidad adicional**: El uso de `useMemo()` puede hacer que tu código sea más difícil de leer y entender, especialmente para los desarrolladores que no están familiarizados con este Hook.

3. **Costo de memorización**: La memorización también tiene un costo. React debe mantener una copia del valor memorizado en la memoria, lo que puede aumentar el uso de la memoria de tu aplicación. Además, React debe verificar las dependencias en cada renderizado para saber si debe re-calcular el valor.

4. **Dependencias**: Al igual que con `useEffect()`, debes asegurarte de que todas las dependencias estén incluidas en la lista de dependencias de `useMemo()`. Si no, puedes obtener resultados inconsistentes o bugs difíciles de detectar.