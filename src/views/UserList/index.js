import React, { Component } from "react"
import { getUserList, Deleting } from '../../api/user.api';
import List from './List'

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
        list: [],
        modal: false,
        id: "",
        openmenu: false
    }
  }

  toggle = (_id) => {
    this.setState({
        modal: !this.state.modal,
        id: _id
    })
  }

  handleDeleting = async () => {
    const id = this.state.id
    await Deleting(id).then(res => {
      const users = res.data
      this.setState({
          users,
          modal: false,
      })
      const { history } = this.props
      history.push('/')
    }).catch(err => {
        this.setState({
            modal: false,
        })
    })
  }
  getUserList = async () => {
    await getUserList().then(res => {
      this.setState({
          list: res.data
      })
    }).catch(err => {
    })
  }
  componentDidMount = async () => {
    await this.getUserList()
  }

  editUser = (id) => {
    this.props.history.push(`/user/${id}`)
  }
  render() {
      return (
          <List
              list={this.state.list}
              editUser={this.editUser}
              toggle={this.toggle}
              modal={this.state.modal}
              handleDeleting={this.handleDeleting}
          />
      )
  }
}

export default UserList;
