import Ui from "./UIElement.js"

import CtxM	from "./ContextMenu.js" 


export default( Base =Ui )=>class Grid	extends Base
{
	gridels	=[]

	height	=0



	constructor( ...args )
	{
		super( ...args )
		
		this.el.classList.add( "grid" )
	
		this.gobj.fore(( item )=>
		{
			this.add( item )
		})
	}


	add( grido )
	{
		var gridel	=grido.newgridel( this )

		this.gridels.push( gridel )

		if( this.height <= gridel.height )	this.height	=gridel.height + 1
	}


	fill()
	{
		this.sort()

		for(var gridel of this.gridels )
		{
			this.el.appendChild( gridel.el )
		}
	}



	setheight( height =0 )
	{
		if( height > this.height )	this.height	=height

		for(var gridel of this.gridels )
		{
			if( gridel.height )	gridel.setheight( this.height - 1 )
		}
	}


	sort()
	{
		this.gridels.sort(( a ,b )=> b.area - a.area )
	}
}