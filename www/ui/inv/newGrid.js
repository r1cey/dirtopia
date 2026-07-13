import Ui from "../Div.js"

// import CtxM	from "../ContextMenu.js" 


export default( Base =Ui )=>class Grid	extends Base
{
	cells	=[]

	height	=0



	constructor( ...args )
	{
		super( ...args )

		this.el.classList.add( "grid" )

		// console.log( this ,dad ,eln ,dhold )

		const html	=this.html()

		this.getgo().fore(( item )=>
		{
			this.add( item ,html )
		})
		this.sort()

		this.finalize()
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
		debugger

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