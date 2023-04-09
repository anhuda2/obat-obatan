import React, { useState } from "react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";
import './App.css';


const Obat = () => {
  const [modal, setModal] = useState(false);
  const [obatList, setObatList] = useState([
    {
      nama: "Paracetamol",
      jenis: "Analgesik",
      harga: "Rp 5.000",
    },
    {
      nama: "Amoxicillin",
      jenis: "Antibiotik",
      harga: "Rp 10.000",
    },
    {
      nama: "Cetirizine",
      jenis: "Antihistamin",
      harga: "Rp 8.000",
    },
  ]);
  
  const [newObat, setNewObat] = useState({
    nama: "",
    jenis: "",
    harga: "",
  });

  const toggleModal = () => setModal(!modal);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewObat((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addObat = (event) => {
    event.preventDefault();
    setObatList([...obatList, newObat]);
    setNewObat({
      nama: "",
      jenis: "",
      harga: "",
    });
    toggleModal();
  };

  return (
    <Container>
      <h1>Daftar Obat - Obatan</h1>
      <Button color="success" onClick={() => setModal(true)}>
        Tambah Obat
      </Button>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Tambah Obat Baru</ModalHeader>
        <ModalBody>
          <Form onSubmit={addObat}>
            <FormGroup>
              <Label for="nama">Nama Obat</Label>
              <Input
                type="text"
                name="nama"
                id="nama"
                placeholder="Masukkan nama obat"
                value={newObat.nama}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="jenis">Jenis Obat</Label>
              <Input
                type="text"
                name="jenis"
                id="jenis"
                placeholder="Masukkan jenis obat"
                value={newObat.jenis}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="harga">Harga Obat</Label>
              <Input
                type="text"
                name="harga"
                id="harga"
                placeholder="Masukkan harga obat"
                value={newObat.harga}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={addObat}>
            Tambah
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Batal
          </Button>
        </ModalFooter>
      </Modal>

      <Table>
        <thead>
        <tr class="table-header">
            <th>#</th>
            <th>Nama Obat</th>
            <th>Jenis Obat</th>
            <th>Harga Obat</th>
          </tr>
        </thead>
        <tbody>
          {obatList.map((obat, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{obat.nama}</td>
              <td>{obat.jenis}</td>
              <td>{obat.harga}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
export default Obat;
