import DivGo	from "../DivGameObj.js"

import V	from "../../shared/Vec.js"

import{ sizes as gridcszs }	from "./gridccfg.js"



export default( Base =DivGo )=>class GridDiv extends Base
{
	size	=new V(0,0)
	


	constructor( gobj ,dad )
	{
		super( gobj ,dad )

		size.s( gridcszs[ gobj.gkey() ])

		this.el.classList.add( "gridcell" )
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
		size	??=

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