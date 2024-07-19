import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';

class HomePage extends CellsPage {
  static get is() {
    return 'home-page';
  }
  static get properties() {
    return {
      title: { type: String },
      pokemonList: { type: Array },
    };
  }

  static get styles() {
    return css`
      .container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        padding: 1rem;
        justify-items: center;
      }

      .pokemon-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        transition: background-color 0.3s;
      }

      .pokemon-container:nth-child(4n + 1) {
        background-color: #ffebcd; /* Blanched Almond */
      }

      .pokemon-container:nth-child(4n + 2) {
        background-color: #e0ffff; /* Light Cyan */
      }

      .pokemon-container:nth-child(4n + 3) {
        background-color: #f0e68c; /* Khaki */
      }

      .pokemon-container:nth-child(4n + 4) {
        background-color: #e6e6fa; /* Lavender */
      }

      .pokemon-image {
        width: 100px;
        height: 100px;
        margin-bottom: 1rem;
      }

      .pokemon-name {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }

      .pokemon-type {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .pokemon-type span {
        background-color: #f1f1f1;
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
      }

      .evolutions-button {
        margin-top: 1rem;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'Taller 1 Páginas Declarativas';
    this.pokemonList = [];
    this.fetchPokemonData();
  }

  async fetchPokemonData() {
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50'
      );
      const data = await response.json();

      const detailedData = await Promise.all(
        data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        )
      );

      const basePokemon = await Promise.all(
        detailedData.map(async(pokemon) => {
          const speciesResponse = await fetch(pokemon.species.url);
          const speciesData = await speciesResponse.json();
          return speciesData.evolves_from_species ? null : pokemon;
        })
      );

      this.pokemonList = basePokemon.filter((pokemon) => pokemon !== null);
      console.log(this.pokemonList);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }

  render() {
    return html`
      <demo-app-template data-cells-type="template">
        <div slot="app-main-content">
          ${this._mainTpl} ${this._listPokemonTpl}
        </div>
      </demo-app-template>
    `;
  }

  get _mainTpl() {
    return html`
      <div>
        <h3>${this.title}</h3>
        <bbva-web-link @click=${this.gotoAbout}>Go to About</bbva-web-link>
      </div>
    `;
  }

  get _listPokemonTpl() {
    return html`
      <div class="container">
        ${this.pokemonList
    ? this.pokemonList.map(
      (pokemon) => html`
                <div class="pokemon-container">
                  <img
                    class="pokemon-image"
                    src="${pokemon.sprites.front_default}"
                    alt="${pokemon.name}"
                  />
                  <div class="pokemon-name">${pokemon.name}</div>
                  <div class="pokemon-type">
                    ${pokemon.types.map(
    (typeInfo) => html`<span>${typeInfo.type.name}</span>`
  )}
                  </div>
                  <bbva-button-default
                    @click=${() => this.goToEvolution(pokemon.name)}
                    class="evolutions-button"
                    text="Evoluciones"
                  ></bbva-button-default>
                </div>
              `
    )
    : ''}
      </div>
    `;
  }

  goToHome() {
    this.navigate('home');
  }

  gotoAbout() {
    this.navigate('about');
  }

  goToEvolution(pokemonName) {
    this.navigate('evolution', { pokemonName });
  }
}

window.customElements.define(HomePage.is, HomePage);
