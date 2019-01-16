import { AppConfig } from "~/service/config";

import axios from "axios";

var instance = axios.create();
instance.defaults.timeout = 100000;
instance.defaults.baseURL = AppConfig.apikswagger;

export const grailStrength = () => {
   return instance.get("/home/getTIRCurve.open");
 };
