import Loc from "./Loc.js"
import Col from "./Color.js"
// import Block from "./items/newBlock.js"


export default class JR
{
	revfns	={}

	fn


	constructor()
	{
		this.addifacea([ Loc ,Col ])

		this.fn	=this.revivr.bind(this)
	}
}


JR.prototype. addifacea	=function( arr )
{
	for(var iface of arr )
	{
		this.addiface( iface )
	}
	return this
}

JR.prototype. adda	=JR.prototype.addifacea


JR.prototype. addifaceo	=function( o )
{
	for(var key in o )
	{
		this.addiface( o[key] )
	}
	return this
}

JR.prototype. addo	=JR.prototype.addifaceo


JR.prototype. addtmplkey	=function( key )
{
	this.revfns[key]	=this.parsetmpl.bind(this)

	return this
}

JR.prototype. addtmpl	=JR.prototype.addtmplkey


JR.prototype. addiface	=function( iface )
{
	this.revfns[iface.key]	=iface.fromJSON.bind(iface)

	return this
}

JR.prototype. add	=JR.prototype. addiface



JR.prototype. revivr	=function( key, val, str )
{
	var revfn	=this.revfns[key]

	return revfn	? revfn( val )	: val
}


///////////////////////////////////////////////////////////////////////////////



JR.prototype. parsetmpl	=function( arr )
{
	return this.revfns[arr[0]]( arr[1] )
}