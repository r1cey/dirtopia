import Page from "../Page.js"

import GridP from "./GridPage.js"

import griduis	from "./griduis.js"


export default class PageInv	extends Page
{
	grid


	constructor( dhold ,dad )
	{
		var key	=dhold.constructor.key

		super( dad ,dhold.gkey() ,dhold )

		this.el.classList.add( "inv" )

		this.grid	=new GridP( this ,dhold ,griduis )

		this.html().addui( this.grid )

		this.grid.setheight()

		this.el.appendChild( this.grid.el )
	}


	adduifinal( gridui )	{return this.grid.adduifinal( gridui )}

	delui( gridui )	{return this.grid.delui( gridui )}
}