import newJable from "./newJsonable.js"


export default class Color	extends newJable()
{
	h
	s
	l
	a

	static key	="col"
	


	constructor( h =0 ,s =0 ,l =0 ,a =1 )
	{
		super()
		
		this.sethsla( h,s,l,a )
	}



	sethsla( h ,s ,l ,a =1 )
	{	
		this.h	=h
		this.s	=s
		this.l	=l
		this.a	=a

		return this
	}

}

Color.prototype. c	=function()
{
	return new Color().set(this)
}



Color.prototype. sethsl	=function( h, s, l )
{
	return this.sethsla( h ,s ,l ,1 )
}





Color.prototype. set	=function({ h, s, l ,a })
{
	return this.sethsla( h, s, l ,a )
}


/** Colour  */

Color.prototype. setj	=function(a)
{
	return this.sethsla(...a)
}



/*Color. fromJSON	=function( arr )
{
	return new this( ...arr )
}*/



Color.prototype. toJSON	=function()
{
	return [this.h, this.s, this.l ,this.a ]
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
	return `hsl(${this.h} ${this.s}% ${this.l}% / ${this.a})`
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

