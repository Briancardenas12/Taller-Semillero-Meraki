import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default';
import '@cells-demo/demo-app-container/demo-app-container.js';

class AboutPage extends CellsPage {
  static get is() {
    return 'about-page';
  }

  static get properties() {
    return {
      title: { type: String },
      fullname: { type: String },
      bio: { type: String },
      skills: { type: Array },
      projects: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = 'Acerca de:';
    this.fullname = 'Brian Alexis Cárdenas Castañeda';
    this.bio =
      'Soy un ingeniero apasionado por el desarrollador web con experiencia diferentes tecnologias';
    this.skills = ['HTML', 'CSS', 'Java', 'PHP', 'Python', 'CellsPage'];
    this.projects = [
      {
        name: 'Sistemas de notas PHP',
        description: 'Sistemas de Notas con (PHP -SQL -HTML -CSS)',
        link: 'https://github.com/Briancardenas12/Sistema-de-Notas-PHP',
      },
      {
        name: 'JFrameVeterina',
        description:
          'Se crea una aplicación por medio de la biblioteca gráfica swing, para el control de una veterinaria de registros por medio de un crud.',
        link: 'https://github.com/Briancardenas12/JFrameVeterina',
      },
    ];
  }

  render() {
    return html` <demo-app-template data-cells-type="template">
      <div slot="app-main-content">
        <h3>${this.title}</h3>
        <p>${this.fullname}</p>
        <div class="bio">
          <h4>Biografía</h4>
          <p>${this.bio}</p>
        </div>
        <div class="skills">
          <h4>Habilidades</h4>
          <ul>
            ${this.skills.map((skill) => html`<li>${skill}</li>`)}
          </ul>
        </div>
        <div class="projects">
          <h4>Proyectos</h4>
          <ul>
            ${this.projects.map(
    (project) => html`
                <li>
                  <strong>${project.name}</strong>: ${project.description}
                  <a href="${project.link}" target="_blank">Ver proyecto</a>
                </li>
              `
  )}
          </ul>
        </div>
        <bbva-button-default active="" @click=${this.gotoGoal}>
          Back To Home
        </bbva-button-default>
      </div>
    </demo-app-template>`;
  }

  gotoGoal() {
    this.navigate('home');
  }
}
window.customElements.define(AboutPage.is, AboutPage);
