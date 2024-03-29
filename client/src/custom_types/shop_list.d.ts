import { FilesHref } from "./file_href";
export interface ShopingTable{
    files: FilesHref;
    name:string,
    author:string,
    _id:string,
    price: number,
    count:number,
    filename:string
  }

//  interface FilesHref{
//     fileName:string,
//     fileHreaf:string,
//     filePath:string,
//     fileType:string,
//     fileSize:string
//   }

export interface CardShopList{
    id:string,
    count:number,
    name:string,
    price: number,
    author:string,
    file_url:string,
  }