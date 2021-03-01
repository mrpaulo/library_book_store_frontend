import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { Book } from '../../../store/ducks/books/types';
import { ApplicationState } from '../../../store';

import * as booksActions from '../../../store/ducks/books/actions';

interface StateProps {
  books: Book[]
}

interface DispatchProps {
  loadRequest(): void
}

type Props = StateProps & DispatchProps

class BookList extends Component<Props> {
  componentDidMount() {
    const { loadRequest } = this.props;

    loadRequest();
  }

  addBook(){
    console.log("Adicionar livro")
  }

  editBook(id: number) {
    console.log("Editar livro id "+ id)
  }

  eraseBook(id: number, name: String) {
    console.log("Editar livro: " + name + " id " + id )
  }


  render() {
    const { books } = this.props;
   
    return (
      <div className="container">
          <div className="row">
              <div className="col-md-11">
                  <h3>Resultado Consulta de Livros</h3>
              </div>
              <div className="col-md-1">
                  {/* <button className="btn btn-alert" onClick={() => this.props.history.push(`/login`)}>Sair</button> */}
              </div>
          </div>
          
          {/* {this.state.message && <div class="alert alert-success">{this.state.message}</div>} */}
          <div className="container">
              <table className="table">
                  <thead>
                      <tr>                          
                          <th>Título</th>
                          <th>Subtítulo</th>
                          <th>Data Publicação</th>
                          <th>Avaliação</th>
                          <th> </th>
                          <th> </th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                          books.map(
                              book =>
                                  <tr key={book.id}>
                                      <td>{book.title}</td>
                                      <td>{book.subtitle}</td>
                                      <td>{book.publishDate}</td>
                                      <td>{book.rating}</td>
                                      <td><button className="btn btn-success" onClick={() => this.editBook(book.id)}>Editar</button></td>
                                      <td><button className="btn btn-warning" onClick={() => {if (window.confirm(`Você tem certeza que deseja excluir ${book.title}?`)) {this.eraseBook(book.id, book.title)}}}>Excluir</button></td>
                                  </tr>
                          )
                      }
                  </tbody>
              </table>
              <div className="row">
                  <button className="btn btn-success" onClick={this.addBook}>Adicionar</button>
              </div>
          </div>
      </div>
  )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  books: state.books.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookList);