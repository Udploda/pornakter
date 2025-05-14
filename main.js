const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const linkBox = document.getElementById('linkBox');
const downloadLink = document.getElementById('downloadLink');
const copyBtn = document.getElementById('copyBtn');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    if (data.link) {
      // Формируем полную ссылку для скачивания
      const link = 'http://localhost:5000' + data.link;
      downloadLink.value = link;
      linkBox.classList.remove('hidden');
    } else {
      alert('Ошибка: ' + (data.error || 'Неизвестная ошибка'));
    }
  } catch (err) {
    alert('Ошибка загрузки файла!');
  }
});

copyBtn.addEventListener('click', () => {
  downloadLink.select();
  document.execCommand('copy');
  copyBtn.textContent = 'Скопировано!';
  setTimeout(() => (copyBtn.textContent = 'Скопировать'), 1500);
}); 