import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/MyRecipes.css";
import { Button, CardGroup, Card, Modal, ListGroupItem } from "react-bootstrap";
import "../styles/MyRecipesCard.css";
import { FaHeart } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { BiTime } from "react-icons/bi";
import { GiCookingPot } from "react-icons/gi";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/react";
import { useAuth } from "../Conteaxts/autoConteaxt";

const override = css`
  position: fixed;
  top: 40%;
  left: 40%;
  border-color: red;
`;
const MyRecipesCard = (props) => {
  const [user, setUser] = useState();
  const { removeRecipe } = useAuth();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { recipe } = props;

  const getUser = () => {
    const userId = localStorage.getItem("user");
    if (userId) {
      setUser(userId);
    }
  };

  const deleteRecipe = async () => {
    setLoading(true);
    // setDisabled(false);
    const res = await removeRecipe(recipe._id);
    setLoading(false);
    if (res) window.location.reload();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="my-recipe-cards-container">
      <Card style={{ width: "25rem" }}>
        <Card.Img
          variant="top"
          src={recipe.picture || "./addRecipe/no-imag.png"}
        />
        <Card.Body>
          <Card.Title>
            <div className="recipe-cards-title-container">
              <div className="card-title-container">
                <b>{recipe.recipeTitle}</b>
              </div>
              <div className="card-likes-container">
                <button disabled={true} type="click" id="cards-like-button">
                  <FaHeart style={{ marginRight: "1rem" }} />
                  {recipe.likes}
                </button>
              </div>
            </div>
          </Card.Title>

          <div className="card-information-container">
            <div className="card-dish-type">
              <BiWorld id="world-icon" />
              <b>{recipe.cuisineType}</b>
            </div>
            <div className="card-dish-time">
              <BiTime id="time-icon" />
              <b>{recipe.preparationTime}min</b>
            </div>
            <div className="card-dish-level">
              <GiCookingPot id="level-icon" />
              <b>{recipe.dishLevel}</b>
            </div>
          </div>

          <div className="card-links">
            <NavLink
              exact
              to={`/recipe/${recipe._id}`}
              className="show-more-card"
            >
              <b>Show More</b>
            </NavLink>
            {user === recipe.writer && (
              <Button className="show-more-card" onClick={handleShow}>
                <span id="delete-button">Delete</span>
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal 
        className="delete-recipe-modal"
        show={show} 
        onHide={handleClose}>
        <Modal.Header closeButton>
          Confirm Deletion
        </Modal.Header>
        <Modal.Body>
          <span>Are you sure you want to delete this recipe?</span>
          <br/>
          <span>Please note that this action is irreverisble.</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button id="remove-recipe" variant="primary" onClick={deleteRecipe}>
            Delete Anyways
          </Button>
        </Modal.Footer>
        <BounceLoader
          css={override}
          size={80}
          color={"#B73032"}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default MyRecipesCard;
