import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/ModalForm'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Tem certeza que quer deletar?')
    if (confirmDelete) {
      fetch('http://localhost:8000/api/user/' + id, { method: 'delete' })
        //.then(response => response.json())
        //.then(item => {
        .then(response => {
          if (response.status === 200) {
            this.props.deleteItemFromState(id)
            //this.props.toggle()
          } else {
            alert("Falha ao Deletar");
            console.log('Falha ao adicionar')
          }

        })
        .catch(err => {
          console.log(err)
          alert("Falha ao excluir");
        })
    }
  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState} />
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Del</Button>
            </div>
          </td>
        </tr>
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable;