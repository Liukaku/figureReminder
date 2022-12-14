import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [title, updateTitle] = useState("");
  const [email, updateEmail] = useState("");
  const [release, updateRelease] = useState("");
  const [remind, updateRemind] = useState("");
  const [url, updateURL] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const state = {
      title: title,
      email: email,
      release: new Date(release).getTime(),
      remind: new Date(remind).getTime(),
      url: url,
    };
    console.log(state);
    const liveURL = `https://europe-west2-anime-figures-7122a.cloudfunctions.net/api`;
    const devURL = `http://localhost:5001/anime-figures-7122a/europe-west2/api`;
    const query = `https://www.gamersheek.co.uk/good-smile-company-c779/scale-figures-c1038/1-7-scale-c1049/falslander-1-7-scale-samurai-p14238`;
    const request = await fetch(`${liveURL}/newAdd`, {
      method: `POST`,
      body: JSON.stringify(state),
    });
    const status = request.status;
    const res = await request.json();
    switch (status) {
      case 500:
        console.error(res);
        break;
      case 200:
        console.log(res);
      default:
        console.log(res);
        break;
    }
  };

  return (
    <div className="">
      <Head>
        <title>Figure Pre-order Reminder</title>
        <meta
          name="description"
          content="Platform to set up email reminders for figure release pre-orders"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-10/12 mx-auto mt-10">
        <div className=" text-white">
          <h1 className="text-center font-black text-4xl">Add Reminder</h1>
          <form
            className="w-3/12 mx-auto"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label className="w-full inline-block mt-5" htmlFor="title">
              Title:
            </label>
            <input
              onChange={(e) => updateTitle(e.target.value)}
              className="w-full rounded-md text-black"
              type="text"
              name="title"
              id="title"
              required
            />
            <label className="w-full inline-block mt-5" htmlFor="email">
              Email:
            </label>
            <input
              onChange={(e) => updateEmail(e.target.value)}
              className="w-full rounded-md text-black"
              type="text"
              name="email"
              id="email"
              required
            />
            <label className="w-full inline-block mt-5 " htmlFor="release">
              Estimated Release Date:
            </label>
            <input
              onChange={(e) => updateRelease(e.target.value)}
              value={release}
              className="w-full rounded-md text-black"
              type="date"
              name="release"
              id=""
              required
            />
            <label className="w-full inline-block mt-5" htmlFor="reminder">
              Reminder:
            </label>
            <input
              onChange={(e) => updateRemind(e.target.value)}
              className="w-full rounded-md text-black"
              type="date"
              name="reminder"
              id=""
              required
            />
            <label className="w-full inline-block mt-5" htmlFor="url">
              Example Image URL:
            </label>
            <input
              onChange={(e) => updateURL(e.target.value)}
              className="w-full rounded-md text-black"
              type="text"
              name="url"
              id=""
              required
            />
            <input
              className="mt-5 cursor-pointer font-bold border border-white rounded-sm w-full text-center bg-zinc-800 hover:bg-zinc-600 active:bg-zinc-400 ease-in-out duration-200 hover:-translate-y-1 active:translate-y-0.5 hover:drop-shadow-[0_5px_5px_rgba(255,255,255,0.3)]"
              type="submit"
              value="Submit"
            />
          </form>
          <div className="w-1/4 mx-auto mt-5">
            <img src={url} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
