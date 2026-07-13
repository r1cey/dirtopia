import GridC from "./Cell.js"

import newGrid from "./newGrid.js"

import V from "../../shared/Vec.js"

import{ sizes as cellszs }	from "./gridccfg.js"



export default class GridHolder	extends newGrid( GridC )
{
	constructor( holder ,dad )
	{
		super( holder ,dad )
	}


	finalize()
	{
		const size	=this.size

		const defsz	=cellszs[this.gobj.gkey()]

		var maxw	=defsz.x

		var area	=this.starterarea()

		for(var cell of this.cells )
		{
			this.addcellhtml( cell )

			var w	=cell.size.x

			if( w > maxw )	maxw	=w

			area	+= cell.size.area()
		}
		if( maxw > defsz.x )	size.x	=maxw

		const defar	=defsz.area()

		if( area > defar )
		{
			const h	=Math.ceil( area / size.x )
		
			if( h > defsz.y )	size.y	=h
		}
		this.setsize()
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


	starterarea()
	{
		return 0
	}
}