
import {init_header} from "./includes/header.js";
import {init_side_left} from "./includes/side-left.js";
import {init_content} from "./includes/content.js";

// Création de l'élément du corps du site
const global = document.createElement("div");
global.setAttribute('id','global-container');
document.body.append(global);
if(global){
  /*######## Init Header ##########*/
  init_header(global);
  /*######## Init Side Left ##########*/
  init_side_left(global);
  /*######## Init Side Left ##########*/
  init_content();
}
