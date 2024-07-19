# Pokémon Web App

Este proyecto es una aplicación web que muestra una lista de Pokémon base (sin evoluciones) y proporciona información sobre ellos, incluyendo su imagen, nombre, peso y tipos. Además, incluye una página "Acerca de mí".

## Tecnologías Utilizadas

- LitElement
- CellsPage
- @cells-demo/demo-app-template
- @bbva-web-components/bbva-web-link
- @bbva-experience-components/bbva-button-default
- PokeAPI

## Instalación

Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/pokemon-web-app.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd pokemon-web-app
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```
4. Ejecuta la aplicación:
    ```sh
    cells app:serve -c dev.js
    ```

## Estructura del Proyecto

- `home-page.js`: Componente principal que muestra la lista de Pokémon y un botón para navegar a la página "Acerca de mí".
- `evolutions-page.js`: Componente secundario que muestra la lista de las evoluciones de los Pokémon .
- `aboutme-page.js`: Componente que muestra información personal y un botón para regresar a la página principal.

## Descripción de los Componentes

### HomePage

Este componente obtiene datos de la PokeAPI y filtra los Pokémon base (sin evoluciones). La información mostrada incluye:

- Imagen
- Nombre
- Peso
- Tipos

Además, hay un botón "Evoluciones" que actualmente no tiene funcionalidad implementada.

### AboutmePage

Este componente muestra información personal, incluyendo un nombre completo y un botón para regresar a la página principal.

## Estilos

Los estilos están definidos utilizando CSS dentro de los componentes LitElement y proporcionan un diseño responsive y visualmente agradable para la aplicación.

## Uso

Para usar la aplicación, simplemente abre la página principal (`home-page`) para ver la lista de Pokémon. Puedes hacer clic en "About me" para navegar a la página "Acerca de mí" y luego regresar utilizando el botón "Regresar".


