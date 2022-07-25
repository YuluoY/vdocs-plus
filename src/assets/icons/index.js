import Vue from "vue";
import svgIcon from "@/components/SvgIcon";

const svgContext = require.context('./svg', false, /\.svg$/);
svgContext.keys().map(svgContext);

Vue.component(svgIcon.name, svgIcon);