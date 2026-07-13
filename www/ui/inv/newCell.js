import DivGo	from "../DivGameObj.js"

import V	from "../../shared/Vec.js"

import{ sizes as cellszs }	from "./gridccfg.js"



export default( Base =DivGo )=>class GridCell extends Base
{
	size	=new V(1,1)
	


	constructor( gobj ,dad )
	{
		super( gobj ,dad )

		const size	=cellszs[ gobj.gkey() ]

		if( size )	this.size.s( size )
		
		this.el.classList.add( "gridcell" )

		/** setsize() */
	}


	garea()	{return this.size.area() }



	getnav()
	{
		const nav	=[]

		var ui	=this

		do{
			nav.unshift( ui.gobj )

			while( ui.gobj === ui.dad?.gobj )
			{
				ui	=ui.dad
			}
			ui	=ui.dad
		}
		while( ui.dad )

		if( nav[0].ispl )	nav.unshift( ui.gobj.pls )

		return nav
	}


	setsize( size )
	{
		size	??=this.size

		this.el.style.gridArea	=`span ${size.y}/span ${size.x}`

		this.el.style.aspectRatio	=size.x / size.y
	}


	/** @todo Needs a rewrite */

	getsize()
	{
		const size	=this.constructor.size
		
		return[ size.area() ,size.x ]
	}
}