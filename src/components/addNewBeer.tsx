import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import HouzzBeer from "../assets/houuz_beer.png";
import { Beer } from "../types/beer";

interface AddNewBeerModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    beers: Beer[];
    setBeers: (beers: Beer[]) => void;
}

const AddNewBeerModal: React.FC<AddNewBeerModalProps> = ({ showModal, setShowModal, beers, setBeers }) => {
  const [beerName, setBeerName] = useState<string>("");
  const [beerTagline, setBeerTagline] = useState<string>("");
  const [beerDescription, setBeerDescription] = useState<string>("");
  const [beerNameValid, setBeerNameValid] = useState<boolean>(true); // State to track name field validity
  const [taglineValid, setTaglineValid] = useState<boolean>(true);
  const [descriptionValid, setDescriptionValid] = useState<boolean>(true);

  const validateFields = () => {
    let isValid = true;
    if (beerName.trim() === "") {
      setBeerNameValid(false);
      isValid = false;
    }

    if (beerTagline.trim() === "") {
      setTaglineValid(false);
      isValid = false;
    }

    if (beerDescription.trim() === "") {
      setDescriptionValid(false);
      isValid = false;
    }
    return isValid;
  };

  const addNewBeer = () => {
    const allFieldsValid = validateFields();
    if (!allFieldsValid) return;

    const beerToAdd: Beer = {
      id: Math.random(),
      name: beerName,
      tagline: beerTagline,
      description: beerDescription,
      image_url: "../assets/houuz_beer.png",
      ingredients: {
        malt: [],
        hops: [],
        yeast: "",
      }
    };

    const updatedBeers = [...beers, beerToAdd];
    setBeers(updatedBeers);

    // Save updated custom beers to localStorage
    localStorage.setItem("customBeers", JSON.stringify(updatedBeers));

    closeModal();
  };

  const resetForm = () => {
    setBeerNameValid(true);
    setTaglineValid(true);
    setDescriptionValid(true);
    setBeerName("");
    setBeerDescription("");
    setBeerTagline("");
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleBeerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBeerNameValid(value.trim() !== "");
    setBeerName(value);
  };

  const handleBeerGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaglineValid(value.trim() !== "");
    setBeerTagline(value);
  };

  const handleBeerDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setDescriptionValid(value.trim() !== "");
    setBeerDescription(value);
  };

  return (
    <Modal
      show={showModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => closeModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a New Beer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          className="border rounded mb-4"
          src={HouzzBeer}
          alt="Houzz Beer"
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicBeerName">
            <Form.Control
              isInvalid={!beerNameValid}
              type="text"
              placeholder="Beer Name*"
              value={beerName}
              onChange={handleBeerNameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTagline">
            <Form.Control
              isInvalid={!taglineValid}
              type="text"
              placeholder="Tagline*"
              value={beerTagline}
              onChange={handleBeerGenreChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Control
              isInvalid={!descriptionValid}
              as="textarea"
              rows={3}
              placeholder="Description *"
              value={beerDescription}
              onChange={handleBeerDescriptionChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            closeModal();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            addNewBeer();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewBeerModal;
