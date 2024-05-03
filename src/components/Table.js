import React from 'react';
import "./table.css";


const Table = ({ headers, data }) => {
    return (
        <div className="tableWrapper">
            <table className="responsiveTable">
                <thead>
                    <tr>
                        {/* mapping heads of the table */}
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* mapping the table data coming from the api. */}
                    {data?.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.index}</td>
                            <td>{item.place}</td>
                            <td><img src={item.country} alt="Flag" /></td>
                        </tr>
                    }
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table