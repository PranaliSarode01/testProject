import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function Home() {

  const [newsData, setnewsData] = useState(null)

  const url = 'https://newsapi.org/v2/everything?q=tesla&from=2022-08-20&sortBy=publishedAt&apiKey=f37364d011454aeabd6a3de0c1a16b76'

  let navigate = useNavigate()

  useEffect (()=>{
    getNews()
  },[])

  const getNews = async() =>{
  let res = await axios.get(url)
  setnewsData(res.data.articles)
  console.log(res.data.articles)
  }

  const logout = () => {
    navigate('/')
  }

  return (
    <div>
      <nav className="flex items-center justify-between bg-teal-600 p-2 h-14">
        <div>
          <h1 className=" text-white font-bold text-2xl">Test Project</h1>
        </div>
        <div className="flex gap-x-4">
          <h1 className=" text-white pt-2">Welcome</h1>
          <button className=" border-2 bg-white text-teal-600 px-2 py-1" onClick={logout}>
            Logout
          </button>
          </div>
      </nav>
        <div className="flex flex-col  justify-center items-center bg-slate-100" >
          {newsData && newsData.map((news,i)=>(
          <div className="w-96 items-center justify-center flex flex-col my-6 p-5 bg-white rounded-md">
            <p className="font-bold">{news.title}</p>
            <img src={news.urlToImage && news.urlToImage} width={400} className=" m-4"/>
            <p> <u>NEWS: </u>{news.description}</p>
          </div>
          ))}
        </div>
    </div>
  )
}

export default Home