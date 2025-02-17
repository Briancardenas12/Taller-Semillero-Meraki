import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default';
import '@cells-demo/demo-app-container/demo-app-container.js';

class EvolutionPage extends CellsPage {
  static get is() {
    return 'evolution-page';
  }

  static get properties() {
    return {
      fullName: { type: String },
      evolutions: { type: Array },
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
    this.fullName = 'Ronald';
    this.evolutions = [];
    this.getBulbasaurEvolutions();
  }

  async getBulbasaurEvolutions() {
    try {
      const bulbasaurResponse = await fetch(
        'https://pokeapi.co/api/v2/pokemon/1/'
      );
      const bulbasaurData = await bulbasaurResponse.json();

      const speciesResponse = await fetch(bulbasaurData.species.url);
      const speciesData = await speciesResponse.json();
      const evolutionChainUrl = speciesData.evolution_chain.url;

      const evolutionResponse = await fetch(evolutionChainUrl);
      const evolutionData = await evolutionResponse.json();

      let currentEvolution = evolutionData.chain;

      while (currentEvolution) {
        const evolutionName = currentEvolution.species.name;
        const evolutionDetails = await this.getPokemonDetails(evolutionName);

        this.evolutions = [
          ...this.evolutions,
          {
            name: evolutionName,
            image: evolutionDetails.image,
            types: evolutionDetails.types,
          },
        ];

        currentEvolution = currentEvolution.evolves_to[0];
      }

      this.evolutions = this.evolutions.slice(1); // Remove Bulbasaur itself
    } catch (error) {
      console.error('Error al obtener las evoluciones de Bulbasaur:', error);
    }
  }

  async getPokemonDetails(name) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}/`
      );
      const data = await response.json();
      const image = data.sprites.front_default;
      const types = data.types.map((typeInfo) => typeInfo.type.name);

      return { image, types };
    } catch (error) {
      console.error(`Error al obtener los detalles de ${name}:`, error);
      return { image: null, types: [] };
    }
  }

  render() {
    return html`
      <demo-app-template data-cells-type="template">
        <div slot="app-main-content">
          <h3>Evoluciones</h3>
          <bbva-button-default active="" @click=${this.gotoGoal}
            >Back To Home</bbva-button-default
          >
          ${this._listPokemonTpl}
        </div>
      </demo-app-template>
    `;
  }

  get _listPokemonTpl() {
    return html`
      <div class="container">
        ${this.evolutions
    ? this.evolutions.map(
      (pokemon) => html`
                <div class="pokemon-container">
                  <img
                    class="pokemon-image"
                    src="${pokemon.image}"
                    alt="${pokemon.name}"
                  />
                  <div class="pokemon-name">${pokemon.name}</div>
                  <div class="pokemon-type">
                    ${pokemon.types.map((type) => html`<span>${type}</span>`)}
                  </div>
                </div>
              `
    )
    : ''}
      </div>
    `;
  }

  gotoGoal() {
    this.navigate('home');
  }
}

window.customElements.define(EvolutionPage.is, EvolutionPage);
