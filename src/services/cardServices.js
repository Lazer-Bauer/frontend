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

const cardsService = {
  getAll,
  createCard,
  getAllMyCards,
};

export default cardsService;
