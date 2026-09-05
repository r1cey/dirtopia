import V	from './Vec.js'

import newPatha from './newPathable.js'

import newHold	from './newHolder.js'



/**************************************
 * Combining LocCell logic with this class.
 * It's just not good in JS to make a whole new instance for some
 * methods (garbage collection). And also to always use static
 * methods is tedious.
 * 
 * That's why newHold is used here.
 ******************************************/



export default class Loc extends newHold( newPatha( V))
{
	h


	static Vec	=V

	static V	=V

	static key	="loc"


	///////////////////////////////////////////////////////////////////////////



	constructor( x =0, y =0, h =0 )
	{
		super( x, y )

		this.h	=h
	}


	///////////////////////////////////////////////////////////////////////////


	get isloc()	{return true }


	
	///////////////////////////////////////////////////////////////////////////

	/******************************
	 * LocCell logic
	 * *****************************/

	static
	{
		this.prototype. acts	=
		{
			spawnitem	:
			[
				function test( nav ,pl ,item)
				{
					return this.canadditem( item ,item.glen() ,nav)
				},
				function run( nav ,pl ,item)
				{
					return this.additem( item ,nav)
				}
			],
			plant	:
			[
				function test( nav ,pl)
				{
					return pl.canreach( this ) && pl.hands.item?.plantable &&
					
						nav.at(0).loc2map(this).plantable( this )
				},
				function run( nav ,pl)
				{
					const map	=nav.at(0).loc2map( this)
					
					map.setsoilveg( this ,"cucumber" ,0)
				}
			]
		}
	}
	
	
	//----------------------------



	canadditem( item ,len ,nav)
	{
		return nav.at(-2).loc2map(this).canadditem( this ,item ,len)
	}


	additem( item ,nav)
	{
		nav.at(-2).loc2map(this).setitem( this ,item)
	}


	delitem( item ,len ,nav)
	{
		nav.at(-2).loc2map(this).delitem( this ,item ,len)
	}


	canchildadd( item ,len ,nav ,_i)
	{
		return nav.at(-2).loc2map(this).canchildadd( this ,item ,len)
	}


	//-------------------------------------



	stck2cnt( stck ,nav , i ,msg )
	{
		return nav.at(0).stck2cnt( this ,stck ,msg )
	}


	cnt2stck( cnt ,nav )
	{
		nav.at(0).loc2map(this).setitem( this ,cnt.newstck() )
	}


	///////////////////////////////////////////////////////////////////////////



	static setvstr( str, h )
	{
		return new this( ...str.split(V.delim) ,h )
	}



	static set( loc )	{return new this( loc.x ,loc.y, loc.h )}

	// static fromv( v ,h )	{return new this().setvh( v ,h )}

	
	///////////////////////////////////////////////////////////////////////////


	setvh( v ,h )	{ this.setxy( v.x ,v.y ,h )}


	/*getcell( maps )	{return maps.loc2map(this).obj.g(this) }


	getitem( key ,maps ){	return this.getcell( maps )?.item }

	
	isempty( nav ,_i )	{return this.getcell( nav.dad(_i) )?.item }*/

	
	setvj( va ,h )
	{
		this.x	=va[0]
		this.y	=va[1]
		this.h	=h ?? this.h
		return this
	}


	///////////////////////////////////////////////////////////////////////////


	pmsg2obj( key ,nava ,i )	{return nava[i-1].loc2map(this).obj.g(this)?.item }


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
	return this.setxy( x, y, h ?? this.h )

}
Loc.prototype. s	=Loc.prototype. set

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
	return this.add( v.x, v.y, v.h ?? 0 )
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


///////////////////////////////////////////////////////////////////////////////






///////////////////////////////////////////////////////////////////////////////



Loc. isarr	=( a )=>	isNaN(parseInt(a[0])) * isNaN(parseInt(a[1])) * isNaN(parseInt(a[2]))



Loc.prototype. toJSON	=function()
{
	return [this.x, this.y, this.h]
}