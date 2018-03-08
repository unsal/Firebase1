import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as firebase from "firebase";


class App extends Component {
  constructor() {
    super();



  firebase.initializeApp(config);

    this.state = { fbValue: 10 };
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  // eskiusul submitform(e) kullanırsan hata verir.
onClickCreate = e => {
   e.preventDefault();

   const usersRef = firebase.database().ref("users");
   const message = { zeynep: { date_of_birth: "March 5, 1971", full_name: "Ugur Yavuz" }, mehmet: { date_of_birth: "November 10, 1971", full_name: "Unsal Yavuz" } };

   usersRef.set(message);

}

  onClickUpdate = e => {
          e.preventDefault();
          // const yenimodeller = [{ model: "renault" }, { model: "bmw" }];
          // const message = { model: "vw" };
          const usersRef = firebase.database().ref("users");
          // const message = { zeynep: { date_of_birth: "March 5, 1971", full_name: "Ugur Yavuz" }, mehmet: { date_of_birth: "November 10, 1971", full_name: "Unsal Yavuz" } };

          const message = {
            unsal: { date_of_birth: this.dateofbirth.value, full_name: this.fullname.value },
            serpil: { date_of_birth: "November 10, 1971", full_name: "Unsal Yavuz" }
          };

          usersRef.update(message);

        };

  // onClickAdd = e => {
  //   e.preventDefault();

  //   const ref = firebase.database().ref("users");
  //   const message = { eylul: { date_of_birth: "zzzz", full_name: "zzz" } };

  // }

  // consol'a data döndürür.
  onClickLoadData(e) {
    e.preventDefault();

    firebase
      .database()
      .ref("profiller")
      .startAt("Ziyaretçi")
      .endAt("Ziyaretçi")
      .once("value", snap => console.log(snap.val()));
  }


  onClickRead = e => {
       e.preventDefault();

        //  const usersRef = firebase.database().ref("users").child("unsal");
        //  const childRef = usersRef.child("full_name");
        const childRef = firebase.database().ref("users/unsal/full_name");

         childRef.on("value", snap => {
              this.setState({ fbValue: snap.val() });
            });
  }


  onClickRemove = e => {
          e.preventDefault();

          const usersRef = firebase.database().ref("users");
          usersRef.child(this.textBox.value).remove();

  }


  render() {
    return <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">Firebase Value: {this.state.fbValue}</p>

        <div>
          <button onClick={this.onClickRead}>Read </button>
          <button onClick={this.onClickLoadData}>Load Data </button>
        </div>

        <div>
          <input type="text" ref={input => (this.username = input)} placeholder="username" />
          <input type="text" ref={input => (this.fullname = input)} placeholder="fullname" />
          <input type="text" ref={input => (this.dateofbirth = input)} placeholder="date of birth" />
          <button onClick={this.onClickUpdate}>Update</button>
        </div>

        <div>
          <input type="text" ref={input => (this.textBox = input)} />
          <button onClick={this.onClickRemove}>Remove </button>
        </div>
      </div>;
  }
}

export default App;
