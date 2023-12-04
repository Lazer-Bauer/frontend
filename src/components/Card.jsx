import axios from "axios";
import { useEffect, useState } from "react";

const Card = ({ details, replaceCard, userId }) => {
  const [isLike, setIsLike] = useState(false);

  const onLike = async () => {
    try {
      console.log("try");
      const response = await axios.patch(
        `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${details._id}`
      );
      console.log(response);
      setIsLike((prev) => !prev);
    } catch (error) {
      console.log(error);
    }

    // send like/unlike request to server
    // get card details by id: newCard = await ...
    // props.replaceCard(newCard);
  };
  useEffect(() => {
    const isUserId = details.likes.includes(userId);
    setIsLike(isUserId);
  }, [userId]);
  return (
    <div className="card m-4" style={{ width: "18rem" }}>
      <img
        src={details.image.url}
        className="card-img-top"
        alt={details.image.alt}
      />
      <div className="card-body">
        <h5 className="card-title">{details.title}</h5>

        <p className="card-text">{details.subtitle}</p>
        <p>Email: {details.email}</p>
        <p>Phone: {details.phone}</p>
        <p>{details.createdAt}</p>
      </div>
      <div className="d-flex">
        <i className="bi bi-trash3 pr-5"></i>
        <i
          onClick={() => onLike()}
          className={`bi bi-heart-fill px-2 ${isLike ? "likedCard" : ""}`}
        ></i>
        <i className="bi bi-pencil px-2"></i>
        <i className="bi bi-telephone-fill"></i>
      </div>
    </div>
  );
};
export default Card;
