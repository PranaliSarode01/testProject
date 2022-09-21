import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [tweetData, setTweetData] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    getTweets();
  }, []);

  const url = "/getTweets";
  const getTweets = async () => {
    let res = await axios.get(url);
    setTweetData(res.data.data);
    console.log(res.data.data);
  };

  const logout = () => {
    navigate("/");
  };

  return (
    <div>
      <nav className="flex items-center justify-between bg-teal-600 p-2 h-14">
        <div>
          <h1 className=" text-white font-bold text-2xl">Test Project</h1>
        </div>
        <div className="flex gap-x-4">
          <h1 className=" text-white pt-2">Welcome</h1>
          <button
            className=" border-2 bg-white text-teal-600 px-2 py-1"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex flex-col  justify-center items-center bg-slate-100">
        {tweetData &&
          tweetData.map((tweet, i) => (
            <div className="w-96 items-center justify-center flex flex-col my-6 p-5 bg-white rounded-md">
              <p className="">{tweet.text}</p>
              <p>
                {" "}
                <u>Source: </u>
                {tweet.source}
              </p>

              <div className=" text-gray-600 space-x-16 pt-4 ">
                <i className="fas fa-heart space-x-2 cursor-pointer hover:text-slate-400 rounded-xl">&nbsp;&nbsp;&nbsp;{tweet.public_metrics.like_count}</i>
                <i className="fas fa-comment m-1 cursor-pointer hover:text-slate-400 rounded-xl">&nbsp;&nbsp;&nbsp;{tweet.public_metrics.quote_count} </i>
                <i className="fas fa-upload m-1 cursor-pointer hover:text-slate-400 rounded-xl">&nbsp;&nbsp;&nbsp;{tweet.public_metrics.reply_count}</i>
                <i className="fas fa-retweet m-1 cursor-pointer hover:text-slate-400 rounded-xl">&nbsp;&nbsp;&nbsp;{tweet.public_metrics.retweet_count}</i>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
