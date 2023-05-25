# Módulo 4: Estilos, props y props especiales en React

Video: [https://youtu.be/g4Jj_2NAPcE](https://youtu.be/g4Jj_2NAPcE)

En este modulo nos centraremos en tres conceptos principales de React: estilos, props y props especiales. Al entender estos conceptos, podremos hacer que nuestra aplicación no solo sea visualmente atractiva, sino también eficiente y dinámica.

## Estilos en React

En React, podemos estilizar nuestros componentes de varias maneras. Podemos usar archivos CSS regulares, estilos en línea o objetos JavaScript. Para este último, las propiedades se escriben en camelCase y los valores son `strings` o `number`. Este módulo proporcionará ejemplos de cómo utilizar estos diferentes métodos.

## Props en React

Las props (abreviatura de properties) son la forma en que pasamos datos desde componentes padre a componentes hijo. Son de solo lectura y nos ayudan a hacer que nuestros componentes sean más dinámicos y reutilizables.

Por ejemplo, supongamos que tenemos un componente `Article`. Este componente podría aceptar props como `title` y `description`, lo que nos permite reutilizar el componente `Article` para diferentes noticias.

```jsx
function Article({ title, description }) {
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
```

Podemos usar este componente varias veces con diferentes props:

```jsx
<Article title="Color azul" description="Hay a gente que le gusta el color azul" />
<Article title="Color rojo" description="Hay a gente que le gusta el color rojo" />
```

## Props especiales en React

### Key

React tiene algunas props especiales que nos ayudan a gestionar nuestra aplicación de forma más eficiente. Una de estas propiedades es `key`. Las keys ayudan a React a identificar qué elementos han cambiado, han sido añadidos o eliminados. Deben darse a elementos renderizados al mismo nivel, generalmente vienen dentro de un array para dar a los elementos una identidad estable.

Por ejemplo, si estuviéramos renderizando un array de componentes `Article`, podríamos usar el id del artículo como key:

```jsx
{articles.map(article => <Article key={article.id} title={article.title} description={article.description} />)}
```

Esto ayuda a React a optimizar el rendimiento de re-renderizado al identificar rápidamente qué componentes han cambiado.

### Children

Otra prop especial es `children`. Esta prop se usa para pasar componentes como datos a otros componentes, permitiendo composición de componentes más flexibles.

```jsx
function Layout({ children }) {
    return <div className="layout">{children}</div>;
}

// Use Layout component and pass other components as children
<Layout>
    <Navbar />
    <Sidebar />
    <Content />
</Layout>
```

### Otras props especiales

-  `ref`: Permite acceder al DOM o a un elemento de React.
-  `dangerouslySetInnerHTML`: Permite establecer el contenido HTML de un elemento.
-  `defaultProps`: Permite establecer valores por defecto para las props de un componente.
-  `contextType`: Permite acceder al contexto de un componente.
-  `forwardRef`: Permite pasar refs a componentes hijos.
-  `memo`: Permite memorizar un componente para evitar re-renderizados innecesarios.
-  `lazy`: Permite cargar un componente de forma diferida.
-  `suspense`: Permite mostrar un componente mientras se carga otro.
-  `Fragment`: Permite agrupar elementos sin necesidad de crear un elemento padre.
-  `StrictMode`: Permite activar el modo estricto de React.
-  `SuspenseList`: Permite mostrar un componente mientras se cargan otros.
-  `Profiler`: Permite medir el rendimiento de un componente.
