import DivGo	from "../DivGameObj.js"

import V	from "../../shared/Vec.js"

import cellcfg	from "./gridccfg.js"



export default( Base =DivGo )=>class GridCell extends Base
{
	size	=new V(1,1)
	


	constructor( gobj ,dad )
	{
		super( gobj ,dad )

		const{ el }	=this

		const defs	=cellcfg[ gobj.gkey() ]

		if( defs )
		{
			const defsize	=defs.csize

			if( defsize )	this.size.s( defsize )

			const defbgcol	=defs.cbg

			if( defbgcol )	el.style.backgroundColor	=defbgcol.str()
		}
		el.classList.add( "cell" )

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