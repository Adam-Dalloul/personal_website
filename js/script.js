const accessToken = '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';

fetch('https://api.github.com/repos/AdamDalloul/AdamDalloul.github.io/contents')
      .then(response => response.json())
      .then(data => {
        const projectsContainer = document.getElementById('projects-container');

        data.forEach(item => {
          if (item.type === 'dir') {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            const folderLink = document.createElement('a');
            folderLink.href = item.html_url;
            folderLink.target = '_blank';
            folderLink.textContent = item.name;
            projectCard.appendChild(folderLink);

            const linksContainer = document.createElement('div');
            linksContainer.classList.add('links-container');

            const websiteLink = document.createElement('a');
            websiteLink.href = `https://adamdalloul.github.io/${item.name}/`;
            websiteLink.target = '_blank';
            websiteLink.textContent = 'Visit Website';
            linksContainer.appendChild(websiteLink);           

            const codeLink = document.createElement('a');
            codeLink.href = item.html_url;
            codeLink.target = '_blank';
            codeLink.textContent = 'View Code on GitHub';
            linksContainer.appendChild(codeLink);

            projectCard.appendChild(linksContainer);

            projectsContainer.appendChild(projectCard);
          }
        });

        if (projectsContainer.childElementCount === 0) {
          const errorMessage = document.createElement('p');
          errorMessage.textContent = 'No project folders found.';
          projectsContainer.appendChild(errorMessage);
        }
      })
      .catch(error => {
        console.log(error);
        const projectsContainer = document.getElementById('projects-container');
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Failed to fetch repository data.';
        projectsContainer.appendChild(errorMessage);
      });