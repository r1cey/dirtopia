import newBoard from './newBoard.js'
import newBinMap	from "./newBinMap.js"
import Obj from './Obj.js'

import Loc from '../Loc.js'

// import Cell from '../../../../src/maps/Cell.js'

// import { AddMsg } from '../Msgs.js'


/** Hexagonally round version of Board.
 * 
 * In derived classes, make sure every set..._i method
 * has a matching regular set... method. The reason is:
 * when _i is called on server, the client will be sent regulat method.
 * This needs to change. Can't rely on set_i methods to update clients.
 * Update should happen through some other method. */

export default class Map extends newBoard(newBinMap)
{
	maps

	obj	=new this.constructor.Obj(this)

	get _r()	{return this.bin.getr()}

	/** Optional additional binmap for local calculations */
	bin2


	/** Allow derived classes to override this.
	 * Used for obj creation in constructor. */
	static Obj	=Obj

	////

	constructor( maps )
	{
		super()

		this.maps	=maps
	}


	get game()	{return this.maps.game }



	isplantable( loc )	{return false }


	/** The method which updates other map properties depending on item */

	setitem( loc ,item )
	{
		this.obj.s(loc).item	=item
	}

	getitem( loc )
	{
		return this.obj.g(loc)?.item
	}
	static
	{
		this.prototype. gitem	=this.prototype.getitem
	}


	// newcell( v )	{return new Cell( this ,v )}


	/**@todo Also don't allow to put items where tree trunks are.
	 * And maybe make the search area more humble */

	getloc4item( oloc )
	{
		const loc	=this.fore(( loc )=>
			{
				if( ! this.obj.g(loc)?.item )	return true
			},
			this._r<<1 ,oloc
		)
		return loc
	}


	/** Count the number of players within a certain radius of a location. */

	countpls( loc ,r)
	{
		var count	=0

		this.fore(( loc2)=>
		{
			if( this.obj.g( loc2)?.pl)	count++
		},
		r ,loc)

		return count
	}



	///////////////////////////////////////////////////////////////////////////



	build( r, maxc =0, loc =new Loc(0,0,0) )
	{
		var Map	=this.constructor

		this.setbin( new Map.Bin( r, maxc, loc ) )
	}



	setbuf( buf )
	{
		var C	=this.constructor

		this.setbin( new C.Bin( buf ) )
	}



	setbin( bin )
	{
		this.bin	=bin
	}


	ready()
	{
		return this.bin
	}


	///////////////////////////////////////////////////////////////////////////



	inside( loc )
	{
		return this.bin.inside( loc )
	}


	///////////////////////////////////////////////////////////////////////////////


	/** Can player move there?
	 * Can optimize by making special case for server maps by testing for
	 * distance from 0,0
	 * @todo Different sized items should have different max amount
	 * @arg {Player} [pl] */

	canplmov( dest, pl )
	{
		const o	=this.obj.g(dest)

		return this.inside(dest) &&
		! (
			o &&
			(
				( o.pl && o.pl !== pl && o.pl !== pl?.name )
				||
				( o.item &&
				
					( o.item.isblock || ( o.item.isstck && o.item.len > 10 ))
				)
			)
		)
		/*var areaS	=0

		for(var k in c )
		{
			var o	=c[k]

			if( k === "pl" )	return o === pl

			var area	=7 ** ( ~ o.constructor.area & 7 )

			areaS	+= area

			if( areaS >= 50421 /* (7**5)*3 * )
			{
				return false
			}
		}*/
	}


	/** Handle-all main method to check if an item can be added at a location.
	 * Derived maps need to calculate how many or which
	 * items exactly can be added.
	 @arg curitem	-Derived classes might do additional checks so they can
		provide curitem to save on time.
	@return {len}	-If there's an appropriate stack at destination already
		return the length of the stack. Otherwise, either return full
		length or zero. */

	canadditem( loc ,item ,len ,curitem )
	{
		curitem	??=this.obj.g(loc)?.item

		if( curitem )
		{
			if( curitem.isstck && curitem.gkey() === item.gkey() )
			{
				return curitem.len
			}
			else	return 0
		}
		return len
	}



	delitem( loc ,item ,len )
	{
		var cell	=this.obj.g(loc)

		if( item.isstck )
		{
			var item	=cell.item

			item.len	-= len

			if( item.len > 0 )	return
		}
		this.obj.del( loc ,"item" ,cell )
	}



	canchildadd( loc ,item ,len )
	{
		const canlen	=this.obj.g(loc)?.item?.isstcnt && ! this.findempty( loc ,1 ) ?
		
			0	: 100

		return Math.min( canlen ,len )
	}



	stck2cnt( loc ,stck ,msg )
	{
		const cell	=this.g(loc)

		stck	=cell.item

		const newcnt	=msg.newcnt	=stck.spawncnt()

		const pushed2loc	=msg.pushed2loc	=this.findempty( loc ,1 )

		this.obj.s(pushed2loc).item	=stck

		cell.item	=newcnt

		// return { newcnt ,pushed2loc }
	}



	findempty( loc ,r )
	{
		return this.fore(( v )=>
			{
				if( ! this.obj.g(v)?.item )	return true
			},
			r ,loc
		)
	}


	///////////////////////////////////////////////////////////////////////////



	printarr( ibuf , r=6, c )
	{
		var str	=''

		var ir	=0

		if( !c )	c	=this.getloc()

		this.fore(( loc, r2 )=>
		{
			if( r2 > ir )
			{
				str	=str.replace( /,$/, '|')

				ir ++
			}

			str	+=this.gcellc( ibuf, loc ) + ','
		}
		, r, c )

		console.log(str)
	}



	slice( c, r )
	{
		var map	=this

		var map2	=new this.constructor()

		map2.build( r, 0, new Loc( c.x, c.y, map.getloc().h ) )

		map2.fore(( loc )=>
		{
			if( map.inside(loc) )
			{
				map2.copycell( loc, map, loc )
			}
		})

		return map2
	}



	///////////////////////////////////////////////////////////////////////////////


	/** Look into {BinMap}.fore */

	fore( fun, r, c )
	{
		return this.bin.fore( fun, r, c ,this )
	}



	forring( fun, r, c )
	{
		return this.bin.forring( fun, r, c ,this )
	}


	/*
	Map.prototype. forstar	=function( fun, r, c )
	{
		if( ! r )
		{
			return fun( c, this )
		}

		r	??=this._r

		c	??=this.getloc()

		var v	=c.clone()

		v.steph( 4, r )

		for(var dir =0; dir < 6; dir++)
		{
			for(var i =r)
		}
	}*/


	/** Sets map height to loc */

	loch( loc )
	{
		loc.h	=this.getloc().h

		return loc
	}



	copycell( loc, map2, loc2 )
	{
		var ic	=this.ic(loc)

		var ic2	=map2.ic(loc2)

		this.bin.setcell( ic, map2.bin.getcell( ic2 ) )

		/*if( this.bin2 && map2.bin2 )
		{
			this.bin2.setcell( ic, map2.bin2.getcell( ic2 ) )
		}*/

		var str2	=loc2.tovstr()

		if( map2.obj.o[str2] )
		{
			this.obj.o[loc.tovstr()]	=map2.obj.o[str2]
		}
		/*else
		{
			delete this.obj.o[loc.tovstr()]
		}*/
	}


	/**@todo handle if can't find */

	getloc4pl( loc)
	{
		const map	=this

		return map.fore(( loc2)=>
			{
				if( map.canplmov( loc2))
				{
					return true
				}
			}
			,undefined ,loc
		)
	}




	///////////////////////////////////////////////////////////////////////////



	gbincell( loc )
	{
		return this.bin.getcell( this.ic(loc) )
	}





	sbincell( loc, vals )
	{
		this.bin.setcell( this.ic(loc), vals )
	}



	newmsgo()
	{
		var o2	={}

		for(var locn in this.o )
		{
			var cell	=this.o[locn]

			o2[locn]	={}

			for(var p in cell )
			{
				switch( p )
				{
					case 'pl':

						o2[locn][p]	=cell[p].newmsgvis()
					break;
					default:

						o2[locn][p]	=cell[p]
				}
			}
		}

		return o2
	}


	///////////////////////////////////////////////////////////////////////////



	/*static jsonrplcr	=function(key,val)
	{
		switch(key)
		{
			case 'cl':

				return '0'
		}
	}*/




	/*
	Map.prototype. bits_gstartlen	=function( n, i )
	{
		var bits	=this.bits_map

		var start	=0, len	=0

		for(var ib=0; ib<bits.length && !len; ib++)
		{
			if( bits[ib][0] === n )
			{
				for(var ia=1; ia<bits[ib].length; ia++)
				{
					if( ia === i+1 )
					{
						len	=bits[ib][ia]

						break
					}

					start	+= bits[ib][ia]
				}
			}
		}

		return { start, len }
	}



	Map.prototype.getacode	=function( code, n, i )
	{
		var start, len

	}	=this.bits_gstartlen( n, i )

		return Map.mask( code, start, len )
	}
	Map.prototype. code_s	=function( code, n, i, val )
	{
		var { start, len }	=this.bits_gstartlen( n, i )

		return  Map.mask_s( code, start, len, val )
	}
	*/



	i( loc )
	{
		return this.bin.ic( loc )
	}
	static
	{
		this.prototype. ic	=this.prototype.i
	}



	/** @arg fun	- ( loc, code, cell ) 

	Map.prototype. o_for	=function( fun )
	{
		var x,y
		
		var o	=this.o

		var code	=this.code

		var loc	=new V()

		for(x in o)
		{
			for(y in o[x])
			{
				loc.setxy(+x,+y)

				fun(loc, this.arr_g(loc), o[x][y])
			}
		}
	}
	*/


	gjson()
	{
		var o	=this.o

		return JSON.stringify( o, Map.jsonrplcr )
	}


	/** Not needed atm and maybe later 


	Map.o_sparse	=function( o, fun )
	{
			{
				for(var p2 in cell[p1])
				{
					if( p2 === 'loc' )
					{
						cell[p1][p2]	=new V().setj(cell[p1][p2])
					}
				}
			}

			fun( loc, code, cell )
		})

		var loc	=new V()

		for(var x in o )
		{
			for(var y in o[x])
			{
				var cell	=o[x][y]

				loc.setxy(+x,+y)

				for(var p1 in cell )
				{
					for(var p2 in cell[p1])
					{
						if( p2 === 'loc' )
						{
							cell[p1][p2]	=new V().setj(cell[p1][p2])
						}
					}
				}

				fun( loc, cell )
			}
		}
	}
	*/


	corner(dir)
	{
		return Loc.dirvh[dir].c().mul(this._r).addv(this.getloc())
	}



	/** DO NOT CHANGE VECTOR IN FUN() !!! */

	fordiredge( fun, dir, r, c )
	{
		r	=r?? this._r

		var v	= c ? c.c() : this.getloc().c()

		v.steph( Loc.roth(dir,-1), r )

		dir	=Loc.roth(dir,1)

		for(var s=0; s<2; s++)
		{
			for(var i=0; i < r; i++)
			{
				if( this.inside(v) )	fun( v, this )

				v.neighh(dir)
			}

			dir	=Loc.roth(dir,1)
		}

		if( this.inside(v) )	fun( v, this )
	}


	///////////////////////////////////////////////////////////////////////////


	/** @returns next available id */

	static setids( startid )
	{
		var id	=startid

		for(var i =0;i< this.Bufs.length ;i++)
		{
			if( this.Bufs[i].skipid )	continue

			this.Bufs[i].id	=id

			id++
		}

		return id
	}


		
	static ibfrombid( bid )
	{
		for(var i =0;i< this.Bufs.length; i++)
		{
			if( this.Bufs[i].id === bid )
			{
				return i
			}
		}
		return -1
	}






	/*
	static getbmapbits( name , j )
	{
		var Buf	=this.Bufs[this.ibfromp[name]]

		return Buf.bmap[Buf.bmapo[name]][j][0]
	}*/


	///////////////////////////////////////////////////////////////////////////



	toJSON()
	{
		return undefined
	}
}