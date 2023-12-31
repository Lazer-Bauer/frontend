import axios from "axios";

export async function getAll() {
  const response = await axios.get(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
  );
  return response;
}
export async function createCard(values) {
  const response = await axios.post(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
    values
  );
  return response;
}

export async function getAllMyCards() {
  const response = await axios.get(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards"
  );
  return response;
}
export async function deleteCard(id) {
  const response = await axios.delete(
    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
  );
  return response;
}
export async function editCard(id, values) {
  const response = await axios.put(
    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
    values
  );
  return response;
}
export async function getCard(id) {
  const response = await axios.get(
    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
  );
  return response;
}
