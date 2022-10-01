import { useState } from 'react';
import './DragDropImgFileReader.css';
import { toast } from 'react-toastify';

const DragDropImgFileReader = (props) => {

  const {maxWidth, maxHeight, typeUpload, callBackFunction, containerWidthUpload, containerHeightUpload} = props;

  const [images, setImages] = useState([]);
  const [image, setImage] = useState({});

  const onImgLoad = () => {
    const img = document.getElementById('newImageUpload'); 
    
    const width = img.clientWidth;
    const height = img.clientHeight;
       
    toast.info(`Medida imagem client - Largura: ${width} x Altura: ${height}`);
  };

  const dragEvents = {
    onDragEnter: (e) => {e.preventDefault();console.log('onDragEnter');},
    onDragLeave: (e) => {e.preventDefault();console.log('onDragLeave');}, 
    onDragOver:  (e) => {e.preventDefault();console.log('onDragOver');},
    onDrop:      (e) => {
      e.preventDefault();
      if(typeUpload === false ) {
      console.log('onDrop');

      console.log("Ativado modo single Drag Drop file upload(processo sem backend). Alterar no fonte HARDCODE p true.");
      
      console.log('Files');
      console.log(e.dataTransfer.files);

      console.log('Arquivo: ');
      console.log(e.dataTransfer.files[0]);
      console.log('Arquivo nome: ');
      console.log(e.dataTransfer.files[0].name);

      const nomeProcess = e.dataTransfer.files[0].name;

      console.log('Nome processado:');
      const nome = nomeProcess.substr(0, nomeProcess.lastIndexOf('.')) || nomeProcess;
      console.log(nome);

      console.log('Arquivo size: ');
      console.log(e.dataTransfer.files[0].size);
      console.log('Arquivo type: ');
      console.log(e.dataTransfer.files[0].type);
    
      let name = e.dataTransfer.files[0].name;
      let size = e.dataTransfer.files[0].size;
      const reader = new FileReader();
      reader.readAsDataURL(e.dataTransfer.files[0]);

      reader.onloadend = () => {

        var image = new Image();
        let preview = reader.result;
        const imageObj = {name, size, preview}; 

        image.src = reader.result;
           
        console.log("Img src:");
        console.log(image.src);
        console.log("Obj:");
        console.log(imageObj.preview);
          
        image.onload = function() {
          
          if(image.width > maxWidth || image.height > maxHeight) {
            toast.warning(`Imagem ${imageObj.name} com medidas não compativeis!`); 
            toast.info(`Medidas compativeis - Altura: ${maxHeight} e Largura: ${maxWidth}`);
          } else {  
          setImage({name: imageObj.name, size: imageObj.size, preview: imageObj.preview});
          callBackFunction({name: imageObj.name, size: imageObj.size, preview: imageObj.preview});
          toast.success("Imagem carregada com sucesso!");
     
        }

        } 
      }
    } 
      
        else {

        console.log("Ativado Multiple Drag Drop file upload(processo sem backend). Alterar no fonte HARDCODE p false.");

        const files = Array.from(e.dataTransfer.files);
       
        files.map((f) => {
          
          const {name, size} = f;
          const reader = new FileReader();
          reader.readAsDataURL(f);

          

          reader.onloadend = () => {

            var image = new Image();
            const preview = reader.result;
            let newName = `${String(new Date().getTime())}${name}`;
            const imageObj = {newName, size, preview}; 

            image.src = reader.result;

            image.onload = function() {
              
              if(image.width > maxWidth || image.height > maxHeight) {
                toast.warning(`Imagem ${imageObj.newName} com medidas não compativeis!`); 
                toast.info(`Medidas compativeis - Altura: ${maxHeight} e Largura: ${maxWidth}`);
              } else {        
                setImages((existenteImages) => [...existenteImages, imageObj]);

                //Aguardar porque senão atropela e não pega o valor exato do images
                //Tentando aguardar para manda o objeto Array mas ele mandar sem estar atualizado o ultimo registro 
                //inserido, então envio o images com o novo objeto pelo callback
                setTimeout(() => {
                 callBackFunction([...images, imageObj]); //Não esta mandando o primeiro verificar
                }, 3000);

                toast.success(`Imagem ${imageObj.newName} carregada com sucesso!`);
              };

              return null;
            };

          }

        });

        
      }
    },
  }

  return (
    <div className="container">
      <div className='file-drop' {...dragEvents} style={{height:containerHeightUpload, width:containerWidthUpload}}>
       <div className='text'>Arraste{typeUpload === true ? ' as Imagens' : ' a Imagem' }! Medidas de Altura: {maxHeight} x Largura:{maxWidth}</div>
      </div>
      <div className='preview'>

       { 
         (images.length > 0 && typeUpload === true) ? images.map((image) => {
         return (
          <div className='image' key={image.newName}>
           <img src={image.preview} alt={image.newName} />
          </div>
         ) 
         }) : null 
       }

       { (image.name && typeUpload === false) ? 
          <div className='image' key={image.name}>
           <img id="newImageUpload" onLoad={() => onImgLoad()} src={image.preview} alt={image.name} />
          </div>
         : null 
       }
      
      </div>
      
    </div>
  );
}

export default DragDropImgFileReader;
