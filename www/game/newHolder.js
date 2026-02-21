import newHold	from "./shared/newHolder.js"

import HEl from "../HtmlEl.js"



export default( Base =newHold(Object) )=>class Holder	extends Base
{
	html	=
	{
		inv	:null
	}

	static hinv_pth	=null


	constructor( ...args )
	{
		super( ...args )
		/*
		if( ! this.html )	this.html	={}

		this.html.inv	=null*/
	}


	newhinv( dad ,el )
	{
		return	this.html.inv	=new HEl( dad ,el ,this )
	}

	async loadhinv( dad )
	{
		var hinvp	=this.constructor.hinv_pth

		return	this.html.inv	=await dad.loadel( hinvp ,this )
	}
}