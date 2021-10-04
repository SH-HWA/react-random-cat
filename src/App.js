import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [cat, setCat] = useState("https://purr.objects-us-east-1.dream.io/i/1378514_717282693110_1598433115_n.jpg")
  const handleClick = () => {
    axios.get('https://aws.random.cat/meow')
    .then(res => {
      setCat(res.data.file)
      // console.log(res)
    })
  }

  return (
    <div>
      <h2>고양이 사진 나와라!!!</h2>
      <div className='flex'>
      <img className="catImg" src={cat} />
      <button className="button" onClick={() => handleClick()}>사진변경</button>
      </div>
    </div>
  );
}

export default App;
