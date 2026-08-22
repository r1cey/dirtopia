import Loc from "./Loc.js"


/** Holds and manages the associative array part of the maps and boards.
 * 
 * Used properties:
 * * pl
 * * item */

export default class Obj
{
	map

	o	={}



	constructor( map )
	{
		this.map	=map
	}



	///////////////////////////////////////////////////////////////////////////


	/** Since, player data is sometimes received separately, we have a system
	 * that saves these player locations for future replacement.
	 * Works when pl property just has the player's name.
	 * In jsonrevivr, set userd.pls={}, and then add this method to oncheck.
	 * pls will have { playerName: Loc } data. Don't forget to add proper h
	 * values to Loc later since we don't know the height when reviving. */

	static onjsonrevive( key ,val ,userd )
	{
		const pl	=val.pl

		if( pl && typeof pl === "string" )
		{
			userd.pls[pl]	=Loc.setvstr( key ,null )
		}
	}


	///////////////////////////////////////////////////////////////////////////


	/** @return {object} -Object to save into. If cell doesn't have one, it's
	 * created fresh. So be sure to use it in that case! */

	set( loc )
	{
		return	this.o[loc.tovstr()]	??={}
	}
	static
	{
		this.prototype. s	=this.prototype. set
	}


	/** Will NOT create a new entry if doesn't exist */

	get(loc)
	{
		return this.o[loc.tovstr()]
	}	
	static
	{
		this.prototype. g	=this.prototype. get
	}


	/** Returns deleted property */

	del( loc, key ,cell )
	{
		const str	=loc.tovstr()

		cell	??=this.o[str]

		const prop	=cell[key]

		delete cell[key]

		var isvac	=true

		for( key in cell )
		{
			isvac	=false

			break
		}
		if( isvac )	delete this.o[str]

		return prop
	}



	mov( fromloc, key ,toloc )
	{
		var cell	=this.g(fromloc)

		this.s(toloc)[key]	=cell[key]

		this.del( fromloc ,key )
	}
	static
	{
		this.prototype. mv	=this.prototype. mov
	}


	///////////////////////////////////////////////////////////////////////////////



	newitem2cell( loc ,item )
	{
		this.s(loc).item	=item
	}


	/*static setstack( c ,stack )
	{
		var arr	=c[key]

		if( ! arr )	arr =c[key] =[]

		arr[0]	=stack
	}

	static getstack( c ,key )
	{
		return c[key][0]
	}


	static getcnts( c ,key )
	{
		return c[key][1]
	}

	static getcnt( c ,key ,id )
	{
		return c[key][1][id]
	}*/
}