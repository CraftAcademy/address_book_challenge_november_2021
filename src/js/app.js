const addressBook = new AddressBook();
const addressList = document.querySelector("[name=address_list] ul");

const handleForm = (form) => {
  const name = form.elements.name.value;
  const phone = form.elements.phone.value;
  const twitter = form.elements.twitter.value;
  addressBook.create({ name: name, phone: phone, twitter: twitter });
  form.reset();
  displayEntries();
  return false
};

const displayEntries = () => {
  addressList.innerHTML = "";
  const entries = addressBook.index();
  let html;
  entries.forEach((entry) => {
    html = `<span>Name: </span><span>${entry.name}</span> `;
    html += `<span>Phone: </span><span>${entry.phone}</span> `;
    html += `<span>Twitter: </span><span>${entry.twitter}</span>`;
    html += `<button onclick="editEntry('${entry.name}')">Edit</button>`;
    let newListItem = document.createElement("li");
    newListItem.innerHTML = html;
    addressList.appendChild(newListItem);
  });
};

const editEntry = (name) => {
  debugger;
};
displayEntries();

