import React, { useEffect, useState } from "react";
import {
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
import "./App.css";
import axios from "axios";

const databaseURL =
  "https://data-barang-a8cf8-default-rtdb.asia-southeast1.firebasedatabase.app/";

function App() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${databaseURL}/obatList.json`);
        const data = response.data;
        if (data) {
          const obatArray = Object.keys(data).map((key, index) => ({
            id: index + 1,
            ...data[key],
          }));
          setObatList(obatArray);
        }
      } catch (error) {
        console.error("Error fetching obat data:", error);
      }
    };

    fetchData();
  }, []);

  const [obatList, setObatList] = useState([]);
  const [newObat, setNewObat] = useState({
    id: undefined,
    nama: "",
    jenis: "",
    harga: "",
  });

  const handleInputChange = (event) => {
    setNewObat({
      ...newObat,
      [event.target.name]: event.target.value,
    });
  };

  const addObat = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${databaseURL}/obatList.json`, newObat);
      const id = response.data.name;
      const numericId = obatList.length + 1;
      setObatList([...obatList, { ...newObat, id: numericId }]);
      setNewObat({
        id: undefined,
        nama: "",
        jenis: "",
        harga: "",
      });
      toggleModal();
    } catch (error) {
      console.error("Error adding obat:", error);
    }
  };

  const editObat = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${databaseURL}/obatList/${newObat.id}.json`, newObat);
      const updatedObatList = obatList.map((obat) =>
        obat.id === newObat.id ? newObat : obat
      );
      setObatList(updatedObatList);
      setNewObat({
        id: undefined,
        nama: "",
        jenis: "",
        harga: "",
      });
      toggleModal();
    } catch (error) {
      console.error("Error editing obat:", error);
    }
  };

  const deleteObat = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this obat?");
    if (confirmDelete) {
      try {
        await axios.delete(`${databaseURL}/obatList/${id}.json`);
        const filteredObatList = obatList.filter((obat) => obat.id !== id);
        setObatList(filteredObatList);
      } catch (error) {
        console.error("Error deleting obat:", error);
      }
    }
  };
  

  return (
    <div className="App">
      <h1>Data Obat</h1>
      <Button color="success" onClick={toggleModal}>
        Tambah Obat
      </Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Tambah Obat</ModalHeader>
        <ModalBody>
          <Form onSubmit={newObat.id ? editObat : addObat}>
            <FormGroup>
              <Label for="nama">Nama Obat</Label>
              <Input
                type="text"
                name="nama"
                id="nama"
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
                value={newObat.harga}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button type="submit" color="primary">
              Simpan
            </Button>{" "}
            <Button color="secondary" onClick={toggleModal}>
              Batal
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Jenis</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {obatList.map((obat) => (
            <tr key={obat.id}>
              <td>{obat.id}</td>
              <td>{obat.nama}</td>
              <td>{obat.jenis}</td>
              <td>{obat.harga}</td>
              <td>
                <Button
                  color="warning"
                  size="sm"
                  className="mr-2"
                  onClick={() => {
                    toggleModal();
                    setNewObat(obat);
                  }}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => {
                    deleteObat(obat.id);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
