import Ui from "./UIElement.js"



export default class GridItem	extends Ui
{
	area	=1


	constructor( gobj )
	{
		super( gobj.gkey() ,gobj )

		this.el.classList.add( "griditem" )

		var size	=gobj.constructor.size.c()

		this.area	=gobj.calcarea()

		if( this.area > size.area() )
		{
			let side	=Math.ceil( Math.sqrt( this.area ) )

			size.setxy( side ,Math.ceil( this.area / side ))
		}
		this.el.style.gridArea	=`span ${size.y}/span ${size.x}`

		this.el.style.aspectRatio	=size.x / size.y
	}
}