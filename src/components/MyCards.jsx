import { useEffect, useState } from "react";
import Card from "./Card";
import { getAllMyCards } from "../services/cardServices";
import { useAuth } from "../context/auth.context";

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    getAllMyCards()
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
      <h1>My Cards</h1>
      <p>Here you can find all your cards</p>
      {!cards.length ? (
        <p>You don't have any cards yet, </p>
      ) : (
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
      )}
    </div>
  );
};
export default MyCards;
