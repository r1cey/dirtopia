import HEl from "./HtmlEl.js"



export default class GridItem	extends HEl
{
	constructor( dad ,gobj )
	{
		super( dad ,gobj.gkey() ,gobj )

		this.el.classList.add( "griditem" )

		var size	=gobj.constructor.size

		this.el.style.gridArea	=`span ${size.y}/span ${size.x}`

		this.el.style.aspectRatio	=size.x / size.y
	}
}