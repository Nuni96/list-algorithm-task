import React, { useEffect, useState } from "react";
import "./HomeComponent.css";

function HomeComponent() {
  const [buttonTitle, setButtonTitle] = useState("Press ME!");
  const [error, setError] = useState("");
  const [arr, setArr] = useState([]);
  const [firstInputValue, setFirstInputValue] = useState(0);
  const [secondInputValue, setSecondInputValue] = useState(0);
  const [loading, setLoading] = useState(false);
  var [tempTableData, setTempTableData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [tableData, setTableData] = useState([
    {
      name: "Muzafer",
      score: 0,
    },
    { name: "Hakija", score: 0 },
    { name: "Hikmet", score: 0 },
    { name: "Ismet", score: 0 },
    { name: "Hakala", score: 0 },
    { name: "Karabaja", score: 0 },
  ]);
  // eslint-disable-next-line no-unused-vars
  const [tableDataSorting, setTableDataSorting] = useState([
    {
      name: "Muzafer",
      score: 0,
    },
    { name: "Hakija", score: 0 },
    { name: "Hikmet", score: 0 },
    { name: "Ismet", score: 0 },
    { name: "Hakala", score: 0 },
    { name: "Karabaja", score: 0 },
  ]);

  const onClickHandler = () => {
    for (;;) {
      const firstRandom = Math.floor(Math.random() * 6) + 1;
      const secondRandom = Math.floor(Math.random() * 6) + 1;
      const ascending = firstRandom.toString() + secondRandom.toString();
      const descending = secondRandom.toString() + firstRandom.toString();
      if (
        (!arr.includes(ascending) || !arr.includes(descending)) &&
        firstRandom !== secondRandom
      ) {
        setArr([...arr, ascending, descending]);
        setTempTableData([
          ...tempTableData,
          tableData[firstRandom - 1],
          tableData[secondRandom - 1],
        ]);
        setLoading(true);

        break;
      } else if (arr.length >= 30) {
        setButtonTitle("OPSS! You ran out of combinations!");
        break;
      }
    }
  };
  useEffect(() => {}, [loading]);

  const onClickSubmit = () => {
    if (firstInputValue > 0 && secondInputValue > 0) {
      if (firstInputValue > secondInputValue) {
        for (var i = 0; i < tableData.length; i++) {
          if (tempTableData[0].name === tableData[i].name) {
            tableData[i].score += 1;
            for (var a = 0; a < tableData.length; a++) {
              if (tableData[i].name === tableDataSorting[a].name)
                tableDataSorting[a].score += 1;
            }
          }
        }
      } else if (firstInputValue < secondInputValue) {
        for (var j = 0; j < tableData.length; j++) {
          if (tempTableData[1].name === tableData[j].name) {
            tableData[j].score += 1;
            for (var b = 0; b < tableData.length; b++) {
              if (tableData[j].name === tableDataSorting[b].name)
                tableDataSorting[b].score += 1;
            }
          }
        }
      } else if (firstInputValue === secondInputValue) {
        for (var k = 0; k < tableData.length; k++) {
          if (tempTableData[1].name === tableData[k].name) {
            tableData[k].score += 1;
            for (var c = 0; c < tableData.length; c++) {
              if (tableData[k].name === tableDataSorting[c].name)
                tableDataSorting[c].score += 1;
            }
          } else if (tempTableData[0].name === tableData[k].name) {
            tableData[k].score += 1;
            for (var d = 0; d < tableData.length; d++) {
              if (tableData[k].name === tableDataSorting[d].name)
                tableDataSorting[d].score += 1;
            }
          }
        }
      }
      setFirstInputValue(0);
      setSecondInputValue(0);
      setLoading(false);
      setTempTableData([]);
      setError("");
    } else {
      setError("Numbers must be greater than zero!!!");
    }
  };

  function handleChangeFirstInput(e) {
    setFirstInputValue(e.target.value);
  }
  function handleChangeSecondInput(e) {
    setSecondInputValue(e.target.value);
  }
  return (
    <div className="container mt-5">
      <div className="col mx-auto">
        <h2 className="text-center">GRM Digital Task</h2>
        <hr></hr>
        {!loading && (
          <>
            <table className="table mx-auto">
              <thead>
                <tr>
                  <th scope="col">Position</th>
                  <th scope="col">Name</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {tableDataSorting &&
                  tableDataSorting
                    .sort((a, b) => {
                      return b.score - a.score;
                    })
                    .map((item, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.score}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block w-100"
              onClick={onClickHandler}
            >
              {buttonTitle}
            </button>
          </>
        )}
        {loading && (
          <>
            <form>
              <div className="row">
                <div className="col">
                  <label htmlFor="firstInput">{tempTableData[0].name}</label>
                  <input
                    id="firstInput"
                    type="number"
                    className="form-control"
                    placeholder="Enter some value"
                    onChange={handleChangeFirstInput}
                    required={true}
                    min={0}
                    max={10000000}
                    minLength={1}
                  />
                </div>
                <div className="col">
                  <label htmlFor="secondInput">{tempTableData[1].name}</label>
                  <input
                    id="secondInput"
                    type="number"
                    className="form-control"
                    placeholder="Enter some value"
                    onChange={handleChangeSecondInput}
                    required={true}
                    min={0}
                    max={10000000}
                    minLength={1}
                  />
                </div>
              </div>
              <hr></hr>
              {error.length > 0 && <h3>{error}</h3>}
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block w-100"
                onClick={onClickSubmit}
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeComponent;
