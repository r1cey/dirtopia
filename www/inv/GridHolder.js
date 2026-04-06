import newGridUi from "./newGridUI.js"

import Grid from "./Grid.js"

import V from "../game/shared/Vec.js"



export default class GridHolder	extends newGridUi( Grid )
{
	finalize()
	{
		this.setsize()

		super.finalize()
	}


	setsize()
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
	}
}