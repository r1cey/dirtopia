import Loc from "./Loc.js"
import Col from "./Color.js"
import Hands from "./player/Hands.js"
import{ key as itemk }	from "./items/Item.js"


export default class JR
{
	// revfns	={}

	ifaces	={}

	tmpls	=new Set()

	get fn()	{return this.revivr.bind(this) }


	constructor()
	{
		this.addifacea([ Loc ,Col ,Hands ]).addtmpl(itemk)
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
	// this.revfns[key]	=this.parsetmpl.bind(this)

	this.tmpls.add(key)

	return this
}

JR.prototype. addtmpl	=JR.prototype.addtmplkey


JR.prototype. addiface	=function( iface )
{
	// this.revfns[iface.key]	=iface.fromJSON.bind(iface)

	this.ifaces[iface.key]	=iface

	return this
}

JR.prototype. add	=JR.prototype. addiface



JR.prototype. revivr	=function( key, val, str )
{
	if( this.tmpls.has(key) )
	{
		if( ! Array.isArray(val) )	return null

		var iface	=this.ifaces[val[0]]

		val	=val[1]
	}
	else	var iface	=this.ifaces[key]

	return iface && val	? iface.fromJSON( val )	: val

	/*var revfn	=this.revfns[key]

	return revfn && val	? revfn( val )	: val*/
}


///////////////////////////////////////////////////////////////////////////////


/*
JR.prototype. parsetmpl	=function( arr )
{
	// return this.revfns[arr[0]]( arr[1] )

	return this.ifaces[arr[0]]
}*/