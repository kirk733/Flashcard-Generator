//Cloze cared required by homework
var ClozeCard = function (text, cloze) {
  this.cloze = cloze;
  this.text = text;
  this.partial = text.replace(cloze, "...");
}


module.exports = ClozeCard;
