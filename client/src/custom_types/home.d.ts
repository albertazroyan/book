import { FilesHref } from "./file_href"
import { HOME_ADD_INFO, HOME_GET_INFO, HOME_CHANGE_QUANTITY, HOME_LOADER } from "../config"

export interface Homeinfo {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file:FilesHref[],
    absalute_url:string,
    phone_number:string,
    phone_number2:string,
    email:string,
    addres:string,
    facebook_url:string,
    instagram_url:string,
    telegram_url:string,
    copyright_column:string,
    createdAt:string,
    _id:string
}

export interface Homestate {
    data: Homeinfo
    getHomedata: Homeinfo[]
    quantity: number,
    loaderpage: boolean
}

// export enum HomeActionTypes {
//     HOME_ADD_INFO = 'HOME_ADD_INFO',
//     HOME_GET_INFO = 'HOME_GET_INFO',
//     HOME_CHANGE_QUANTITY = "HOME_CHANGE_QUANTITY",
//     HOME_LOADER = "HOME_LOADER"
// }

interface HomeAddInfoAction {
  type: typeof HOME_ADD_INFO;
  payload: Homeinfo ;
}

interface HomeBookGetInfoAction {
  type: typeof HOME_GET_INFO;
  payload: Homeinfo[];
}

interface HomequanitityAction {
  type: typeof HOME_CHANGE_QUANTITY;
  payload: number;
}

interface Homeloader {
  type: typeof HOME_LOADER
  payload: boolean
}

export type HomeAction = HomeAddInfoAction | HomeBookGetInfoAction | HomequanitityAction | Homeloader
