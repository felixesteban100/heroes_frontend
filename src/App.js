import React from 'react'
import Character from './components/Character';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Character />
      </QueryClientProvider>
    </div>
  );
}

export default App;

//CHRISTMAS
/* VARIABLES */

// --background-general: black;

// --header-background: rgb(24, 46, 28);
// --header-text: rgb(224, 224, 224);

// /* --background-find-container: rgb(29, 29, 36); */
// --background-find-container: rgba(0, 0, 0, 0);

// --character-textbox-first: rgba(37, 53, 23, 0.788);
// --character-textbox-second: rgb(17, 51, 14);
// --input-howMany-border-color: black;

// --character-button-first: rgb(51, 78, 42);
// --character-button-second: rgb(17, 51, 14);

// --button-color: rgb(255, 255, 255);
// --finder--border: white;

// /* --character-box-first: rgb(15,15,50);
// --character-box-second: gray; */
// --character-box-first: rgba(255, 0, 0, 0);
// --character-box-second: rgb(37, 63, 34);


// --character--name-color: rgb(230, 230, 230) /* black */;

// --character--withInfo--name-color: rgb(17, 51, 14);
// --character--withInfo--fullname-color: rgb(17, 51, 14);
// --character--withInfo--alignment-color: rgb(17, 51, 14);

// /* --character--withInfo-background: rgba(101, 101, 101, 0);*/
// --character--withInfo-background: rgba(7, 0, 0, 0);

// --character--withInfo--statSelectors-background: rgb(184, 12, 12);
// --statSelectors-color: rgb(184, 168, 24);
// --statSelectors-selected-color: rgb(251, 255, 0);
// --statSelectors-selected-border-color: rgb(55, 189, 22);

// /* --character--withInfo--info-background: rgb(16, 14, 43);  */
// --character--withInfo--info-background: rgba(0, 0, 0, 0.199);

// --stat-info-color: rgb(196, 180, 37);