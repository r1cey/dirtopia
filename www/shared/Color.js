import newJable from "./newJsonable.js"


export default class Color	//extends newJable()
{
	h
	s
	l

	static key	="col"
	

	constructor( h =0, s =0, l =0 )
	{
		this.sethsl( h,s,l )
	}
}

Color.prototype. c	=function()
{
	return new Color().set(this)
}



Color.prototype. sethsl	=function( h, s, l )
{
	this.h	=h
	this.s	=s
	this.l	=l

	return this
}



Color.prototype. set	=function({ h, s, l })
{
	return this.sethsl( h, s, l )
}


/** Colour  */

Color.prototype. setj	=function(a)
{
	return this.sethsl(...a)
}



/*Color. fromJSON	=function( arr )
{
	return new this( ...arr )
}*/



Color.prototype. toJSON	=function()
{
	return [this.h, this.s, this.l]
}



Color.prototype. sethsl	=function( h, s, l )
{
	this.h	=h
	this.s	=s
	this.l	=l

	return this
}



Color.prototype. add	=function( h, s, l )
{
	this.h	+=Math.round(h)
	this.s	+=Math.round(s)
	this.l	+=Math.round(l)

	return this
}


/** Return better json representation of object for messaging. *

Color.prototype. newmsg	=function()
{
	return [this.h, this.s, this.l]
}*/

Color.prototype. str	=function()
{
	return `hsl(${this.h} ${this.s}% ${this.l}%)`
}

Color.prototype. inv	=function()
{
	this.h	=this.h + 180

	if(this.h > 360)	this.h -=360

	this.s	+= ( (100-this.s)>>1 )

	this.l	=100 - this.l

	return this
}


///////////////////////////////////////////////////////////////////////////////

