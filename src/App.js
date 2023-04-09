import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Table } from "reactstrap";
import "./App.css";

function App() {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

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

    const addObat = (event) => {
        event.preventDefault();
        const id = obatList.length + 1;
        setObatList([...obatList, { ...newObat, id: id }]);
        setNewObat({
            id: undefined,
            nama: "",
            jenis: "",
            harga: "",
        });
        toggleModal();
    };

    const editObat = (event) => {
        event.preventDefault();
        const updatedObatList = obatList.map((obat) => (obat.id === newObat.id ? newObat : obat));
        setObatList(updatedObatList);
        setNewObat({
            id: undefined,
            nama: "",
            jenis: "",
            harga: "",
        });
        toggleModal();
    };

    const deleteObat = () => {
        const filteredObatList = obatList.filter((obat) => obat.id !== newObat.id);
        setObatList(filteredObatList);
        setNewObat({
            id: undefined,
            nama: "",
            jenis: "",
            harga: "",
        });
        toggleModal();
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
                            <Input type="text" name="nama" id="nama" value={newObat.nama} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="jenis">Jenis Obat</Label>
                            <Input type="text" name="jenis" id="jenis" value={newObat.jenis} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="harga">Harga Obat</Label>
                            <Input type="text" name="harga" id="harga" value={newObat.harga} onChange={handleInputChange} />
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
                                        setNewObat(obat);
                                        deleteObat();
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
