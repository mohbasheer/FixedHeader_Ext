/* extending few internal funtions */

FixedHeader.prototype._fnClassUpdate = function(source, dest) {
  var that = this;
  //added !dest null check which is not their in original function
  if (!dest) {
    return;
  }

  if (source.nodeName.toUpperCase() === "TR" || source.nodeName.toUpperCase() === "TH" ||
    source.nodeName.toUpperCase() === "TD" || source.nodeName.toUpperCase() === "SPAN") {
    dest.className = source.className;
  }

  $(source).children().each(function(i) {
    that._fnClassUpdate($(source).children()[i], $(dest).children()[i]);
  });
}

//exposed these function to redraw when requir
FixedHeader.prototype.reDraw = function(){
	FixedHeader.fnMeasure();
	this._fnUpdateClones( true );
	this._fnUpdatePositions();
}
