import Div	from "./Div.js"


export default class DivGameObj extends Div
{
	gobj



	constructor( gobj ,dad ,el, css )
	{
		super( dad ,el ?? gobj.gkey() ,css )

		this.gobj	=gobj
	}


	getgo()	{return this.gobj}
}


Div.DivGo	=DivGameObj