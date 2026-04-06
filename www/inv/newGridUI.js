import Ui from "../UIElement.js"


/** Base can be Grid */

export default( Base =Ui )=>class GridUi extends Base
{
	// area	=1
	


	constructor( gobj ,dad ,griduis )
	{
		super( dad ,gobj.gkey() ,gobj ,griduis )

		this.el.classList.add( "gridel" )

		this.setsize()
	}



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
		while( ! ui.constructor.ishtml )

		if( nav[0].ispl )	nav.unshift( ui.gobj.pls )

		return nav
	}


	setsize( size =this.constructor.size )
	{
		this.el.style.gridArea	=`span ${size.y}/span ${size.x}`

		this.el.style.aspectRatio	=size.x / size.y
	}


	getsize()
	{
		const size	=this.constructor.size
		
		return[ size.area() ,size.x ]
	}
}