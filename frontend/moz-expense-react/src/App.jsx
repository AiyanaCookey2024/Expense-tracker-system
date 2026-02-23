import { useState } from "react"; 
import "./App.css";

const Greeting = ({ phrase, name }) => (
  <h1>{phrase} {name}!</h1>
)


const Box = ({name, onNameChange, phrase, onPhraseChange}) => {     
  return (
   <div className="box">
      <Greeting name={name} phrase={phrase} />             
      <input value={phrase} onChange={ onPhraseChange } />      
      <input value={name} onChange={ onNameChange } />      
    </div>
  );
};


const App = () => {  
  const [name, setName] = useState('Guest');  
  const [phrase, setPhrase] = useState('Hi'); 


  const handleNameChange = (event) => { 
    const value = event.target.value;    
    const formatted = value.charAt(0).toUpperCase() + value.slice(1);
    setName(formatted); 
  }


  const handlePhraseChange = (event) => { 
    const value = event.target.value;    
    const formatted = value.charAt(0).toUpperCase() + value.slice(1);
    setPhrase(formatted); 
  }


  return (
    <>      
      <Box 
        name={name} 
        onNameChange={handleNameChange}  
        phrase={phrase}    
        onPhraseChange={handlePhraseChange}
      /> 
    </>
  );
};


export default App;