var ClozeCard = function (text, cloze) {
  this.cloze = cloze;
  this.fulltext = fulltext;
  this.partial = text.replace(cloze, "...");
}


module.exports = ClozeCard;