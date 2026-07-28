import Div from "../Div.js"

import CtxM	from "./ContextMenu.js" 

// import Drag	from "../Drag.js"


export default( Base =Div )=>class GridCnt	extends Base
{
	cntsym

	cells	=[]

	height	=0

	// drag



	constructor( ...args )
	{
		super( ...args )

		this.el.classList.add( "grid" )

		// console.log( this ,dad ,eln ,dhold )

		const html	=this.html()

		const cntsym	=this.cntsym	=new Div( this ,"cntsym" )
		{		
			cntsym.el.onclick	=( ev )=>
			{
				const ctxm	=CtxM.frompointev( this ,ev )

				if( ctxm.opts.length )	html.ui.setctxm( ctxm )
			}
			this.el.appendChild( cntsym.el )
		}
		// this.drag	=new Drag( cntsym )

		// this.drag.start()

		this.getgo().fore(( item )=>
		{
			this.add( item ,html )
		})
		this.sort()

		this.finalize()
	}



	gnav()
	{
		const nav	=[]

		var div	=this

		do{
			var gobj	=div.getgo()

			nav.unshift( gobj )
			
			while( div.getgo() === gobj )	div	=div.dad
		}
		while( ! gobj.ispl )

		nav.unshift( div.html().ui.cl.pls )

		return nav
	}



	setmoving()
	{
		this.cntsym.el.classList.add( "moving" )
	}

	stopmoving()
	{
		this.cntsym.el.classList.remove( "moving" )
	}



	addfinal( grido )
	{
		this.add( grido )

		this.finalize()
	}

	adduifinal( gridui )
	{
		this.addcell( gridui )

		this.finalize()
	}

	/**@returns truthy if element was found */

	delui( ui )
	{
		ui.dad	=null

		const griduis	=this.cells

		const i	=griduis.indexOf( ui )

		if( i < 0 )	return

		griduis.splice( i, 1 )

		ui.el.remove()

		this.rescanh()

		return true
	}



	add( gobj ,html =this.html() )
	{
		// debugger

		const cell	=gobj.ui_newgridc( this )
		
		// new uis[grido.gkey()]( grido ,this ,uis )

		// html.addui( gridui )

		return this.addcell( cell ,html )
	}


	/** Separate so I don't need to create and delete divs
	 * when moving objects */

	addcell( cell ,html =this.html() )
	{
		cell.dad	=this

		this.cells.push( this.adddiv( cell ,html ))

		if( this.height <= cell.height )	this.height	=cell.height + 1

		return cell
	}


	finalize()
	{
		for(var cell of this.cells )
		{
			this.addcellhtml( cell )
		}
	}



	setheight( height =0 )
	{
		if( height > this.height )	this.height	=height

		for(var gridel of this.cells )
		{
			if( gridel.height )	gridel.setheight( this.height - 1 )
		}
	}

	rescanh()
	{
		const height	=this.cells.reduce
			(
				( max ,ui )=> ui.height > max ? ui.height : max
				,
				0
			)
		// if( height < this.height )	this.setheight( height )
	}


	sort()
	{
		this.cells.sort(( a ,b )=> b.garea() - a.garea() )
	}


	addcellhtml( cell )
	{
		this.el.appendChild( cell.el )
	}
}