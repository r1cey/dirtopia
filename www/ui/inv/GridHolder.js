import GridC from "./GridCell.js"

import newGrid from "./newGrid.js"

import V from "../../shared/Vec.js"   



export default class GridHolder	extends newGrid( GridC )
{
	constructor( holder ,dad )
	{
		super( holder ,dad )

		this.calcsize()
	}


	finalize()
	{
		this.setsize()

		super.finalize()
	}


	calcsize()
	{
		const size	=this.size

		const defsz	=size.c()

		var curarea	=0

		var maxw	=0

		for(var cell of this.cells )
		{
			curarea	+= cell.size.area()

			var w	=cell.size.x

			if( w > maxw )	maxw	=w
		}
		if( w > size.x )	size.x	=w

		if( curarea > defsz.area() )
		{
			size.y	=Math.ceil( curarea / size.x )
		}
	}


	/*setsize()
	{
		const defa	=super.getsize()

		const[ defarea ,defw ]	=defa

		const[ curarea ,curw ]	=this.getsize( defa )

		const size	=this.constructor.size.c()

		if( curw > defw )
		{
			size.x	=curw
		}
		if( curarea > defarea )
		{
			size.y	=Math.ceil( curarea / size.x )
		}
		super.setsize( size )
	}


	getsize( defa =super.getsize() )
	{
		const[ defarea ,defw ]	=defa

		var curarea	=0

		var maxw	=0

		for(var ui of this.griduis )
		{
			var[ area ,w ]	=ui.getsize()

			curarea	+= area

			if( w > maxw )	maxw	=w
		}
		if( curarea < defarea )	curarea	=defarea

		return[ curarea ,maxw ]
	} */
}