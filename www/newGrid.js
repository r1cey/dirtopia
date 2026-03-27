import Ui from "./UIElement.js"

import CtxM	from "./ContextMenu.js" 


export default( Base =Ui )=>class Grid	extends Base
{
	griduis	=[]

	height	=0



	constructor( ...args )
	{
		super( ...args )
		
		this.el.classList.add( "grid" )

		const html	=this.html()
	
		this.gobj.fore(( item )=>
		{
			this.add( item ,html )
		})
	}


	add( grido ,html =this.html() )
	{
		const gridui	=grido.newgridel(this.constructor.isinpage ? this.dad : this)

		html.addui( gridui )

		return this.addui( gridui )
	}

	addui( gridui )
	{
		gridui.dad	=this.constructor.isinpage ? this.dad : this

		this.griduis.push( gridui )

		if( this.height <= gridui.height )	this.height	=gridui.height + 1

		return gridui
	}

	/**@returns truthy if element was found */

	delui( ui )
	{
		ui.dad	=null

		const griduis	=this.griduis

		const i	=griduis.indexOf( ui )

		if( i < 0 )	return

		griduis.splice( i, 1 )

		this.rescanh()

		return true
	}


	fill()
	{
		this.sort()

		this.el.innerHTML	=""

		for(var gridel of this.griduis )
		{
			this.el.appendChild( gridel.el )
		}
	}



	setheight( height =0 )
	{
		if( height > this.height )	this.height	=height

		for(var gridel of this.griduis )
		{
			if( gridel.height )	gridel.setheight( this.height - 1 )
		}
	}

	rescanh()
	{
		this.height	=this.griduis.reduce
			(
				( max ,ui )=> ui.height > max ? ui.height : max
				,
				0
			)
		// this.height	=h
	}


	sort()
	{
		this.griduis.sort(( a ,b )=> b.area - a.area )
	}
}