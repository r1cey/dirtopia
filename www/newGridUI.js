import Ui from "./UIElement.js"



export default( Base =Ui )=>class GridEl extends Base
{
	area	=1
	


	constructor( gobj ,dad )
	{
		super( dad ,gobj.gkey() ,gobj )

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


	setsize( size =this.gobj.constructor.size )
	{
		this.el.style.gridArea	=`span ${size.y}/span ${size.x}`

		this.el.style.aspectRatio	=size.x / size.y
	}
}