import Page from "./Page.js"

import Grid from "./Grid.js"


export default class PageInv	extends Page
{

	grid


	constructor( html ,gobj )
	{
		var key	=gobj.constructor.key

		super( html ,gobj.gkey() ,gobj )

		this.grid	=new Grid( this )
	}


	/*additem( item )
	{
		this.elgrid.appendChild( item.newelinv( this ).el )
	}*/
}