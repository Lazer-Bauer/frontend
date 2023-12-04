import { useEffect, useState } from "react";
import Card from "./Card";
import { getAll } from "../services/cardServices";
import { useAuth } from "../context/auth.context";

const Home = () => {
  const [cards, setCards] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    getAll()
      .then((response) => {
        setCards(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const replaceCard = (newCard) => {
    const newCards = cards.map((x) => {
      if (x._id === newCard._id) {
        return newCard;
      }
      return x;
    });
    setCards(newCards);
  };

  return (
    <div className="text-center bg-info">
      <h1>Business cards</h1>
      <p>Here you can find all business cards from all over the world </p>
      <div className="cards-container d-flex flex justify-content-center align-items-center flex-wrap  ">
        {cards.map((card) => (
          <Card
            userId={user?._id}
            details={card}
            key={card._id}
            replaceCard={replaceCard}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;