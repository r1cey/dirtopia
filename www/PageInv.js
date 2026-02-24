import Page from "./Page.js"

import Grid from "./Grid.js"


export default class PageInv	extends Page
{
	grid


	constructor( html ,gobj )
	{
		var key	=gobj.constructor.key

		super( html ,gobj.gkey() ,gobj )

		this.el.classList.add( "inv" )

		this.grid	=new Grid( this ,gobj )

		this.el.appendChild( this.grid.el )
	}


	/*additem( item )
	{
		this.elgrid.appendChild( item.newelinv( this ).el )
	}*/
}