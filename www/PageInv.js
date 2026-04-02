import Page from "./Page.js"

import Grid from "./GridPage.js"


export default class PageInv	extends Page
{
	grid


	constructor( gobj ,dad )
	{
		var key	=gobj.constructor.key

		super( dad ,gobj.gkey() ,gobj )

		this.el.classList.add( "inv" )

		this.grid	=new Grid( this ,gobj )

		this.html().addel2ui( this.grid.el ,this )

		this.grid.setheight()

		this.el.appendChild( this.grid.el )
	}


	adduifinal( gridui )
	{
		return this.grid.adduifinal( gridui )
	}

	delui( gridui )	{return this.grid.delui( gridui )}


	fill()	{ this.grid.fill() }
}