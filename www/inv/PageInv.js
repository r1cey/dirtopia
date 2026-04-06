import Page from "../Page.js"

import GridRoot from "./GridRoot.js"

import griduis	from "./griduis.js"


export default class PageInv	extends Page
{
	grid


	constructor( dhold ,dad ,el ,gridel )
	{
		// var key	=dhold.constructor.key

		super( dad , el ?? dhold.gkey() ,dhold )

		this.el.classList.add( "inv" )

		this.grid	=new GridRoot( this ,dhold ,griduis ,gridel )

		// this.html().addui( this.grid )

		// this.grid.setheight()

		this.el.appendChild( this.grid.el )
	}


	adduifinal( gridui )	{return this.grid.adduifinal( gridui )}

	delui( gridui )	{return this.grid.delui( gridui )}
}