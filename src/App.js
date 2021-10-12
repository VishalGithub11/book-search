import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");

  const [result, setResult] = useState("");

  const [id, setId] = useState("");

  const [error, setError] = useState(false);

  const fetchData = async () => {
    const url = `https://lspl-bookie.glitch.me/books/${search}/details?key=Fo8UprJg2kQyDscaJjNKon5UF`;
    await fetch(url, {
      method: "GET",
      headers: {
        mode: "cors",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
      })
      .catch(() => setError(true));
  };

  const fetchOtherApi = async () => {
    const url = `https://lspl-info4you.glitch.me/search?isbn${search}`;
    await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setId(data.ID);
      })
      .catch((e) => {
        console.log("error", e);
        setError(true);
      });
  };

  useEffect(() => {
    fetch(`https://lspl-info4you.glitch.me/info${id}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
      });
  }, [id]);

  console.log(result);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOtherApi();
  };

  return (
    <div className="App">
      <h1>Get Book-Details By using ISBN</h1>

      <div className="container">
        <div className="search">
          <form onSubmit={handleSubmit}>
            <input
              value={search}
              onChange={(e) => {
                setError(false);
                setSearch(e.target.value);
              }}
              placeholder="search..using ISBN "
            />
            <input type="submit" value="search" />
          </form>
        </div>
        <div className="content">
          <p>ISBN: </p> <p>{result.ISBN} </p>
          <p>Name: </p> <p> {result.Name} </p>
          <p>Author:</p> <p>{result.Author} </p>
          <p>Publisher: </p> <p>{result.Publisher} </p>
        </div>
        {error && (
          <p style={{ color: "#ffff" }}>
            * Api used here is not fetching data, it is throwing "CORS-policy"
            error.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
