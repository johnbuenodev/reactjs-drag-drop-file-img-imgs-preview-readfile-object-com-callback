import './App.css';

import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import DragDropImgFileReader from './components/DragDropImgFileReader';

function App() {

  const handleValueCallBack = (response) => {
    //tratar dados aqui
    console.log("Values Callback:");
    console.log(response);
  }

  return (
    <>
     <ToastContainer autoClose={5000} />
     <div className="container">
       <DragDropImgFileReader 
        maxWidth={800} 
        maxHeight={600} 
        typeUpload={false} 
        callBackFunction={handleValueCallBack}
        containerWidthUpload={500} 
        containerHeightUpload={200}
       />
     </div>
     <div className="container">
       <DragDropImgFileReader 
        maxWidth={800} 
        maxHeight={600} 
        typeUpload={true} 
        callBackFunction={handleValueCallBack}
        containerWidthUpload={500} 
        containerHeightUpload={200}
       />
     </div>
    </>
  );
}

export default App;