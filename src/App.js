import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import axios from "axios";


const App = () => {
  const headers = ["#", "Placename", "Country"];

  const [data, setData] = useState([]);
  const [pageLimit, setPageLimit] = useState(5);
  const [search, setSearch] = useState("");

  // api handler for getting cities data.
  const getApiData = async () => {
    try {
      const response = await axios.request({
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        params: {
          limit: pageLimit,
          countryIds: 'IN',
          namePrefix: search || "del"
        },
        headers: {
          'X-RapidAPI-Key': 'af0095dc2cmsh88245b6a5c2bd36p1843f2jsnc6799d29651a',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      });
      let resArr = [];

      response?.data?.data?.forEach((element, index) => {
        let flag = `https://flagsapi.com/${element?.countryCode}/shiny/64.png`;
        let resultObj = {};
        resultObj.index = index + 1;
        resultObj.place = element?.name;
        resultObj.country = flag;
        resArr?.push(resultObj);
      });
      setData(resArr);
    } catch (error) {
      console.log("Eror___ ", error);
    }
  }

  useEffect(() => {
    if (pageLimit <= 10) {
      getApiData();
    } else {
      alert("Page Limit should be less than or equal to 10.")
    }
  }, [pageLimit])


  return (
    <div>
      <div className="search-container">
        {/* input for searching data  */}
        <form onSubmit={(e) => {
          e?.preventDefault();
          getApiData()
        }}>
          <input type="text" className="search-box" placeholder="Search places..." onChange={(event) => setSearch(event?.target?.value)} />
        </form>
        <span className="keyboard-shortcut">Ctrl + /</span>
      </div>

      {/* table component */}
      <Table headers={headers} data={data} search={search} />

      {/* Pagination */}
      <div className='paginationWrapper' >
        <p>Pagination</p>
        <button onClick={() => setPageLimit(5)} >5</button>
        <button onClick={() => setPageLimit(10)}>10</button>
        <div className='paginationInput' >
          <input className="search-box" value={pageLimit} onChange={(e) => setPageLimit(e?.target?.value)} onSubmit={getApiData} />
        </div>
      </div>
    </div>
  );
};

export default App;
