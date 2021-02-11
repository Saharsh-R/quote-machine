import './App.scss';
import  { useState, useEffect } from 'react';
import COLORS from './colors'
import Button from 'react-bootstrap/Button'
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {faTwitter} from '@fortawesome/free-brands-svg-icons'

let qdb = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  let [quotesArray, setQuotesArray] =  useState('')
  let [quote, setQuote] = useState('')
  let [author, setAuthor] = useState('')
  let [bColor, setBColor] = useState('#000')


  const change = () => {
    let data = quotesArray[Math.floor(Math.random() * quotesArray.length)];
    setBColor(COLORS[Math.floor(Math.random() * COLORS.length)])
    setAuthor(data.author)
    setQuote(data.quote)
  }

  useEffect(  () => {
    if( quotesArray ){
      let data = quotesArray[Math.floor(Math.random() * quotesArray.length)];
      setAuthor(data.author)
      setQuote(data.quote)
      setBColor(COLORS[Math.floor(Math.random() * COLORS.length)])
    
    }else{
      fetch(qdb)
      .then(r => r.json())
      .then(data => {
        setQuotesArray(data.quotes)
      })
    }
  }, [quotesArray])

  return (
    <div className="App" style = {{backgroundColor: bColor, color: bColor}}>
      <header className="App-header">
        {quote 
          ? <div id='quote-box'>
             <p id = 'text'>
                "{quote}"
              </p>
              <p id = 'author'>
                - {author}
              </p>
              <div style= {{display: 'flex' , justifyContent: 'space-between'}}>
                <a id = 'tweet-quote' href ={encodeURI(`http://www.twitter.com/intent/tweet?text="${quote}" \n\n- ${author}`)} target = '_blank'><FontAwesomeIcon color = {bColor} icon={faTwitter} size = '2x'/></a>
                <Button variant = 'light' style = {{backgroundColor: bColor}} id = 'new-quote' onClick={() => change()}>New Quote</Button>
              </div>
          </div>
          : <div>
            <p>Loading...</p>
          </div>
        }
      </header>
    </div>
  );
}

export default App;
