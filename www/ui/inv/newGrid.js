import Ui from "../Div.js"

// import CtxM	from "../ContextMenu.js" 


export default( Base =Ui )=>class Grid	extends Base
{
	griddivs	=[]

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
	}


	addfinal( grido )
	{
		this.add( grido )

		this.finalize()
	}

	adduifinal( gridui )
	{
		this.addui( gridui )

		this.finalize()
	}

	/**@returns truthy if element was found */

	delui( ui )
	{
		ui.dad	=null

		const griduis	=this.griddivs

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

		const cell	=gobj.ui_newgridc()
		
		// new uis[grido.gkey()]( grido ,this ,uis )

		// html.addui( gridui )

		return this.addui( griddiv )
	}

	addui( gridui )
	{
		gridui.dad	=this

		this.griddivs.push( gridui )

		if( this.height <= gridui.height )	this.height	=gridui.height + 1

		return gridui
	}


	finalize()
	{
		this.fill()
	}


	fill()
	{
		this.sort()

		this.el.querySelectorAll( "gridel" ).forEach( el => el.remove() )

		for(var gridel of this.griddivs )
		{
			this.el.appendChild( gridel.el )
		}
	}



	setheight( height =0 )
	{
		if( height > this.height )	this.height	=height

		for(var gridel of this.griddivs )
		{
			if( gridel.height )	gridel.setheight( this.height - 1 )
		}
	}

	rescanh()
	{
		const height	=this.griddivs.reduce
			(
				( max ,ui )=> ui.height > max ? ui.height : max
				,
				0
			)
		// if( height < this.height )	this.setheight( height )
	}


	sort()
	{
		this.griddivs.sort(( a ,b )=> b.area - a.area )
	}
}