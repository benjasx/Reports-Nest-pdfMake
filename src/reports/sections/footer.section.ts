import { Content } from "pdfmake/interfaces";

export const footerSecction = (currentPage:number, pageCount:number): Content =>{
    return {
      text:`${currentPage} De ${pageCount}`,  
      margin:[0,15],
      style:{
        bold:true,
        alignment:'center',
        fontSize:12
      }
    }
}