import newPage from "../newPage.js"

import GridRoot from "./GridPage.js"

import griduis	from "./griduis.js"


export default class PageInv	extends newPage( 1 )
{
	grid


	constructor( dhold ,dad ,el ,gridel )
	{
		// var key	=dhold.constructor.key

		super( dhold ,dad , el ?? dhold.gkey() )

		this.el.classList.add( "inv" )

		this.grid	=new GridRoot( this ,griduis ,gridel )

		// this.html().addui( this.grid )

		// this.grid.setheight()

		this.el.appendChild( this.grid.el )
	}


	adduifinal( gridui )	{return this.grid.adduifinal( gridui )}

	delui( gridui )	{return this.grid.delui( gridui )}
}