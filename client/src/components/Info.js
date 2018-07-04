import React from 'react'

const style = {
  main: {
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  heading: {
    textAlign: "center",
    width: "100%",
    fontWeight: "300",
    lineHeight: "120%"
  }
}

const Info = () => {
  return (
    <div className="info-main" style={style.main}>
      <div style={style.heading}>
        <h1 style={style.heading}>Designed and built by Mike J Mitchell using  <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">Reactjs</a> , JavaScript and  <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">Material-Ui.</a> </h1>
      </div>
      <div style={style.heading}>
        <h2 style={style.heading}>API data scraped from <a href="https://www.thecocktaildb.com/api.php" target="_blank" rel="noopener noreferrer">The Cocktail DB</a> and self hosted using Express, Mongoose and <a href="https://mlab.com" target="_blank" rel="noopener noreferrer">mLab.</a></h2>
        <h2>Click <a href="https://github.com/mimitch2/mjm-cocktails" target="_blank" rel="noopener noreferrer">here </a>to see the code for this app.</h2>
      </div>
    </div>
  )
}

export default Info;