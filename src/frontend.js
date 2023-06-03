// Função para enviar uma solicitação POST para criar um urso
const createUrso = async (event) => {
    event.preventDefault();
  
    const nameInput = document.getElementById('name-input');
    const ageInput = document.getElementById('age-input');
    const descriptionInput = document.getElementById('description-input');
    const genderInput = document.getElementById('gender-input');
  
    const ursoData = {
      name: nameInput.value,
      age: parseInt(ageInput.value),
      description: descriptionInput.value,
      gender: genderInput.checked
    };
  
    const response = await fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ursoData)
    });
  
    if (response.ok) {
      alert('Urso criado com sucesso!');
      nameInput.value = '';
      ageInput.value = '';
      descriptionInput.value = '';
      genderInput.checked = false;
      loadUrsos();
    } else {
      alert('Erro ao criar urso. Por favor, tente novamente.');
    }
  };
  
  // Função para carregar a lista de ursos
  const loadUrsos = async () => {
    const response = await fetch('/ursos');
    const ursos = await response.json();
  
    const ursosTable = document.getElementById('ursos-table');
    const tbody = ursosTable.querySelector('tbody');
    tbody.innerHTML = '';
  
    ursos.forEach((urso) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${urso.id}</td>
        <td>${urso.name}</td>
        <td>${urso.age}</td>
        <td>${urso.description}</td>
        <td>${urso.gender ? 'Masculino' : 'Feminino'}</td>
        <td>
          <button onclick="deleteUrso(${urso.id})">Excluir</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  };
  
  // Função para enviar uma solicitação DELETE para excluir um urso
  const deleteUrso = async (id) => {
    const confirmDelete = confirm('Tem certeza que deseja excluir este urso?');
  
    if (confirmDelete) {
      const response = await fetch(`/ursos/${id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        alert('Urso excluído com sucesso!');
        loadUrsos();
      } else {
        alert('Erro ao excluir urso. Por favor, tente novamente.');
      }
    }
  };
  
  // Carregar a lista de ursos quando a página é carregada
  document.addEventListener('DOMContentLoaded', () => {
    loadUrsos();
  });
  
  // Adicionar evento de submit ao formulário
  const createForm = document.getElementById('create-form');
  createForm.addEventListener('submit', createUrso);
  