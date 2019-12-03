import React, { Component } from 'react';
import './PersonaliaItem.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DropdownPersonalia from '../compenents/DropdownPersonalia'

class PersonaliaItem extends Component {

    state = {
        item: {},
        modalOpen: false,
        isEdited: false,
        isWantToSaveEdit: false,
    }

    toggleModal = () => {
        const { modalOpen } = this.state;
        if (modalOpen == false) {
            this.setState({ modalOpen: true })
        } else {
            this.setState({ modalOpen: false })
        }
    };

    toggleEdit = () => {
        const { isEdited } = this.state;
        if (isEdited == false) {
            this.setState({ isEdited: true })
        } else {
            this.setState({ isEdited: false })
        }
    };

    toogleSaveEdit = () => {
        const { isWantToSaveEdit } = this.state;
        if (isWantToSaveEdit == false) {
            this.setState({ isWantToSaveEdit: true })
        } else {
            this.setState({ isWantToSaveEdit: false })
        }
    }

    EditOrSaveHandler = () => {
        const { changeIndexEdited, id, handleSaveEdit } = this.props;
        const { isWantToSaveEdit } = this.state;
        this.toggleEdit();
        this.toogleSaveEdit();
        changeIndexEdited(id);
        if (isWantToSaveEdit) {
            handleSaveEdit();
        }
    }


    render() {
        const { handleDelete, options, handleEdit, id, item } = this.props;
        const { isEdited, modalOpen, isWantToSaveEdit } = this.state;
        return (
            <div className='item'>
                <img src={item.thumbnail} />
                <div className='text'>
                    {!isEdited ? <span>{item.value}</span> :
                        <div>
                            <DropdownPersonalia
                                options={options}
                                handleChange={handleEdit}
                                placeholder={item.label}
                            />
                        </div>}
                </div>
                <div className='item-container-btn'>
                    <Button className="btn" color="primary" onClick={this.EditOrSaveHandler}>
                        {isWantToSaveEdit ? "Simpan" : "Edit"}
                    </Button>
                    <Button className="btn" color="danger" onClick={this.toggleModal}>Delete</Button>
                </div>


                <div>
                    <Modal isOpen={modalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Delete Personalia</ModalHeader>
                        <ModalBody>
                            Yakin Ingin Menghapus Personalia ini ?</ModalBody>
                        <ModalFooter>
                            <Button color="primary"
                                onClick={() => {
                                    handleDelete(id)
                                    this.toggleModal()
                                }}>Ya</Button>{' '}
                            <Button color="secondary" onClick={this.toggleModal}>Tidak</Button>
                        </ModalFooter>
                    </Modal>
                </div>

            </div>


        )
    }
}


export default PersonaliaItem