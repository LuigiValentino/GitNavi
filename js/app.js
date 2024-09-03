document.querySelectorAll('.action-btn').forEach(button => {
  button.addEventListener('click', handleActionSelection);
});
document.getElementById('generateBtn').addEventListener('click', generateCommands);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
document.getElementById('exportBtn').addEventListener('click', exportCommandsToScript);
document.getElementById('backBtn').addEventListener('click', () => goBackToStep(1));
document.getElementById('backBtn2').addEventListener('click', handleBackFromStep3);
document.getElementById('logo').addEventListener('click', () => showStep(1));

let currentAction = '';

function handleActionSelection(event) {
  currentAction = event.target.dataset.action;
  clearInputFields();
  displayFieldsForAction(currentAction);
  
  const noFieldsRequired = !document.getElementById('inputFields').hasChildNodes();
  if (noFieldsRequired) {
      generateCommands(); 
  } else {
      showStep(2); 
  }
}

function showStep(stepNumber) {
  anime({
      targets: '.step.visible',
      opacity: 0,
      translateX: -20,
      duration: 300,
      easing: 'easeInOutQuad',
      complete: function(anim) {
          document.querySelectorAll('.step').forEach(step => {
              step.classList.remove('visible');
              step.classList.add('hidden');
          });
          const step = document.getElementById(`step-${stepNumber}`);
          step.classList.remove('hidden');
          anime({
              targets: step,
              opacity: [0, 1],
              translateX: [20, 0],
              duration: 300,
              easing: 'easeInOutQuad',
              begin: function(anim) {
                  step.classList.add('visible');
              }
          });
      }
  });
}

function handleBackFromStep3() {
  const noFieldsRequired = !document.getElementById('inputFields').hasChildNodes();
  if (noFieldsRequired) {
      showStep(1);
  } else {
      showStep(2);
  }
}

function clearInputFields() {
  document.getElementById('inputFields').innerHTML = '';
}

function displayFieldsForAction(action) {
  const inputFields = document.getElementById('inputFields');
  switch(action) {
      case 'clone':
      case 'remote':
      case 'submodule':
          createInputField(inputFields, 'repoUrl', 'URL del Repositorio:', 'url', 'https://example.com/repo.git');
          break;
      case 'commit':
          createInputField(inputFields, 'commitMsg', 'Mensaje del Commit:', 'text', 'Mensaje del commit');
          break;
      case 'branch':
      case 'merge':
      case 'rebase':
      case 'reset':
      case 'cherry-pick':
      case 'revert':
          createInputField(inputFields, 'branchName', 'Nombre de la Rama/Commit:', 'text', 'nombre-de-la-rama');
          break;
      case 'rm':
      case 'mv':
      case 'restore':
          createInputField(inputFields, 'filePath', 'Ruta del Archivo:', 'text', 'ruta/al/archivo');
          break;
      case 'tag':
          createInputField(inputFields, 'tagName', 'Nombre de la Etiqueta:', 'text', 'v1.0');
          createInputField(inputFields, 'tagMsg', 'Mensaje de la Etiqueta:', 'text', 'Versión 1.0');
          break;
      default:
          break;
  }
}

function createInputField(container, id, label, type, placeholder) {
  const labelElement = document.createElement('label');
  labelElement.setAttribute('for', id);
  labelElement.innerText = label;
  
  const inputElement = document.createElement('input');
  inputElement.setAttribute('type', type);
  inputElement.setAttribute('id', id);
  inputElement.setAttribute('placeholder', placeholder);
  
  container.appendChild(labelElement);
  container.appendChild(inputElement);
}

function generateCommands() {
  let commands = '';
  let explanation = '';

  switch (currentAction) {
      case 'init':
          commands = generateInitCommands();
          explanation = generateInitExplanation();
          break;
      case 'clone':
          commands = generateCloneCommands();
          explanation = generateCloneExplanation();
          break;
      case 'commit':
          commands = generateCommitCommands();
          explanation = generateCommitExplanation();
          break;
      case 'remote':
          commands = generateRemoteCommands();
          explanation = generateRemoteExplanation();
          break;
      case 'branch':
          commands = generateBranchCommands();
          explanation = generateBranchExplanation();
          break;
      case 'status':
          commands = generateStatusCommands();
          explanation = generateStatusExplanation();
          break;
      case 'log':
          commands = generateLogCommands();
          explanation = generateLogExplanation();
          break;
      case 'merge':
          commands = generateMergeCommands();
          explanation = generateMergeExplanation();
          break;
      case 'rebase':
          commands = generateRebaseCommands();
          explanation = generateRebaseExplanation();
          break;
      case 'stash':
          commands = generateStashCommands();
          explanation = generateStashExplanation();
          break;
      case 'pull':
          commands = generatePullCommands();
          explanation = generatePullExplanation();
          break;
      case 'push':
          commands = generatePushCommands();
          explanation = generatePushExplanation();
          break;
      case 'fetch':
          commands = generateFetchCommands();
          explanation = generateFetchExplanation();
          break;
      case 'reset':
          commands = generateResetCommands();
          explanation = generateResetExplanation();
          break;
      case 'diff':
          commands = generateDiffCommands();
          explanation = generateDiffExplanation();
          break;
      case 'restore':
          commands = generateRestoreCommands();
          explanation = generateRestoreExplanation();
          break;
      case 'tag':
          commands = generateTagCommands();
          explanation = generateTagExplanation();
          break;
      case 'cherry-pick':
          commands = generateCherryPickCommands();
          explanation = generateCherryPickExplanation();
          break;
      case 'revert':
          commands = generateRevertCommands();
          explanation = generateRevertExplanation();
          break;
      case 'rm':
          commands = generateRmCommands();
          explanation = generateRmExplanation();
          break;
      case 'mv':
          commands = generateMvCommands();
          explanation = generateMvExplanation();
          break;
      case 'bisect':
          commands = generateBisectCommands();
          explanation = generateBisectExplanation();
          break;
      case 'submodule':
          commands = generateSubmoduleCommands();
          explanation = generateSubmoduleExplanation();
          break;
      default:
          commands = 'Por favor, selecciona una acción válida.';
          explanation = '';
  }

  displayCommands(commands, explanation);
  showStep(3);
}

function displayCommands(commands, explanation) {
  document.getElementById('output').innerText = commands.trim();
  document.getElementById('explanation').innerHTML = explanation.trim();
}

function copyToClipboard() {
  const commands = document.getElementById('output').innerText;
  navigator.clipboard.writeText(commands)
      .then(() => alert('Comandos copiados al portapapeles'))
      .catch(err => console.error('Error al copiar los comandos: ', err));
}

function exportCommandsToScript() {
  const commands = document.getElementById('output').innerText;
  const blob = new Blob([commands], { type: 'text/x-sh' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'git-commands.sh';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

function generateInitCommands() {
  return `git init`;
}

function generateInitExplanation() {
  return `<p><strong>git init:</strong> Inicializa un nuevo repositorio Git en el directorio actual.</p>`;
}

function generateCloneCommands() {
  const repoUrl = document.getElementById('repoUrl').value;
  return `git clone ${repoUrl}`;
}

function generateCloneExplanation() {
  return `<p><strong>git clone:</strong> Clona un repositorio remoto en tu máquina local.</p>`;
}

function generateCommitCommands() {
  const commitMsg = document.getElementById('commitMsg').value;
  return `git commit -m "${commitMsg}"`;
}

function generateCommitExplanation() {
  return `<p><strong>git commit:</strong> Crea un nuevo commit con los cambios actuales y añade un mensaje.</p>`;
}

function generateRemoteCommands() {
  const repoUrl = document.getElementById('repoUrl').value;
  return `git remote add origin ${repoUrl}`;
}

function generateRemoteExplanation() {
  return `<p><strong>git remote add origin:</strong> Añade un repositorio remoto como 'origin'.</p>`;
}

function generateBranchCommands() {
  const branchName = document.getElementById('branchName').value;
  return `git branch ${branchName}`;
}

function generateBranchExplanation() {
  return `<p><strong>git branch:</strong> Crea una nueva rama con el nombre especificado.</p>`;
}

function generateStatusCommands() {
  return `git status`;
}

function generateStatusExplanation() {
  return `<p><strong>git status:</strong> Muestra el estado de los archivos en el directorio de trabajo.</p>`;
}

function generateLogCommands() {
  return `git log --oneline --graph --all`;
}

function generateLogExplanation() {
  return `<p><strong>git log:</strong> Muestra el historial de commits en formato compacto y gráfico.</p>`;
}

function generateMergeCommands() {
  const branchName = document.getElementById('branchName').value;
  return `git merge ${branchName}`;
}

function generateMergeExplanation() {
  return `<p><strong>git merge:</strong> Fusiona la rama especificada con la rama actual.</p>`;
}

function generateRebaseCommands() {
  const branchName = document.getElementById('branchName').value;
  return `git rebase ${branchName}`;
}

function generateRebaseExplanation() {
  return `<p><strong>git rebase:</strong> Reubica la base de una rama encima de otra.</p>`;
}

function generateStashCommands() {
  return `git stash`;
}

function generateStashExplanation() {
  return `<p><strong>git stash:</strong> Guarda temporalmente los cambios no confirmados.</p>`;
}

function generatePullCommands() {
  return `git pull`;
}

function generatePullExplanation() {
  return `<p><strong>git pull:</strong> Descarga y fusiona los cambios del repositorio remoto.</p>`;
}

function generatePushCommands() {
  return `git push`;
}

function generatePushExplanation() {
  return `<p><strong>git push:</strong> Sube los cambios confirmados al repositorio remoto.</p>`;
}

function generateFetchCommands() {
  return `git fetch`;
}

function generateFetchExplanation() {
  return `<p><strong>git fetch:</strong> Descarga los cambios del repositorio remoto sin fusionarlos.</p>`;
}

function generateResetCommands() {
  const branchName = document.getElementById('branchName').value;
  return `git reset --hard ${branchName}`;
}

function generateResetExplanation() {
  return `<p><strong>git reset --hard:</strong> Resetea el índice y el árbol de trabajo al commit especificado.</p>`;
}

function generateDiffCommands() {
  return `git diff`;
}

function generateDiffExplanation() {
  return `<p><strong>git diff:</strong> Muestra las diferencias entre los cambios realizados y el último commit.</p>`;
}

function generateRestoreCommands() {
  const filePath = document.getElementById('filePath').value || 'ruta/al/archivo'; 
  return `git restore ${filePath}`;
}

function generateRestoreExplanation() {
  return `<p><strong>git restore:</strong> Restaura archivos modificados en el árbol de trabajo al último commit.</p>`;
}

function generateTagCommands() {
  const tagName = document.getElementById('tagName').value;
  const tagMsg = document.getElementById('tagMsg').value;
  return `
      git tag -a ${tagName} -m "${tagMsg}"
      git push origin ${tagName}
  `;
}

function generateTagExplanation() {
  return `
      <p><strong>git tag:</strong> Crea una nueva etiqueta anotada en el commit actual.</p>
      <p><strong>git push origin:</strong> Sube la etiqueta al repositorio remoto.</p>
  `;
}

function generateCherryPickCommands() {
  const branchName = document.getElementById('branchName').value;
  return `git cherry-pick ${branchName}`;
}

function generateCherryPickExplanation() {
  return `<p><strong>git cherry-pick:</strong> Aplica los cambios de un commit específico en la rama actual.</p>`;
}

function generateRevertCommands() {
  const branchName = document.getElementById('branchName').value;
  return `git revert ${branchName}`;
}

function generateRevertExplanation() {
  return `<p><strong>git revert:</strong> Deshace un commit específico creando un nuevo commit.</p>`;
}

function generateRmCommands() {
  const filePath = document.getElementById('filePath').value;
  return `git rm ${filePath}`;
}

function generateRmExplanation() {
  return `<p><strong>git rm:</strong> Elimina el archivo especificado del índice y del árbol de trabajo.</p>`;
}

function generateMvCommands() {
  const filePath = document.getElementById('filePath').value;
  return `git mv ${filePath}`;
}

function generateMvExplanation() {
  return `<p><strong>git mv:</strong> Mueve o renombra el archivo especificado.</p>`;
}

function generateBisectCommands() {
  return `
      git bisect start
      git bisect bad
      git bisect good <commit>
  `;
}

function generateBisectExplanation() {
  return `<p><strong>git bisect:</strong> Usa la búsqueda binaria para encontrar el commit que introdujo un bug.</p>`;
}

function generateSubmoduleCommands() {
  const repoUrl = document.getElementById('repoUrl').value;
  return `git submodule add ${repoUrl}`;
}

function generateSubmoduleExplanation() {
  return `<p><strong>git submodule add:</strong> Añade un repositorio como submódulo en el proyecto actual.</p>`;
}
