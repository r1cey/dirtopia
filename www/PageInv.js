import Page from "./Page.js"

import Grid from "./Grid.js"


export default class PageInv	extends Page
{
	grid


	constructor( gobj ,dad )
	{
		var key	=gobj.constructor.key

		super( dad ,gobj.gkey() ,gobj )

		this.el.classList.add( "inv" )

		this.grid	=new Grid( this ,gobj )

		this.html().addui( this.grid )

		this.grid.setheight()

		this.el.appendChild( this.grid.el )
	}


	/*additem( item )
	{
		this.elgrid.appendChild( item.newelinv( this ).el )
	}*/
}