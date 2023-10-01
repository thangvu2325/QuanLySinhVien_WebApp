import { jsPDF } from "jspdf"
var font = 'undefined';
var callAddFont = function () {
this.addFileToVFS(' Arial, Arial, Helvetica, sans-serif-normal.ttf', font);
this.addFont(' Arial, Arial, Helvetica, sans-serif-normal.ttf', ' Arial, Arial, Helvetica, sans-serif', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
