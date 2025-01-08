"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
type movie = {
  id: number;
  name: string;
};

export default function Home() {
  const [movies, setMovies] = useState<movie[]>([]);
  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<number>();
  const [change, setChange] = useState<string>("");
  const [movie, setMovie] = useState<movie>();
  const [findMovie, setFindMovie] = useState<number>(0);
  // fetch all movies
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
      const data = await res.json();
      setMovies(data);
    };
    fetchData();
    console.log(movies);
  }, []);
  // add new movie
  async function submit() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        rating,
      }),
    });
    const respond = await res.json();
    setMovies(respond);
    console.log(respond);
  }
  // delete
  async function deletebutton(id: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    const respond = await res.json();
    setMovies(respond);
    console.log(respond);
  }
  // edit
  async function editSubmit(id: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/update`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name: change,
      }),
    });
    const respond = await res.json();
    setMovies(respond);
    console.log(respond);
  }
  // Fine One
  async function findOneButton(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/details/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const respond = await res.json();
    setMovie(respond);
    console.log(respond);
    // const movie1 = movies.find((movie) => movie.id == id);
    // if (!movie1) {
    //   return console.log("not found");
    // } else {
    //   setMovie(movie1);
    // }
    // console.log(movie);
  }
  return (
    <div>
      <div className="one">
        <label>Name</label>
        <input
          onChange={(e) => {
            setName(e.target.value);
            console.log(name);
          }}
          required
          className="border-border border"
          type="text"
          aria-label="Name"
        />
        <label>Your Rating</label>
        <input
          onChange={(e) => {
            setRating(Number(e.target.value));
          }}
          className="border-border border"
          type="number"
          aria-label="ID"
          required
        />
        <button
          onClick={() => {
            submit();
          }}>
          Submit
        </button>
      </div>
      <div className="two ">
        <input
          // value={change}
          className="border-border border m-7"
          onChange={(e) => setChange(e.target.value)}
        />
        {movies.map((movie) => (
          <div key={movie.id} className="p-7 flex gap-6">
            <div>{movie.name}</div>
            <div>{movie.id}</div>

            {/* <label htmlFor="name">edit</label> */}
            <button
              onClick={() => {
                deletebutton(movie.id);
                console.log(movie.id);
              }}>
              delete
            </button>
            <button
              onClick={() => {
                editSubmit(movie.id);
              }}>
              Submit
            </button>
          </div>
        ))}
        <div>
          <h3>Find Movie</h3>
          <div>
            <input
              type="number"
              onChange={(e) => {
                setFindMovie(Number(e.target.value));
                console.log(findMovie);
              }}
            />
            <button
              onClick={() => {
                findOneButton(findMovie);
                console.log(findMovie);
              }}>
              Submit
            </button>
            <Suspense>
              <div key={movie?.id} className="p-7 flex gap-6">
                <div>{movie?.name ? movie?.name : <p>not found</p>}</div>
                <div>{movie?.id ? movie?.id : <p>not found</p>}</div>

                {/* <label htmlFor="name">edit</label> */}
                <button
                  onClick={() => {
                    // deletebutton(movie?.id);
                    // console.log(movie?.id);
                  }}>
                  delete
                </button>
                <button
                  onClick={() => {
                    editSubmit(Number(movie?.id));
                  }}>
                  Submit
                </button>
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
