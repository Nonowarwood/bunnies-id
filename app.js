const members = [
  { name: 'Minji', photo: 'assets/id/Kim Minji 🐻.jpeg' },
  { name: 'Hanni', photo: 'hanni.jpeg' },
  { name: 'Danielle', photo: 'assets/id/804877764682661318.jpeg' },
  { name: 'Haerin', photo: 'assets/id/1093178509540906563.jpeg' },
  { name: 'Hyein', photo: 'assets/id/907123549952762483.jpeg' }
];
let selected = 1;
const $ = (id) => document.getElementById(id);
const grid = $('memberGrid');

function renderMembers() {
  grid.innerHTML = members.map((member, index) => `
    <button class="member ${index === selected ? 'active' : ''}" type="button" data-index="${index}">
      <span class="member-picture"><img src="${member.photo}" alt="${member.name}" /></span><span>${member.name.toUpperCase()}</span>
    </button>`).join('');
  grid.querySelectorAll('.member').forEach((button) => button.addEventListener('click', () => {
    selected = Number(button.dataset.index);
    $('memberPhoto').src = members[selected].photo;
    $('memberPhoto').alt = members[selected].name;
    $('memberLabel').textContent = `${members[selected].name.toUpperCase()} ID`;
    $('signature').textContent = members[selected].name.toLowerCase();
    renderMembers();
  }));
}
function update() {
  $('outName').textContent = $('name').value.trim() || 'TON NOM';
  $('outLocation').textContent = $('location').value.trim() || 'PARIS, FRANCE';
  $('outSince').textContent = $('since').value;
  $('outSong').textContent = $('song').value;
}
function reset() {
  $('cardForm').reset(); selected = 1; update();
  $('memberPhoto').src = members[1].photo; $('memberPhoto').alt = members[1].name;
  $('memberLabel').textContent = 'HANNI ID'; $('signature').textContent = 'hanni'; renderMembers();
}
async function download() {
  const button = $('download'); const old = button.innerHTML;
  button.textContent = 'PRÉPARATION…';
  try {
    const canvas = await html2canvas($('idCard'), { scale: 3, backgroundColor: '#fffdf7', useCORS: true });
    const link = document.createElement('a'); link.download = `bunnies-id-${$('outName').textContent.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png'); link.click();
  } catch (error) { alert("L'export n'a pas fonctionné. Essaie à nouveau."); }
  button.innerHTML = old;
}
renderMembers(); update();
['name', 'location', 'since', 'song'].forEach(id => $(id).addEventListener('input', update));
$('download').addEventListener('click', download); $('downloadMobile').addEventListener('click', download);
$('reset').addEventListener('click', reset); $('resetMobile').addEventListener('click', reset);
