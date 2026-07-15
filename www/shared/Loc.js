import V	from './Vec.js'

import newPatha from './newPathable.js'



export default class Loc extends newPatha( V )
{
	h


	static Vec	=V

	static V	=V

	static key	="loc"

	constructor( x =0, y =0, h =0 )
	{
		super( x, y )

		this.h	=h
	}


	get isloc()	{return true }


	static fromv( v ,h )	{ return new this().setvh( v ,h )}

	
	///////////////////////////////////////////////////////////////////////////


	setvh( v ,h )	{ this.setxy( v.x ,v.y ,h )}


	/*getcell( maps )	{return maps.loc2map(this).obj.g(this) }


	getitem( key ,maps ){	return this.getcell( maps )?.item }

	
	isempty( nav ,_i )	{return this.getcell( nav.dad(_i) )?.item }*/

	
	// fromJSON( a )	{return new this( ...a )}


	///////////////////////////////////////////////////////////////////////////


	pmsg2obj( key ,nav ,i )	{return nav[i-1].loc2map(this).obj.g(this)?.item }


	getitem( key ,id ,nav )	{return this.pmsg2obj( key ,nav ,nav.length-1 )}
}


///////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////


/** Return better json representation of object for messaging. *

Loc.prototype. newmsg	=function()
{
	return [this.x, this.y, this.h]
}*/



Loc.prototype. clone	=function()
{
	return new Loc(this.x, this.y, this.h)
}
Loc.prototype. c	=Loc.prototype. clone



Loc.prototype. set	=function({ x, y, h })
{
	return this.setxy( x, y, h )

}
Loc.prototype. setv	=function({ x, y })
{
	return this.setxy( x, y, this.h )
}

Loc.prototype. setxy	=function( x, y, l )
{
	this.x	=x
	this.y	=y
	this.h	=l

	return this
}
/*Loc.prototype. setj	=function( a )
{
	return this.setxy( ...a )
}*/
//Loc.prototype.fromJSON	=Loc.prototype.setj






Loc.prototype. setvstr	=function( str, h )
{
	var a	=str.split(V.delim)

	this.setxy( Number(a[0]), Number(a[1]), h)

	return this
}



Loc.prototype. toString	=function()
{
	return this.x.toString()+V.delim+this.y+V.delim+this.h
}



Loc.prototype. tovstr	=V.prototype. toString


/** Questionable use *

Loc.prototype. isloc	=function( str )
{
	return ! isNaN(parseInt( str ))
}*/



Loc.prototype. addloc	=function( loc )
{
	return this.add( loc.x, loc.y, loc.h)
}
Loc.prototype. add	=function( x, y, h =0 )
{
	this.x	+= x
	this.y	+= y
	this.h	+= h
	return this
}
Loc.prototype. addv	=function( v )
{
	return this.add( v.x, v.y, 0 )
}

Loc.prototype. sub	=function( x, y, h =0 )
{
	this.x	-= x
	this.y	-= y
	this.h	-= h
	return this
}
Loc.prototype. subv	=function( v )
{
	return this.sub(v.x, v.y, v.h )
}


///////////////////////////////////////////////////////////////////////////////



Loc.prototype. canadditem	=function( item ,len , nav )
{
	return nav.at(-2).loc2map(this).canadditem( this ,item ,len )
}


Loc.prototype. additem	=function( item ,nav ,msg )
{
	nav.at(-2).loc2map(this).setitem( this ,item )
}


Loc.prototype. delitem	=function( item ,len ,nav )
{
	nav.at(-2).loc2map(this).delitem( this ,item ,len )
}


Loc.prototype.canchildadd	=function( item ,len ,nav ,_i )
{
	return nav.at(-2).loc2map(this).canchildadd( this ,item ,len )
}


///////////////////////////////////////////////////////////////////////////////



Loc.prototype. stck2cnt	=function( stck ,nav , i ,msg )
{
	return nav[0].stck2cnt( this ,stck ,msg )
}


Loc.prototype. cnt2stck	=function( cnt ,nav )
{
	nav[0].loc2map(this).setitem( this ,cnt.newstck() )
}


///////////////////////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////////////////////////



Loc. isarr	=( a )=>	isNaN(parseInt(a[0])) * isNaN(parseInt(a[1])) * isNaN(parseInt(a[2]))



Loc.prototype. toJSON	=function()
{
	return [this.x, this.y, this.h]
}