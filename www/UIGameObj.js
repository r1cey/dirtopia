import UIEl	from "./UIElement.js"


export default class UIGameObj extends UIEl
{
	gobj



	constructor( gobj ,dad ,el, css )
	{
		super( dad ,el ,css )

		this.gobj	=gobj
	}



	async loadel( name ,dir ,gobj ,append )	
	{
		return super.loadel( name ,dir ,[ gobj ], append )
	}
}