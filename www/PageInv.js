import Page from "./Page.js"

import Grid from "./Grid.js"


export default class PageInv	extends Page
{
	grid


	constructor( gobj )
	{
		var key	=gobj.constructor.key

		super( gobj.gkey() ,gobj )

		this.el.classList.add( "inv" )

		this.grid	=new Grid( gobj )

		this.el.appendChild( this.grid.el )
	}


	/*additem( item )
	{
		this.elgrid.appendChild( item.newelinv( this ).el )
	}*/
}