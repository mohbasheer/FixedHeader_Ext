FixedHeader_Ext
===============

Extending Data-table FixedHeader Plugin

I faced couple of issues while using data-table fixedHeader plugin. I created this FixedHeader_Ext to extends FixedHeaer plugin functions.

#Issue 1  

In FixedHeader plugin below code was called multiple times, while hiding and showing multiple columns using colum(index).visible(). 

.on('column-visibility.dt', function () {
		FixedHeader.fnMeasure();
		that._fnUpdateClones( true );
		that._fnUpdatePositions();
	} );

so I removed this listener after creating datatable-FixedHeader instance like below

	fixedHeaderRef = new $.fn.dataTable.FixedHeader($('#example_table'))

	/* removed listener which is causing more performance issue */
	  if (fixedHeaderRef.fnGetSettings().nTable) {
	    $(fixedHeaderRef.fnGetSettings().nTable).off('column-visibility.dt');
	  }

now I need one pusblic method to reDraw the table after I made few columns visible. so I created the below method to redraw

//exposed these function to redraw when requir
FixedHeader.prototype.reDraw = function(){
	FixedHeader.fnMeasure();
	this._fnUpdateClones( true );
	this._fnUpdatePositions();
}


#Issue 2 

getting null pointer exception in method '_fnClassUpdate'.

at some senario  param 'dest' become null. it's clearly mentioned that two columns 'source' and 'dest' has identical
structure no error checking. but I am getting null pointer exception. so I added null pointer check by extending the method.

It may be issue with my implementation or plugin need to check.

/**
	 * Copy the classes of all child nodes from one element to another. This implies
	 * that the two have identical structure - no error checking is performed to that
	 * fact.
	 *  @param {element} source Node to copy classes from
	 *  @param {element} dest Node to copy classes too
	 */
	_fnClassUpdate: function ( source, dest )


Installation
============

you need to add the 'dataTables.fixedHeader.ext.js' after 'dataTables.fixedHeader.js' like below

<script src="bower_components/datatables-fixedheader/js/dataTables.fixedHeader.js"></script>
<script src="bower_components/datatables-fixedheader-ext/js/dataTables_fixedHeader_ext.js"></script>