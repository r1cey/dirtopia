import Div	from "./Div.js"


export default class DivGameObj extends Div
{
	gobj



	constructor( gobj ,dad ,el, css )
	{
		super( dad ,el ,css )

		this.gobj	=gobj
	}
}


Div.DivGo	=DivGameObj