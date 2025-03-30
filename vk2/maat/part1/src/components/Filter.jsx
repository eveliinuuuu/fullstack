const Filter = ({ handleFilter }) => {
  //console.log("running filter")
    return (
      <div>
        Find countries: <input onChange={handleFilter} />
      </div>
    )
  }

export default Filter